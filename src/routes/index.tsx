import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/kisan/Dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "किसान साथी — खेती का डिजिटल साथी | Kisan Saathi" },
      {
        name: "description",
        content:
          "किसान साथी: मौसम, मंडी भाव और खेती की लागत की जानकारी एक जगह, हिंदी में। डेमो प्रोटोटाइप।",
      },
      { property: "og:title", content: "किसान साथी — Kisan Saathi" },
      {
        property: "og:description",
        content: "आपकी खेती का आसान डिजिटल साथी — मौसम, मंडी भाव, लागत कैलकुलेटर और चैट सहायक।",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});
