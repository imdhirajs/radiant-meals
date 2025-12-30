import { 
  Home, 
  Utensils, 
  Calendar, 
  BarChart3, 
  Settings, 
  User,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "meals", icon: Utensils, label: "Meals" },
  { id: "calendar", icon: Calendar, label: "Calendar" },
  { id: "stats", icon: BarChart3, label: "Statistics" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export function Sidebar({ activeItem = "home", onItemClick }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-20 flex flex-col items-center py-6 bg-card border-r border-border/50">
      {/* Logo */}
      <div className="mb-8 w-12 h-12 rounded-xl gradient-accent flex items-center justify-center shadow-glow">
        <Sparkles className="w-6 h-6 text-accent-foreground" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.id)}
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-soft" 
                  : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
              )}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </nav>

      {/* User Avatar */}
      <button className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-mint-200 transition-colors">
        <User className="w-5 h-5" />
      </button>
    </aside>
  );
}
