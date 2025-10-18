import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, MessageSquare, Leaf } from "lucide-react";
import FloatingChatbot from "@/components/FloatingChatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <FloatingChatbot />
      
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-16 pt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mb-6 animate-float shadow-lg">
            <Leaf className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            EcoLearn
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn about the environment through interactive mind maps and engaging dialogues
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link to="/mindmap" className="group">
            <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-card/50 backdrop-blur-sm cursor-pointer">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-md">
                  <Brain className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Generate Mind Map
                </h2>
                <p className="text-muted-foreground">
                  Visualize complex environmental concepts with interactive mind maps
                </p>
                <Button variant="eco" size="lg" className="mt-4">
                  Get Started →
                </Button>
              </div>
            </Card>
          </Link>

          <Link to="/dialogue" className="group">
            <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-card/50 backdrop-blur-sm cursor-pointer">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/70 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-md">
                  <MessageSquare className="w-8 h-8 text-accent-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Generate Dialogue
                </h2>
                <p className="text-muted-foreground">
                  Learn through conversations between friendly characters
                </p>
                <Button variant="eco" size="lg" className="mt-4">
                  Get Started →
                </Button>
              </div>
            </Card>
          </Link>
        </div>

        <div className="text-center mt-12 p-6 bg-secondary/30 rounded-2xl max-w-2xl mx-auto backdrop-blur-sm">
          <p className="text-sm text-muted-foreground mb-2">
            💡 Need help? Click the Environment Buddy button below!
          </p>
          <p className="text-xs text-muted-foreground">
            AI-powered features coming soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
