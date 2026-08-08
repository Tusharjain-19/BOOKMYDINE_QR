import { NextResponse } from "next/server";
import { collection, query, where, getDocs, getDoc, doc, setDoc } from 'firebase/firestore';
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
    const docRef = doc(db, 'restaurants', docId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }

    const record = docSnap.data();
    if (!record || !record.menuData) {
      return NextResponse.json({ error: "Invalid menu data" }, { status: 500 });
    }
    
    const md = record.menuData;
    
    // If it's already in the legacy flat format, return as is
    if (md.name) {
      return NextResponse.json(md);
    }

    // Map to frontend expected format
    const mapped = {
      slug: md.slug || slug,
      name: md.restaurant?.name || "Untitled",
      type: "Restaurant",
      tagline: md.restaurant?.tagline || "",
      logoUrl: md.restaurant?.logoUrl || "",
      brandColor: md.theme?.primaryColor || "#2563eb",
      accentColor: md.theme?.accentColor || "#f59e0b",
      theme: md.theme?.id || "minimal",
      phone: md.restaurant?.phone || "",
      address: md.restaurant?.address || "",
      instagramUrl: "",
      mapsUrl: "",
      categories: md.categories || []
    };

    return NextResponse.json(mapped);
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
