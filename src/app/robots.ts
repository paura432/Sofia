import type { MetadataRoute } from "next";

import { IS_PUBLIC, SITE_URL } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: IS_PUBLIC
      ? {
          userAgent: "*",
          allow: "/",
        }
      : {
          userAgent: "*",
          disallow: "/",
        },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
