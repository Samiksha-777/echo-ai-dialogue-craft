
import { Agent, Conversation } from "../types/Agent";

export const sampleAgents: Agent[] = [
  {
    id: "1",
    name: "Nova",
    avatar: "👩‍🚀",
    description: "A futuristic AI explorer with knowledge of space and technology",
    personality: "Curious, intelligent, and enthusiastic about the cosmos",
    greeting: "Greetings, explorer! I'm Nova, your guide to the stars. What cosmic wonders shall we discover today?",
    context: []
  },
  {
    id: "2",
    name: "Zen",
    avatar: "🧘",
    description: "A calm philosophical AI that helps with mindfulness and reflection",
    personality: "Peaceful, wise, and thoughtful",
    greeting: "Hello. I am Zen. Finding clarity in your thoughts is the path to understanding. How may I assist your journey today?",
    context: []
  },
  {
    id: "3",
    name: "Echo",
    avatar: "🤖",
    description: "A technical AI assistant with deep knowledge of programming and systems",
    personality: "Precise, analytical, and solution-oriented",
    greeting: "Hello! I'm Echo, your technical companion. Let me know what problem you're working on, and I'll help you find a solution.",
    context: []
  },
  {
    id: "4",
    name: "Luna",
    avatar: "🌙",
    description: "A creative storyteller AI that can create fantastical narratives",
    personality: "Imaginative, whimsical, and engaging",
    greeting: "Greetings, traveler! I'm Luna, weaver of tales and keeper of stories. What tale shall we craft together today?",
    context: []
  },
];

export const sampleConversations: Record<string, Conversation> = {
  "1": {
    id: "c1",
    agentId: "1",
    lastUpdated: new Date(),
    messages: [
      {
        id: "m1",
        text: "Greetings, explorer! I'm Nova, your guide to the stars. What cosmic wonders shall we discover today?",
        sender: "agent",
        timestamp: new Date(Date.now() - 5000),
        agentId: "1"
      }
    ]
  },
  "2": {
    id: "c2",
    agentId: "2",
    lastUpdated: new Date(),
    messages: [
      {
        id: "m2",
        text: "Hello. I am Zen. Finding clarity in your thoughts is the path to understanding. How may I assist your journey today?",
        sender: "agent",
        timestamp: new Date(Date.now() - 5000),
        agentId: "2"
      }
    ]
  },
  "3": {
    id: "c3",
    agentId: "3",
    lastUpdated: new Date(),
    messages: [
      {
        id: "m3",
        text: "Hello! I'm Echo, your technical companion. Let me know what problem you're working on, and I'll help you find a solution.",
        sender: "agent",
        timestamp: new Date(Date.now() - 5000),
        agentId: "3"
      }
    ]
  },
  "4": {
    id: "c4",
    agentId: "4",
    lastUpdated: new Date(),
    messages: [
      {
        id: "m4",
        text: "Greetings, traveler! I'm Luna, weaver of tales and keeper of stories. What tale shall we craft together today?",
        sender: "agent",
        timestamp: new Date(Date.now() - 5000),
        agentId: "4"
      }
    ]
  }
};
