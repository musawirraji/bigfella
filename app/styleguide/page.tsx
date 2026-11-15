import type { Metadata } from "next";
import { StyleGuideScreen } from "@/features/styleguide/ui/screens/StyleGuideScreen";

// The style guide keeps its own tab title, so the root layout can describe the real site.
export const metadata: Metadata = {
  title: "Style Guide | Bigfella Auto Express",
  description: "Design system specimen for Bigfella Auto Express.",
};

export default function StyleGuidePage() {
  return <StyleGuideScreen />;
}
