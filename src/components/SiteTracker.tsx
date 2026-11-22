"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

/**
 * Tracking anonyme de la vitrine DEVIA (sans cookie identifiant → RGPD-friendly).
 * - session_id temporaire en sessionStorage (effacé à la fermeture de l'onglet)
 * - envoie un "pageview" à chaque changement de page
 * - détecte la source (referrer + UTM)
 *
 * Pour tracker un clic important ailleurs dans le site :
 *   import { trackEvent } from "@/components/SiteTracker";
 *   trackEvent("cta_acheter");
 */

// REFUS DE LA MESURE : garde dans le navigateur (localStorage, cle devia_mesure). Un
// navigateur qui demande a ne pas etre suivi (Global Privacy Control, Do Not Track)
// n est jamais mesure, sans avoir a cliquer.
const CLE_REFUS = "devia_mesure";

export function signalNePasSuivre(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  return nav.globalPrivacyControl === true || navigator.doNotTrack === "1";
}

export function mesureRefusee(): boolean {
  if (signalNePasSuivre()) return true;
  try {
    return localStorage.getItem(CLE_REFUS) === "refus";
  } catch {
    return false;
  }
}

export function choisirMesure(accepte: boolean): void {
  try {
    if (accepte) localStorage.removeItem(CLE_REFUS);
    else localStorage.setItem(CLE_REFUS, "refus");
  } catch {
    // stockage bloque par le navigateur : rien a garder
  }
}

function getSessionId(): string {
  try {
    let sid = sessionStorage.getItem("devia_sid");
    if (!sid) {
      sid =
        Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
      sessionStorage.setItem("devia_sid", sid);
    }
    return sid;
  } catch {
    return "anon";
  }
}

function getDevice(): string {
  if (typeof navigator === "undefined") return "unknown";
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
    ? "mobile"
    : "desktop";
}

function getReferrerDomain(): string | null {
  try {
    if (!document.referrer) return null;
    const url = new URL(document.referrer);
    // Ignore les navigations internes
    if (url.hostname === window.location.hostname) return null;
    return url.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export async function trackEvent(
  eventType: string,
  path?: string
): Promise<void> {
  if (mesureRefusee()) return;
  try {
    const params = new URLSearchParams(window.location.search);
    await supabase.from("site_events").insert({
      event_type: eventType,
      path: path ?? window.location.pathname,
      referrer_domain: getReferrerDomain(),
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      session_id: getSessionId(),
      device: getDevice(),
    });
  } catch {
    // tracking best-effort, ne jamais casser le site
  }
}

export default function SiteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent("pageview", pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
