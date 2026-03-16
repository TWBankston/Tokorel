import { NextRequest, NextResponse } from "next/server";

const REACH_API_URL =
  "https://api.hostinger.com/api/reach/v1/contacts";

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.REACH_API_KEY;

    if (apiKey) {
      const reachRes = await fetch(REACH_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
        }),
      });

      if (!reachRes.ok) {
        const detail = await reachRes.text();
        console.error("[Reach API] Error:", reachRes.status, detail);
      }
    } else {
      console.warn(
        "[Reach] REACH_API_KEY is not set — skipping contact sync. " +
          "Form submission still redirecting to download page."
      );
    }

    return NextResponse.json({
      success: true,
      redirectUrl: "/download",
    });
  } catch (err) {
    console.error("[subscribe] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
