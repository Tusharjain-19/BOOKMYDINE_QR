import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import seedData from "@/data/db.json";

const DB_FILE = path.join(process.cwd(), "src", "data", "db.json");

const inMemoryDB: { leads: any[]; menus: Record<string, any> } = {
  leads: [...((seedData as any).leads || [])],
  menus: { ...((seedData as any).menus || {}) },
};

function getDB() {
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

function saveDB(db: any) {
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

export async function GET() {
  const db = getDB();
  return NextResponse.json(db.leads || []);
}

export async function POST(request: Request) {
  try {
    const lead = await request.json();
    const db = getDB();

    const newLead = {
      ...lead,
      id: `lead_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "pending"
    };

    if (!Array.isArray(db.leads)) {
      db.leads = [];
    }

    db.leads.push(newLead);
    saveDB(db);

    // Forward to Google Sheets Apps Script Webhook if configured
    const googleSheetWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (googleSheetWebhookUrl) {
      try {
        await fetch(googleSheetWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newLead)
        });
      } catch (sheetErr) {
        console.error("Error sending lead to Google Sheets webhook:", sheetErr);
      }
    }

    return NextResponse.json({ success: true, lead: newLead });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
