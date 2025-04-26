
import { useState } from "react";
import { AgentProvider } from "@/contexts/AgentContext";
import { AgentGallery } from "@/components/AgentGallery";
import { ChatInterface } from "@/components/ChatInterface";
import { useAgents } from "@/contexts/AgentContext";
import { Brain, Sparkles } from "lucide-react";

function MainView() {
  const { activeAgentId } = useAgents();
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      {activeAgentId ? <ChatInterface /> : <AgentGallery />}
    </div>
  );
}

function Header() {
  return (
    <header className="w-full py-6 px-6 flex justify-center">
      <div className="flex items-center space-x-2">
        <div className="rounded-full bg-accent/20 p-2 animate-pulse-glow">
          <Brain className="h-8 w-8 text-accent" />
        </div>
        <h1 className="text-3xl font-bold gradient-text">Echo AI</h1>
        <div className="rounded-full bg-accent/20 p-2 animate-pulse-glow">
          <Sparkles className="h-8 w-8 text-accent" />
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="max-w-5xl mx-auto text-center px-4 pb-12">
      <h2 className="text-5xl font-bold mb-6 gradient-text">Dialogue Craft</h2>
      <p className="text-xl text-muted-foreground mb-8">
        Create context-aware conversational agents with unique personalities.
        Design your AI companions and have natural, flowing conversations.
      </p>
    </section>
  );
}

export default function IndexPage() {
  return (
    <AgentProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Hero />
        <MainView />
      </div>
    </AgentProvider>
  );
}
