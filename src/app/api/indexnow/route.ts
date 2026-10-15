import { NextResponse } from "next/server";

const HOST = "bookmydineqr.vercel.app";
const KEY = "e5b8d21c38fa46b5a34e0628e917d2a5";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URL_LIST = [
  `https://${HOST}`,
  `https://${HOST}/onboard`,
  `https://${HOST}/mumbai`,
  `https://${HOST}/delhi`,
  `https://${HOST}/bangalore`,
  `https://${HOST}/hyderabad`,
  `https://${HOST}/pune`,
  `https://${HOST}/chennai`,
  `https://${HOST}/kolkata`,
  `https://${HOST}/jaipur`,
  `https://${HOST}/ahmedabad`,
  `https://${HOST}/lucknow`,
  `https://${HOST}/menu/cafe-cozy`,
  `https://${HOST}/menu/l-orangerie`,
  `https://${HOST}/menu/tandoori-palace`,
  `https://${HOST}/menu/komorebi-bistro`,
  `https://${HOST}/menu/street-express`,
  `https://${HOST}/menu/neon-taproom`,
];

export async function POST() {
  try {
    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: URL_LIST,
    };

    const endpoints = [
      "https://api.indexnow.org/indexnow",
      "https://www.bing.com/indexnow",
    ];

    const results = await Promise.allSettled(
      endpoints.map((ep) =>
        fetch(ep, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(payload),
        }).then(async (res) => ({
          endpoint: ep,
          status: res.status,
          statusText: res.statusText,
        }))
      )
    );

    return NextResponse.json({
      success: true,
      urlsSubmitted: URL_LIST.length,
      results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit to IndexNow" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}
