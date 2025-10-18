import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Brain, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingChatbot from "@/components/FloatingChatbot";

const MindMap = () => {
  const [concept, setConcept] = useState("");
  const [mindMapGenerated, setMindMapGenerated] = useState(false);

  const generateMindMap = () => {
    if (concept.trim()) {
      setMindMapGenerated(true);
      // Placeholder function - will be connected to API later
      console.log("Generating mind map for:", concept);
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
            <Brain className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Mind Map Generator
          </h1>
          <p className="text-muted-foreground text-lg">
            Visualize concepts and their connections
          </p>
        </div>

        <Card className="p-8 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="concept" className="block text-sm font-medium mb-2">
                Enter a concept or topic
              </label>
              <Input
                id="concept"
                type="text"
                placeholder="e.g., Climate Change, Recycling, Renewable Energy..."
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                className="text-lg h-12"
                onKeyDown={(e) => e.key === "Enter" && generateMindMap()}
              />
            </div>

            <Button
              variant="eco"
              size="lg"
              className="w-full"
              onClick={generateMindMap}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Mind Map
            </Button>

            {mindMapGenerated && (
              <div className="mt-8 p-8 bg-secondary/50 rounded-lg border-2 border-primary/20 min-h-[300px] flex items-center justify-center animate-in fade-in duration-500">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-xl font-semibold text-primary mb-2">
                    Mind Map for: "{concept}"
                  </p>
                  <p className="text-muted-foreground">
                    [Mind Map visualization will appear here]
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    API integration coming soon...
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MindMap;
