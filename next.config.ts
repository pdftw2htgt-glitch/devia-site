import type { NextConfig } from "next";

// En-tetes de securite.
//
// La CSP a d abord ete posee en observation seule (Report-Only) a cote d une version
// minimale appliquee. Le 15/11, les 48 pages du site (francais et anglais) ont ete
// parcourues avec un ecouteur securitypolicyviolation : aucun manquement. La regle
// complete est donc appliquee. Si une page casse, la console du navigateur dit quelle
// directive la bloque.

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.supabase.co",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co https://api.stripe.com https://devia-iota.vercel.app",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://checkout.stripe.com",
  "object-src 'none'",
].join("; ");

const ENTETES = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), usb=(), payment=(self)" },
  { key: "Content-Security-Policy", value: CSP },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:chemin*", headers: ENTETES }];
  },
};

export default nextConfig;
