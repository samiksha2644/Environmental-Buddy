import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageSquare, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingChatbot from "@/components/FloatingChatbot";
import character1 from "@/assets/character1.png";
import character2 from "@/assets/character2.png";

const Dialogue = () => {
  const [topic, setTopic] = useState("");
  const [dialogueGenerated, setDialogueGenerated] = useState(false);
  const [dialogue, setDialogue] = useState<Array<{ character: number; text: string }>>([]);

  const generateDialogue = () => {
    if (topic.trim()) {
      setDialogueGenerated(true);
      // Placeholder dialogue - will be connected to AI API later
      setDialogue([
        { character: 1, text: `Hey! I've been learning about ${topic}. It's really interesting!` },
        { character: 2, text: "That sounds cool! Can you tell me more about it?" },
        { character: 1, text: "Sure! Let me explain the key concepts..." },
        { character: 2, text: "I think I'm starting to understand now. Thanks for explaining!" },
      ]);
      console.log("Generating dialogue for:", topic);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <FloatingChatbot />
      
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors"
        >
          ← Back to Home
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mb-4 animate-float">
            <MessageSquare className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Dialogue Generator
          </h1>
          <p className="text-muted-foreground text-lg">
            Learn through conversation between characters
          </p>
        </div>

        <Card className="p-8 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium mb-2">
                Enter a topic to learn about
              </label>
              <Input
                id="topic"
                type="text"
                placeholder="e.g., Solar Energy, Water Conservation, Composting..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="text-lg h-12"
                onKeyDown={(e) => e.key === "Enter" && generateDialogue()}
              />
            </div>

            <Button
              variant="eco"
              size="lg"
              className="w-full"
              onClick={generateDialogue}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Dialogue
            </Button>

            {dialogueGenerated && (
              <div className="mt-8 space-y-6 animate-in fade-in duration-500">
                <div className="flex justify-center gap-12 mb-8">
                  <div className="text-center">
                    <img
                      src={character1}
                      alt="Character 1"
                      className="w-24 h-24 rounded-full border-4 border-primary shadow-lg mb-2"
                    />
                    <p className="text-sm font-semibold text-primary">Alex</p>
                  </div>
                  <div className="text-center">
                    <img
                      src={character2}
                      alt="Character 2"
                      className="w-24 h-24 rounded-full border-4 border-accent shadow-lg mb-2"
                    />
                    <p className="text-sm font-semibold text-accent">Sam</p>
                  </div>
                </div>

                {dialogue.map((line, index) => (
                  <div
                    key={index}
                    className={`flex gap-4 ${line.character === 2 ? "flex-row-reverse" : ""}`}
                  >
                    <img
                      src={line.character === 1 ? character1 : character2}
                      alt={`Character ${line.character}`}
                      className="w-12 h-12 rounded-full border-2 border-primary/30 flex-shrink-0"
                    />
                    <div
                      className={`flex-1 p-4 rounded-2xl shadow-md ${
                        line.character === 1
                          ? "bg-primary/10 border border-primary/20"
                          : "bg-accent/10 border border-accent/20"
                      }`}
                    >
                      <p className="text-foreground">{line.text}</p>
                    </div>
                  </div>
                ))}

                <p className="text-center text-sm text-muted-foreground mt-6">
                  AI-powered dialogue generation coming soon...
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dialogue;
