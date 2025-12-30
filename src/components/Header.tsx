import { Search, Crown, LogOut } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  userName?: string;
  onUpgrade?: () => void;
  onSignOut?: () => void;
}

export function Header({ userName = "Guest", onUpgrade, onSignOut }: HeaderProps) {
  return (
    <header className="w-full bg-gradient-to-r from-background via-card to-background rounded-3xl shadow-soft border border-border/50 px-6 py-4 mb-8">
      <div className="flex items-center justify-between">
        {/* Left side - User greeting */}
        <div className="flex-shrink-0">
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Hi, {userName}!
          </h1>
          <p className="text-muted-foreground text-sm">
            Let's create your personalized meal plan today.
          </p>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for recipes..."
              className="w-full h-11 pl-11 pr-4 rounded-full border border-border/60 bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200"
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Upgrade Button */}
          <Button 
            variant="accent" 
            size="lg"
            onClick={onUpgrade}
            className="rounded-full shadow-md hover:shadow-lg transition-all duration-200 gap-2"
          >
            <Crown className="w-4 h-4" />
            <span className="hidden sm:inline">Upgrade</span>
          </Button>

          {/* Sign Out Button */}
          {onSignOut && (
            <Button
              variant="ghost"
              size="lg"
              onClick={onSignOut}
              className="rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}