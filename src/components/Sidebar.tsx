import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Settings, 
  BarChart3,
  Database,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "documents", label: "Knowledge Base", icon: FileText },
  { id: "conversations", label: "Conversations", icon: MessageSquare },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <aside className="glass-card border-r border-white/10 w-64 h-screen overflow-y-auto">
      <div className="p-6">
        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-11",
                  isActive && "gradient-primary shadow-primary"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </div>

        <div className="mt-8 p-4 glass-card rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-accent" />
            <span className="font-medium text-sm">AI Status</span>
          </div>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>OpenAI API</span>
              <span className="text-success">Connected</span>
            </div>
            <div className="flex justify-between">
              <span>WhatsApp</span>
              <span className="text-success">Active</span>
            </div>
            <div className="flex justify-between">
              <span>Vector DB</span>
              <span className="text-warning">Syncing</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;