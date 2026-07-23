import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { AISection } from "@/components/AISection";
import { ERPSection } from "@/components/ERPSection";
import { StudioSection } from "@/components/StudioSection";

import { Team } from "@/components/Team";

import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { SoundProvider } from "@/lib/sound-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NYGENX  — AI-Powered Business Operating System" },
      { name: "description", content: "Premium AI, ERP, creative and cloud capabilities unified into one futuristic operating system for ambitious teams." },
      { property: "og:title", content: "NYGENX  — Transforming Businesses Through AI-Powered Innovation" },
      { property: "og:description", content: "Premium AI, ERP, creative and cloud capabilities unified into one futuristic operating system." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SoundProvider>
      <Nav />
      <main>
        <Hero />
        <Services />
        <AISection />
        <ERPSection />
        <StudioSection />
        
        <Team />
        
      </main>
      <Footer />
      <Chatbot />
    </SoundProvider>
  );
}
