"use client";

export const MASTER_ADMIN_EMAILS = [
  "tmproducts.bhadohi@gmail.com",
  "hasxxann@gmail.com",
  "admin@tajmahalproducts.com",
];

export const ADMIN_AUTH_KEY = "tajmahal_admin_session";

export function getAdminSession(): { email: string; name: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ADMIN_AUTH_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {}
  return null;
}

export function setAdminSession(email: string, name: string = "Tajmahal Administrator") {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify({ email, name }));
  window.dispatchEvent(new Event("tajmahal_admin_auth_changed"));
}

export function clearAdminSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_AUTH_KEY);
  window.dispatchEvent(new Event("tajmahal_admin_auth_changed"));
}
