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
  vi.unstubAllGlobals();
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

  it("notifies the founder when Resend is configured", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "rentil-notify-"));
    vi.stubEnv("LEADS_FILE", path.join(dir, "leads.jsonl"));
    delete process.env.DATABASE_URL;
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubEnv("LEAD_NOTIFY_EMAIL", "founder@example.com");
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const { saveLead } = await import("./leads");
    await saveLead(record);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    const body = JSON.parse(init.body);
    expect(body.to).toEqual(["founder@example.com"]);
    expect(body.subject).toContain(record.email);
    await rm(dir, { recursive: true, force: true });
  });

  it("never loses the lead when notification fails", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "rentil-notify-fail-"));
    const file = path.join(dir, "leads.jsonl");
    vi.stubEnv("LEADS_FILE", file);
    delete process.env.DATABASE_URL;
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubEnv("LEAD_NOTIFY_EMAIL", "founder@example.com");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("down")));

    const { saveLead } = await import("./leads");
    await expect(saveLead(record)).resolves.toBeUndefined();

    const lines = (await readFile(file, "utf8")).trim().split("\n");
    expect(lines).toHaveLength(1);
    await rm(dir, { recursive: true, force: true });
  });

  it("skips notification entirely when not configured", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "rentil-nonotify-"));
    vi.stubEnv("LEADS_FILE", path.join(dir, "leads.jsonl"));
    delete process.env.DATABASE_URL;
    delete process.env.RESEND_API_KEY;
    delete process.env.LEAD_NOTIFY_EMAIL;
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const { saveLead } = await import("./leads");
    await saveLead(record);

    expect(fetchMock).not.toHaveBeenCalled();
    await rm(dir, { recursive: true, force: true });
  });
});
