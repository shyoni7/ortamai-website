import { createHmac, timingSafeEqual } from "node:crypto";
import type { Request, Response } from "express";
import { getSessionCookieOptions } from "./_core/cookies";
import { ENV } from "./_core/env";

// Simple single-admin auth: the password lives in the ADMIN_PASSWORD env var
// (set in Vercel), and a successful login sets a signed, expiring cookie.
// This is intentionally independent of the legacy Manus OAuth flow, which is
// not functional on the standalone Vercel deployment.

export const ADMIN_COOKIE_NAME = "ortam_admin";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function signingSecret(): string {
  // Prefer the dedicated cookie secret; fall back to the password itself so a
  // single env var is enough to get a working admin.
  return ENV.cookieSecret || process.env.ADMIN_PASSWORD || "";
}

function sign(payload: string): string {
  return createHmac("sha256", signingSecret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(password, expected);
}

export function createAdminToken(now = Date.now()): string {
  const expires = String(now + SESSION_TTL_MS);
  return `${expires}.${sign(expires)}`;
}

export function verifyAdminToken(token: string | undefined, now = Date.now()): boolean {
  if (!token || !isAdminConfigured()) return false;
  const dotIndex = token.indexOf(".");
  if (dotIndex <= 0) return false;
  const expires = token.slice(0, dotIndex);
  const signature = token.slice(dotIndex + 1);
  if (!/^\d+$/.test(expires) || Number(expires) < now) return false;
  return safeEqual(signature, sign(expires));
}

function readCookie(req: Request, name: string): string | undefined {
  const header = req.headers.cookie;
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return undefined;
}

export function isAdminRequest(req: Request): boolean {
  return verifyAdminToken(readCookie(req, ADMIN_COOKIE_NAME));
}

export function setAdminCookie(req: Request, res: Response): void {
  res.cookie(ADMIN_COOKIE_NAME, createAdminToken(), {
    ...getSessionCookieOptions(req),
    maxAge: SESSION_TTL_MS,
  });
}

export function clearAdminCookie(req: Request, res: Response): void {
  res.clearCookie(ADMIN_COOKIE_NAME, { ...getSessionCookieOptions(req), maxAge: -1 });
}
