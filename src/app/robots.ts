import type { MetadataRoute } from "next";
import { SITE, absoluteUrl } from "@/content/site";

// robots.txt. Permite crawl total e aponta pro sitemap.
// Doc: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/metadata/robots.md

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/styleguide"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE.baseUrl,
  };
}
