import type { MetadataRoute } from "next"

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/pricing",
    "/login",
    "/signup",
    "/dashboard",
    "/relationships",
    "/timeline",
    "/simulations",
    "/settings",
    "/onboarding",
    "/privacy",
    "/terms",
    "/support",
    "/status",
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }))
}
