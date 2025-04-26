
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Edit, Trash2 } from "lucide-react";
import { Agent } from "@/types/Agent";
import { useAgents } from "@/contexts/AgentContext";

interface AgentCardProps {
  agent: Agent;
  onEdit: (agent: Agent) => void;
}

export function AgentCard({ agent, onEdit }: AgentCardProps) {
  const { setActiveAgentId, deleteAgent } = useAgents();

  return (
    <Card className="border border-border bg-secondary overflow-hidden transition-all hover:shadow-md hover:border-accent/50">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{agent.avatar}</div>
            <CardTitle className="text-xl gradient-text font-semibold">{agent.name}</CardTitle>
          </div>
        </div>
        <CardDescription className="text-sm text-muted-foreground mt-2">
          {agent.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground/80 italic">"{agent.personality}"</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setActiveAgentId(agent.id)}
          className="hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Chat
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onEdit(agent)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => deleteAgent(agent.id)}
            className="hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
