import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Carbon Nexus",
    short_name: "Carbon Nexus",
    description: "Premium sustainability, ESG, carbon credit, and dMRV platform prototype.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#9333ea",
    icons: [
      {
        src: "/brandmark.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
