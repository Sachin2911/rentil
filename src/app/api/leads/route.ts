import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  // Honeypot field: filled means bot: pretend success, store nothing.
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

  console.log(`Lead captured: ${record.email}`);
  return NextResponse.json({ ok: true });
}
