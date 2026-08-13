// @vitest-environment node
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

const pgQuery = vi.hoisted(() => vi.fn().mockResolvedValue({ rows: [] }));

vi.mock("pg", () => {
  class Pool {
    query = pgQuery;
  }
  return { Pool, default: { Pool } };
});

const record = {
  ts: "2026-08-13T12:00:00.000Z",
  email: "lead@agency.co.za",
  name: "Lindiwe",
  portfolio: "80–250 properties",
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
  pgQuery.mockClear();
});

describe("saveLead", () => {
  it("appends JSONL to LEADS_FILE when no database is configured", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "rentil-leads-"));
    const file = path.join(dir, "leads.jsonl");
    vi.stubEnv("LEADS_FILE", file);
    vi.stubEnv("DATABASE_URL", "");
    delete process.env.DATABASE_URL;

    const { saveLead } = await import("./leads");
    await saveLead(record);
    await saveLead({ ...record, email: "second@agency.co.za" });

    const lines = (await readFile(file, "utf8")).trim().split("\n");
    expect(lines).toHaveLength(2);
    expect(JSON.parse(lines[0])).toEqual(record);
    await rm(dir, { recursive: true, force: true });
  });

  it("creates the table then inserts when DATABASE_URL is set", async () => {
    vi.stubEnv("DATABASE_URL", "postgres://user:pass@localhost:5432/rentil");

    const { saveLead } = await import("./leads");
    await saveLead(record);

    expect(pgQuery).toHaveBeenCalledTimes(2);
    expect(pgQuery.mock.calls[0][0]).toContain(
      "CREATE TABLE IF NOT EXISTS leads",
    );
    expect(pgQuery.mock.calls[1][0]).toContain("INSERT INTO leads");
    expect(pgQuery.mock.calls[1][1]).toEqual([
      record.ts,
      record.email,
      record.name,
      record.portfolio,
    ]);

    // Table creation is a one-time cost per process
    await saveLead(record);
    expect(pgQuery).toHaveBeenCalledTimes(3);
  });
});
