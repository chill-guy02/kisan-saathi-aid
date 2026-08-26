import { createFileRoute } from "@tanstack/react-router";
import { CollectivePage } from "@/components/kisan/CollectivePage";

export const Route = createFileRoute("/collective")({
  head: () => ({
    meta: [
      { title: "किसान समूह — मिलकर खरीदें, बेचें, भंडारण करें | Kisan Collective" },
      {
        name: "description",
        content:
          "किसान समूह: सामूहिक बिक्री, सामूहिक खरीद और सामूहिक भंडारण के अवसर — बेहतर भाव और कम लागत के लिए। डेमो डेटा।",
      },
      { property: "og:title", content: "किसान समूह — Kisan Collective" },
      {
        property: "og:description",
        content: "मिलकर बेचें, मिलकर खरीदें और मिलकर भंडारण करें — छोटे किसानों की बड़ी सौदेबाज़ी।",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollectivePage,
});
