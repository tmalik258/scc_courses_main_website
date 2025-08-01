// lib/categoryStyles.ts

export type CategoryStyle = {
  bgColor: string;
  textColor: string;
  iconKey: string;
};

export const categoryStyles: Record<string, CategoryStyle> = {
  "AI Calling": {
    bgColor: "bg-purple-500/15",
    textColor: "text-purple-500",
    iconKey: "ai-calling",
  },
  "WhatsApp Chatbots": {
    bgColor: "bg-green-500/15",
    textColor: "text-green-500",
    iconKey: "whatsapp",
  },
  "Make Automations": {
    bgColor: "bg-orange-500/15",
    textColor: "text-orange-500",
    iconKey: "automation",
  },
  "App Development": {
    bgColor: "bg-pink-500/15",
    textColor: "text-pink-500",
    iconKey: "app",
  },
  "Web Development": {
    bgColor: "bg-cyan-400/15",
    textColor: "text-cyan-400",
    iconKey: "web",
  },
  "Data Science": {
    bgColor: "bg-blue-600/15",
    textColor: "text-blue-600",
    iconKey: "data",
  },
};
