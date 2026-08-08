import { NextResponse } from "next/server";
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from "@/lib/firebase";
import seedData from "@/data/seed.json";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    // 1. Handle no slug - Return list of all menus
    if (!slug) {
      let firebaseMenus: any[] = [];
      if (db) {
        try {
          const q = query(collection(db, 'restaurants'));
          const snapshot = await getDocs(q);
          firebaseMenus = snapshot.docs.map(doc => {
            const data = doc.data();
            return data.menuData || data;
          });
        } catch (e) {
          console.error("Error fetching Firestore menus:", e);
        }
      }
      
      const seedMenuList = Object.values(seedData.menus || {});
      return NextResponse.json([...firebaseMenus, ...seedMenuList]);
    }

    // 2. Try fetching from Firebase if db is initialized
    let rawData: any = null;

    if (db) {
      try {
        // Try docId = menu-${slug}
        const docRef1 = doc(db, 'restaurants', `menu-${slug}`);
        const snap1 = await getDoc(docRef1);
        if (snap1.exists()) {
          rawData = snap1.data();
        } else {
          // Try docId = slug
          const docRef2 = doc(db, 'restaurants', slug);
          const snap2 = await getDoc(docRef2);
          if (snap2.exists()) {
            rawData = snap2.data();
          } else {
            // Try query where slug == slug
            const q = query(collection(db, 'restaurants'), where('slug', '==', slug));
            const snap3 = await getDocs(q);
            if (!snap3.empty) {
              rawData = snap3.docs[0].data();
            }
          }
        }
      } catch (e) {
        console.error("Firestore lookup error for slug:", slug, e);
      }
    }

    // 3. Fallback to seed.json if not found in Firebase
    if (!rawData) {
      const seedMenus = (seedData.menus as Record<string, any>) || {};
      if (seedMenus[slug]) {
        return NextResponse.json(seedMenus[slug]);
      }
      // Check if slug matches any seed menu by lowercasing or stripping menu- prefix
      const cleanSlug = slug.replace(/^menu-/, '').toLowerCase();
      if (seedMenus[cleanSlug]) {
        return NextResponse.json(seedMenus[cleanSlug]);
      }
    }

    // 4. If still no data found, return 404
    if (!rawData) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }

    // Extract menuData payload if nested
    const md = rawData.menuData || rawData;

    // If already flat format, return directly
    if (md.name && md.categories) {
      return NextResponse.json(md);
    }

    // Map nested structure to flat structure expected by frontend
    const mapped = {
      slug: md.slug || slug,
      name: md.restaurant?.name || md.name || "Untitled Menu",
      type: md.type || md.restaurant?.type || "Restaurant",
      tagline: md.tagline || md.restaurant?.tagline || "",
      logoUrl: md.logoUrl || md.restaurant?.logoUrl || "",
      brandColor: md.brandColor || md.theme?.primaryColor || "#2563eb",
      accentColor: md.accentColor || md.theme?.accentColor || "#f59e0b",
      theme: typeof md.theme === 'string' ? md.theme : (md.theme?.id || "minimal"),
      phone: md.phone || md.restaurant?.phone || "",
      address: md.address || md.restaurant?.address || "",
      instagramUrl: md.instagramUrl || "",
      mapsUrl: md.mapsUrl || "",
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

    return NextResponse.json({ success: true, slug: menuData.slug });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
