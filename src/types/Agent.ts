
export interface Agent {
  id: string;
  name: string;
  avatar: string;
  description: string;
  personality: string;
  greeting: string;
  context: string[];
}

export interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
  agentId?: string;
}

export interface Conversation {
  id: string;
  agentId: string;
  messages: Message[];
  lastUpdated: Date;
}
