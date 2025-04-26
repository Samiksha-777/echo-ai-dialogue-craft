
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Agent } from "@/types/Agent";
import { useAgents } from "@/contexts/AgentContext";

interface AgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editAgent: Agent | null;
}

const DEFAULT_AGENT: Omit<Agent, 'id' | 'context'> = {
  name: "",
  avatar: "🤖",
  description: "",
  personality: "",
  greeting: ""
};

const EMOJI_OPTIONS = ["🤖", "👩‍🚀", "🧙", "👨‍💻", "🧠", "👾", "🦾", "🔮", "👽", "🧚", "🧘", "🦸", "🌈", "🌙", "🔭", "📚", "🎮", "🎨", "🎭", "🧸"];

export function AgentDialog({ open, onOpenChange, editAgent }: AgentDialogProps) {
  const { createNewAgent, updateAgent } = useAgents();
  const [agent, setAgent] = useState<Omit<Agent, 'id' | 'context'>>(DEFAULT_AGENT);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (editAgent) {
      // When editing, copy all properties except 'id' and 'context'
      const { id, context, ...rest } = editAgent;
      setAgent(rest);
    } else {
      // When creating new, use default
      setAgent(DEFAULT_AGENT);
    }
  }, [editAgent, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAgent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editAgent) {
      updateAgent({ ...editAgent, ...agent });
    } else {
      createNewAgent(agent);
    }
    
    onOpenChange(false);
  };

  const selectEmoji = (emoji: string) => {
    setAgent(prev => ({ ...prev, avatar: emoji }));
    setShowEmojiPicker(false);
  };

  const isValid = agent.name && agent.description && agent.greeting;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl gradient-text">
              {editAgent ? "Edit Agent" : "Create New Agent"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="flex gap-4">
              <div className="w-1/4">
                <Label htmlFor="avatar">Avatar</Label>
                <div className="mt-2 relative">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="text-3xl h-16 w-16"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    {agent.avatar}
                  </Button>
                  
                  {showEmojiPicker && (
                    <div className="absolute top-full left-0 mt-2 p-2 bg-card border border-border rounded-md z-10 grid grid-cols-5 gap-2 shadow-lg">
                      {EMOJI_OPTIONS.map(emoji => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => selectEmoji(emoji)}
                          className="text-2xl p-1 hover:bg-accent/20 rounded"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="w-3/4">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Agent name"
                  value={agent.name}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Short description"
                value={agent.description}
                onChange={handleChange}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="personality">Personality</Label>
              <Textarea
                id="personality"
                name="personality"
                placeholder="Describe the agent's personality traits"
                value={agent.personality}
                onChange={handleChange}
                className="mt-2"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="greeting">Greeting Message</Label>
              <Textarea
                id="greeting"
                name="greeting"
                placeholder="First message the agent will send"
                value={agent.greeting}
                onChange={handleChange}
                className="mt-2"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid} className="bg-accent hover:bg-accent/90">
              {editAgent ? "Update Agent" : "Create Agent"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
