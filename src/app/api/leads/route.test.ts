// @vitest-environment node
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

let dir: string;
let file: string;

beforeEach(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "rentil-route-"));
  file = path.join(dir, "leads.jsonl");
  vi.stubEnv("LEADS_FILE", file);
  delete process.env.DATABASE_URL;
});

afterEach(async () => {
  vi.unstubAllEnvs();
  await rm(dir, { recursive: true, force: true });
});

function post(body: unknown) {
  return new Request("http://localhost/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/leads", () => {
  it("stores a valid lead", async () => {
    const { POST } = await import("./route");
    const res = await POST(
      post({
        email: "principal@agency.co.za",
        name: "Sipho",
        portfolio: "250–600 properties",
      }),
    );
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });

    const stored = JSON.parse((await readFile(file, "utf8")).trim());
    expect(stored).toMatchObject({
      email: "principal@agency.co.za",
      name: "Sipho",
      portfolio: "250–600 properties",
    });
    expect(stored.ts).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("rejects an invalid email", async () => {
    const { POST } = await import("./route");
    const res = await POST(post({ email: "not-an-email" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.ok).toBe(false);
  });

  it("rejects malformed JSON", async () => {
    const { POST } = await import("./route");
    const res = await POST(
      new Request("http://localhost/api/leads", {
        method: "POST",
        body: "not json",
      }),
    );
    expect(res.status).toBe(400);
  });

  it("silently drops honeypot submissions", async () => {
    const { POST } = await import("./route");
    const res = await POST(
      post({ email: "bot@spam.io", company: "Totally Real Inc" }),
    );
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
    // nothing written
    await expect(readFile(file, "utf8")).rejects.toThrow();
  });

  it("rate limits a single client after ten requests in a minute", async () => {
    const { POST } = await import("./route");
    const withIp = (i: number) =>
      new Request("http://localhost/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": "203.0.113.7",
        },
        body: JSON.stringify({ email: `p${i}@agency.co.za` }),
      });

    for (let i = 0; i < 10; i++) {
      const res = await POST(withIp(i));
      expect(res.status).toBe(200);
    }
    const blocked = await POST(withIp(10));
    expect(blocked.status).toBe(429);
    const json = await blocked.json();
    expect(json.ok).toBe(false);
  });
});
