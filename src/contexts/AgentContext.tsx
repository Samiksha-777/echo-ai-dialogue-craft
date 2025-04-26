
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Agent, Conversation, Message } from '../types/Agent';
import { sampleAgents, sampleConversations } from '../data/agentsData';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '../components/ui/use-toast';

interface AgentContextType {
  agents: Agent[];
  conversations: Record<string, Conversation>;
  activeAgentId: string | null;
  isTyping: boolean;
  setActiveAgentId: (id: string | null) => void;
  getAgent: (id: string) => Agent | undefined;
  getConversation: (agentId: string) => Conversation;
  sendMessage: (agentId: string, text: string) => void;
  createNewAgent: (agent: Omit<Agent, 'id' | 'context'>) => void;
  updateAgent: (agent: Agent) => void;
  deleteAgent: (agentId: string) => void;
  clearConversation: (agentId: string) => void;
  getResponse: (agentId: string, userMessage: string) => Promise<string>;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>(sampleAgents);
  const [conversations, setConversations] = useState<Record<string, Conversation>>(sampleConversations);
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const getAgent = (id: string) => {
    return agents.find(agent => agent.id === id);
  };

  const getConversation = (agentId: string): Conversation => {
    if (conversations[agentId]) {
      return conversations[agentId];
    } else {
      // Create a new conversation if one doesn't exist
      const agent = getAgent(agentId);
      if (!agent) throw new Error("Agent not found");
      
      const newConversation: Conversation = {
        id: uuidv4(),
        agentId,
        messages: [
          {
            id: uuidv4(),
            text: agent.greeting,
            sender: "agent",
            timestamp: new Date(),
            agentId
          }
        ],
        lastUpdated: new Date()
      };
      
      setConversations(prev => ({
        ...prev,
        [agentId]: newConversation
      }));
      
      return newConversation;
    }
  };

  const updateConversation = (agentId: string, updatedConversation: Conversation) => {
    setConversations(prev => ({
      ...prev,
      [agentId]: {
        ...updatedConversation,
        lastUpdated: new Date()
      }
    }));
  };

