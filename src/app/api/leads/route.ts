import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear(); // bound memory on a long-lived instance
  return false;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again in a minute." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  // Honeypot field filled means bot: pretend success, store nothing.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const record = {
    ts: new Date().toISOString(),
    email: email.slice(0, 320),
    name: typeof body.name === "string" ? body.name.trim().slice(0, 200) : "",
    portfolio:
      typeof body.portfolio === "string"
        ? body.portfolio.trim().slice(0, 100)
        : "",
  };

  try {
    await saveLead(record);
  } catch (err) {
    console.error("Failed to persist lead", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please email us instead." },
      { status: 500 },
    );
  }

  console.log("Lead captured");
  return NextResponse.json({ ok: true });
}
