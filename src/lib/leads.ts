import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { Pool as PgPool } from "pg";

export type LeadRecord = {
  ts: string;
  email: string;
  name: string;
  portfolio: string;
};

/**
 * Persist a captured lead, then notify the founder (best effort).
 * With DATABASE_URL set (Railway Postgres), rows go to the `leads` table;
 * otherwise falls back to an append-only JSONL file so local dev needs no database.
 */
export async function saveLead(record: LeadRecord): Promise<void> {
  if (process.env.DATABASE_URL) {
    await saveToPostgres(record);
  } else {
    await saveToFile(record);
  }
  await notifyFounder(record);
}

let pool: PgPool | null = null;
let tableEnsured = false;

async function saveToPostgres(record: LeadRecord): Promise<void> {
  const { Pool } = await import("pg");
  pool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 3 });
  if (!tableEnsured) {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id BIGSERIAL PRIMARY KEY,
        ts TIMESTAMPTZ NOT NULL DEFAULT now(),
        email TEXT NOT NULL,
        name TEXT NOT NULL DEFAULT '',
        portfolio TEXT NOT NULL DEFAULT ''
      )
    `);
    tableEnsured = true;
  }
  await pool.query(
    "INSERT INTO leads (ts, email, name, portfolio) VALUES ($1, $2, $3, $4)",
    [record.ts, record.email, record.name, record.portfolio],
  );
}

async function saveToFile(record: LeadRecord): Promise<void> {
  const file =
    process.env.LEADS_FILE ?? path.join(process.cwd(), ".data", "leads.jsonl");
  await mkdir(path.dirname(file), { recursive: true });
  await appendFile(file, JSON.stringify(record) + "\n", "utf8");
}

/**
 * Email the founder about a new lead via Resend. Activates only when
 * RESEND_API_KEY and LEAD_NOTIFY_EMAIL are set; failures never lose the lead.
 */
async function notifyFounder(record: LeadRecord): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to) return;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Rentil <onboarding@resend.dev>",
        to: [to],
        subject: `New demo request: ${record.email}`,
        text: [
          `Name: ${record.name || "(not given)"}`,
          `Email: ${record.email}`,
          `Portfolio: ${record.portfolio || "(not given)"}`,
          `At: ${record.ts}`,
        ].join("\n"),
      }),
    });
    if (!res.ok) {
      console.error(`Lead notification failed with status ${res.status}`);
    }
  } catch (err) {
    console.error("Lead notification failed", err);
  }
}