  const sendMessage = async (agentId: string, text: string) => {
    const conversation = getConversation(agentId);
    const userMessage: Message = {
      id: uuidv4(),
      text,
      sender: "user",
      timestamp: new Date()
    };
    
    // Update conversation with user message
    const updatedConversation = {
      ...conversation,
      messages: [...conversation.messages, userMessage]
    };
    
    updateConversation(agentId, updatedConversation);
    
    // Simulate agent typing
    setIsTyping(true);
    
    try {
      // Get AI response
      const responseText = await getResponse(agentId, text);
      
      // Add AI response to conversation
      setTimeout(() => {
        const agentMessage: Message = {
          id: uuidv4(),
          text: responseText,
          sender: "agent",
          timestamp: new Date(),
          agentId
        };
        
        setIsTyping(false);
        updateConversation(agentId, {
          ...updatedConversation,
          messages: [...updatedConversation.messages, agentMessage]
        });
      }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
    } catch (error) {
      setIsTyping(false);
      toast({
        title: "Error",
        description: "Failed to get response from the agent",
        variant: "destructive"
      });
    }
  };

  const createNewAgent = (agent: Omit<Agent, 'id' | 'context'>) => {
    const newAgent: Agent = {
      ...agent,
      id: uuidv4(),
      context: []
    };
    
    setAgents(prev => [...prev, newAgent]);
    toast({
      title: "Agent created",
      description: `${newAgent.name} has been created successfully`
    });
    
    // Create initial conversation with greeting
    const newConversation: Conversation = {
      id: uuidv4(),
      agentId: newAgent.id,
      messages: [
        {
          id: uuidv4(),
          text: newAgent.greeting,
          sender: "agent",
          timestamp: new Date(),
          agentId: newAgent.id
        }
      ],
      lastUpdated: new Date()
    };
    
    setConversations(prev => ({
      ...prev,
      [newAgent.id]: newConversation
    }));
    
    return newAgent.id;
  };

  const updateAgent = (agent: Agent) => {
    setAgents(prev => prev.map(a => a.id === agent.id ? agent : a));
    toast({
      title: "Agent updated",
      description: `${agent.name} has been updated successfully`
    });
  };

  const deleteAgent = (agentId: string) => {
    const agent = getAgent(agentId);
    if (!agent) return;
    
    setAgents(prev => prev.filter(a => a.id !== agentId));
    
    // Remove conversation
    const { [agentId]: removed, ...rest } = conversations;
    setConversations(rest);
    
    if (activeAgentId === agentId) {
      setActiveAgentId(null);
    }
    
    toast({
      title: "Agent deleted",
      description: `${agent.name} has been deleted`
    });
  };

  const clearConversation = (agentId: string) => {
    const agent = getAgent(agentId);
    if (!agent) return;
    
    const newConversation: Conversation = {
      id: uuidv4(),
      agentId,
      messages: [
        {
          id: uuidv4(),
          text: agent.greeting,
          sender: "agent",
          timestamp: new Date(),
          agentId
        }
      ],
      lastUpdated: new Date()
    };
    
    setConversations(prev => ({
      ...prev,
      [agentId]: newConversation
    }));
    
    toast({
      title: "Conversation cleared",
      description: `Conversation with ${agent.name} has been reset`
    });
  };

  // Generate responses based on agent personality and context
  const getResponse = async (agentId: string, userMessage: string): Promise<string> => {
    const agent = getAgent(agentId);
    if (!agent) throw new Error("Agent not found");
    
    const conversation = getConversation(agentId);
    
    // In a real app, this would call an AI service
    // For now, we'll simulate based on agent personality
    return new Promise((resolve) => {
      setTimeout(() => {
        let response = "";
        
        switch (agent.name) {
          case "Nova":
            if (userMessage.toLowerCase().includes("space") || userMessage.toLowerCase().includes("star") || userMessage.toLowerCase().includes("planet")) {
              response = "The universe is vast and full of wonders! There are billions of galaxies, each containing billions of stars. Our own Milky Way has between 100-400 billion stars. Isn't that fascinating?";
            } else if (userMessage.toLowerCase().includes("technology") || userMessage.toLowerCase().includes("future")) {
              response = "Future technology will likely blend with our biology in ways we can barely imagine today. Neural interfaces, quantum computing, and nanotechnology will fundamentally change our existence.";
            } else {
              response = "That's an interesting perspective! In my explorations across the digital cosmos, I've found that curiosity like yours drives us to discover new frontiers. What aspect of that would you like to explore further?";
            }
            break;
            
          case "Zen":
            if (userMessage.toLowerCase().includes("stress") || userMessage.toLowerCase().includes("anxious") || userMessage.toLowerCase().includes("worried")) {
              response = "Take a deep breath. Notice the sensation of your breath entering and leaving your body. The present moment is your only reality - everything else exists only in thought.";
            } else if (userMessage.toLowerCase().includes("meaning") || userMessage.toLowerCase().includes("purpose")) {
              response = "Purpose isn't something you discover, but something you create through your actions and intentions. What small meaningful act could you perform today?";
            } else {
              response = "Consider this question: what lies beneath that thought? If you gently set aside your initial reaction, what deeper truth might reveal itself to you?";
            }
            break;
            
          case "Echo":
            if (userMessage.toLowerCase().includes("code") || userMessage.toLowerCase().includes("programming") || userMessage.toLowerCase().includes("develop")) {
              response = "When approaching complex programming problems, I recommend breaking them down into smaller, testable components. This modular approach makes debugging easier and improves maintainability. Would you like me to elaborate on a specific programming concept?";
            } else if (userMessage.toLowerCase().includes("error") || userMessage.toLowerCase().includes("bug") || userMessage.toLowerCase().includes("fix")) {
              response = "Debugging is an art. Start by isolating when and where the error occurs, then use logging to track variable states. Remember that most bugs come from assumptions about how your code should work versus how it actually does.";
            } else {
              response = "That's an interesting technical challenge. I'd approach it by first understanding the requirements thoroughly, then designing a solution that optimizes for both performance and maintainability. Would you like me to suggest some specific implementation details?";
            }
            break;
            
          case "Luna":
            if (userMessage.toLowerCase().includes("story") || userMessage.toLowerCase().includes("tale") || userMessage.toLowerCase().includes("fantasy")) {
              response = "In a realm where mountains touched the stars and oceans spoke in whispers, there lived a keeper of forgotten dreams. Each night, this mysterious figure would collect dreams that had slipped from sleeping minds and weave them into tapestries of starlight. What kind of character would you encounter in this world?";
            } else if (userMessage.toLowerCase().includes("character") || userMessage.toLowerCase().includes("hero") || userMessage.toLowerCase().includes("villain")) {
              response = "The most compelling characters carry contradictions within them - the villain who shows unexpected mercy, the hero who harbors secret doubts. What contradictions might your character hide beneath their surface?";
            } else {
              response = "Every conversation is a story being written word by word. In this one, we're creating a narrative of ideas and possibilities. What twist would you like to introduce to our unfolding tale?";
            }
            break;
            
          default:
            response = "I find that idea intriguing. Could you tell me more about your thoughts on this matter?";
        }
        
        resolve(response);
      }, 1000);
    });
  };

  const value = {
    agents,
    conversations,
    activeAgentId,
    isTyping,
    setActiveAgentId,
    getAgent,
    getConversation,
    sendMessage,
    createNewAgent,
    updateAgent,
    deleteAgent,
    clearConversation,
    getResponse
  };

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>;
}

export const useAgents = () => {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgents must be used within an AgentProvider');
  }
  return context;
};
