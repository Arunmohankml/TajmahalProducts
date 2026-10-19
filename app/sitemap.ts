import { MetadataRoute } from "next";
import { SEO_BLOG_POSTS } from "@/lib/seo_blogs_data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tajmahalproducts.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/shop",
    "/collections",
    "/craftsmanship",
    "/heritage",
    "/custom-order",
    "/news",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/news" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = SEO_BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: new Date(post.publishedAt || new Date()),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
