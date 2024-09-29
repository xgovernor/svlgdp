import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://svlgdp.vercel.app",
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://svlgdp.vercel.app/auth/login",
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: "https://svlgdp.vercel.app/community",
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://svlgdp.vercel.app/contact",
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://svlgdp.vercel.app/about",
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
