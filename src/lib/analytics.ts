import { createServerFn } from "@tanstack/react-start";

/**
 * The Google Analytics measurement ID is stored as a server secret.
 * It is intentionally public once rendered (it ships with every GA page),
 * but it is served to the client through this server function rather than
 * being hardcoded or exposed via a VITE_ variable.
 */
export const getMeasurementId = createServerFn({ method: "GET" }).handler(() => {
  return process.env["GOOGLE_ANALYTICS_MEASUREMENT_ID"] ?? null;
});

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let initialized = false;

export async function initAnalytics() {
  if (initialized || typeof window === "undefined") return;
  const measurementId = await getMeasurementId();
  if (!measurementId) {
    console.warn("Google Analytics measurement ID not configured");
    return;
  }
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("set", "developer_id.dZjgwMW", true);
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
}

export function trackPageView(path: string) {
  if (!initialized || typeof window === "undefined") return;
  window.gtag("event", "page_view", { page_path: path });
}
