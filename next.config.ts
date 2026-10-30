import type { NextConfig } from "next";

// En-tetes de securite.
//
// La CSP est posee en DEUX exemplaires, volontairement :
//   - celle qui s APPLIQUE ne contient que des directives incapables de casser une page
//     (frame-ancestors, base-uri, object-src) ;
//   - celle qui OBSERVE decrit la regle complete, sans rien bloquer. Les manquements
//     s affichent dans la console du navigateur. Une fois la console muette, on recopie
//     la seconde dans la premiere.
// Poser une CSP complete d un coup, c est risquer de casser le site en vente a l aveugle.

const CSP_APPLIQUEE = [
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const CSP_OBSERVEE = [
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
  { key: "Content-Security-Policy", value: CSP_APPLIQUEE },
  { key: "Content-Security-Policy-Report-Only", value: CSP_OBSERVEE },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:chemin*", headers: ENTETES }];
  },
};

export default nextConfig;
