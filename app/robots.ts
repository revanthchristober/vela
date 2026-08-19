import type { MetadataRoute } from "next";

const SITE_URL = process.env["NEXT_PUBLIC_SITE_URL"] ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Engineering surface and a cart that is per-visitor by definition.
      disallow: ["/styleguide", "/cart"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
