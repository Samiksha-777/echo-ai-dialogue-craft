
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Agent } from "@/types/Agent";
import { AgentCard } from "./AgentCard";
import { AgentDialog } from "./AgentDialog";
import { useAgents } from "@/contexts/AgentContext";

export function AgentGallery() {
  const { agents } = useAgents();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editAgent, setEditAgent] = useState<Agent | null>(null);

  const handleNewAgent = () => {
    setEditAgent(null);
    setDialogOpen(true);
  };

  const handleEditAgent = (agent: Agent) => {
    setEditAgent(agent);
    setDialogOpen(true);
  };

  return (
    <div className="container py-8 px-4 mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold gradient-text">AI Dialogue Agents</h2>
        <Button 
          onClick={handleNewAgent}
          className="bg-accent hover:bg-accent/90"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Create Agent
        </Button>
      </div>

      {agents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-4">No agents available</p>
          <Button onClick={handleNewAgent} variant="outline">Create Your First Agent</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {agents.map(agent => (
            <AgentCard key={agent.id} agent={agent} onEdit={handleEditAgent} />
          ))}
        </div>
      )}
      
      <AgentDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        editAgent={editAgent} 
      />
    </div>
  );
}
