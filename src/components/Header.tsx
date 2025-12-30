import { Search, Crown } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  userName?: string;
}

export function Header({ userName = "Guest" }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Hi, {userName}!
        </h1>
        <p className="text-muted-foreground">
          Let's create your personalized meal plan today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for recipes..."
            className="w-64 h-11 pl-11 pr-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>

        {/* Upgrade Button */}
        <Button variant="accent" size="lg">
          <Crown className="w-4 h-4" />
          Upgrade
        </Button>
      </div>
    </header>
  );
}
