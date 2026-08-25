import type { MetadataRoute } from "next";

const baseUrl = "https://sofia-chernikova.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/work", "/about", "/experience", "/contact"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
