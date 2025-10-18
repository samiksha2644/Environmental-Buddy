import { Link } from "react-router-dom";
import { Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/env-buddy-logo.png";

const Navbar = () => {
  const navItems = [
    { name: "Quiz & Learning", path: "/quiz" },
    { name: "Tasks", path: "/tasks" },
    { name: "Events", path: "/events" },
    { name: "Analytics", path: "/analytics" },
    { name: "Info Hub", path: "/info-hub" },
  ];

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo and Site Name */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Environmental Buddy Logo" className="w-10 h-10" />
            <span className="text-xl font-bold text-primary">Environmental Buddy</span>
          </Link>

          {/* Right: Menu Items */}
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors hidden md:block"
              >
                {item.name}
              </Link>
            ))}
            
            <Link to="/login">
              <Button variant="outline" size="sm" className="hidden md:flex">
                Login
              </Button>
            </Link>

            {/* Dark Mode / Settings Icon */}
            <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
              <Moon className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
