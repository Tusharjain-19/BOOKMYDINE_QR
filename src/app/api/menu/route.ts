import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import seedData from "@/data/seed.json";

const DB_FILE = path.join(process.cwd(), "src", "data", "db.json");

// In-memory cache fallback for Serverless environments (like Vercel)
const inMemoryDB: { leads: any[]; menus: Record<string, any> } = {
  leads: [...((seedData as any).leads || [])],
  menus: { ...((seedData as any).menus || {}) },
};

function getDB(): { leads: any[]; menus: Record<string, any> } {
  try {
    if (fs.existsSync(DB_FILE)) {
      const fileContent = fs.readFileSync(DB_FILE, "utf-8");
      if (fileContent.trim()) {
        const fileData = JSON.parse(fileContent);
        return {
          leads: fileData.leads || inMemoryDB.leads,
          menus: { ...inMemoryDB.menus, ...(fileData.menus || {}) },
        };
      }
    }
  } catch (error) {
    console.error("Error reading db.json:", error);
  }
  return inMemoryDB;
}

function saveDB(db: any): boolean {
  inMemoryDB.leads = db.leads || inMemoryDB.leads;
  inMemoryDB.menus = db.menus || inMemoryDB.menus;

  try {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing db.json (read-only filesystem on Vercel):", error);
    return false;
  }
}

function sanitizeSlug(slug: string): string {
  return slug.toLowerCase().replace(/[^a-z0-9-_]/g, "-");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const db = getDB();
    const menus = db.menus || {};

    if (!slug) {
      return NextResponse.json(Object.values(menus));
    }

    const cleanSlug = sanitizeSlug(slug);
    const menu = menus[cleanSlug];

    if (!menu) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }

    return NextResponse.json(menu);
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

    const cleanSlug = sanitizeSlug(menuData.slug);
    const db = getDB();

    if (!db.menus) {
      db.menus = {};
    }

    db.menus[cleanSlug] = { ...menuData, slug: cleanSlug };
    saveDB(db);

    return NextResponse.json({ success: true, slug: cleanSlug });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
