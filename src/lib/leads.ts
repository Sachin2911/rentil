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
 * Persist a captured lead.
 * With DATABASE_URL set (Railway Postgres), rows go to the `leads` table;
 * otherwise falls back to an append-only JSONL file so local dev needs no database.
 */
export async function saveLead(record: LeadRecord): Promise<void> {
  if (process.env.DATABASE_URL) {
    await saveToPostgres(record);
  } else {
    await saveToFile(record);
  }
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
