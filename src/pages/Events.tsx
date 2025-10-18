import Navbar from "@/components/Navbar";
import FloatingChatbot from "@/components/FloatingChatbot";
import { Card } from "@/components/ui/card";

const Events = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <Navbar />
      <FloatingChatbot />
      
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 text-foreground">
            Events
          </h1>
          <p className="text-muted-foreground text-lg">
            Join environmental events and activities
          </p>
        </div>

        <Card className="p-8 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <div className="text-center py-12">
            <p className="text-2xl text-muted-foreground mb-4">📅</p>
            <p className="text-lg text-muted-foreground">
              Event listings coming soon...
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Events;
