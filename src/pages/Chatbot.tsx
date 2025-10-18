import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot } from "lucide-react";
import Navbar from "@/components/Navbar";
import chatbotIcon from "@/assets/chatbot-icon.png";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Environment Buddy 🌱 How can I help you learn about the environment today?",
      sender: "bot",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputText,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setInputText("");

      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: "Thanks for your message! AI integration is coming soon. For now, I'm just a placeholder, but soon I'll be able to help you learn about environmental topics! 🌍",
          sender: "bot",
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <Navbar />
      <div className="container max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-4rem)] flex flex-col">

        <Card className="flex-1 flex flex-col shadow-lg border-0 bg-card/50 backdrop-blur-sm overflow-hidden">
          <div className="bg-gradient-to-br from-primary to-accent p-4 flex items-center gap-3">
            <img
              src={chatbotIcon}
              alt="Environment Buddy"
              className="w-12 h-12 rounded-full bg-white/20 p-1"
            />
            <div>
              <h1 className="text-xl font-bold text-primary-foreground">
                Environment Buddy
              </h1>
              <p className="text-sm text-primary-foreground/80">
                Your AI learning companion
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === "bot"
                      ? "bg-gradient-to-br from-primary to-accent"
                      : "bg-secondary"
                  }`}
                >
                  {message.sender === "bot" ? (
                    <Bot className="w-6 h-6 text-primary-foreground" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-muted" />
                  )}
                </div>
                <div
                  className={`flex-1 p-4 rounded-2xl shadow-sm max-w-[80%] ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Ask me anything about the environment..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button
                variant="eco"
                size="icon"
                onClick={handleSend}
                disabled={!inputText.trim()}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Chatbot integration coming soon
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;
