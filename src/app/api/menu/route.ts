import { NextResponse } from "next/server";
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from "@/lib/firebase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!db) {
      return NextResponse.json({ error: "Firebase not initialized" }, { status: 500 });
    }

    if (!slug) {
      const q = query(collection(db, 'restaurants'));
      const snapshot = await getDocs(q);
      const menus = snapshot.docs.map(doc => doc.data().menuData);
      return NextResponse.json(menus);
    }

    const docId = `menu-${slug}`;
    const q = query(collection(db, 'restaurants'), where('id', '==', docId));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }

    const record = snapshot.docs[0].data();
    return NextResponse.json(record.menuData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const menuData = await request.json();
    if (!menuData.slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    if (!db) {
      return NextResponse.json({ error: "Firebase not initialized" }, { status: 500 });
    }

    // The Admin Studio already handles saving to Firebase securely via lib/menuStorage.ts.
    // This endpoint acts as a compatibility layer to confirm the sync.
    return NextResponse.json({ success: true, slug: menuData.slug });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
