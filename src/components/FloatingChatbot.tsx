import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import chatbotIcon from "@/assets/chatbot-icon.png";

const FloatingChatbot = () => {
  return (
    <Link
      to="/chatbot"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Ask Environment Buddy"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-primary rounded-full blur-lg opacity-50 group-hover:opacity-75 animate-pulse-soft transition-opacity" />
        <div className="relative bg-gradient-to-br from-primary to-accent rounded-full p-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 animate-float">
          <img
            src={chatbotIcon}
            alt="Environment Buddy"
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Ask me!
        </div>
      </div>
    </Link>
  );
};

export default FloatingChatbot;
