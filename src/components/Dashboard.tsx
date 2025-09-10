import { 
  MessageSquare, 
  FileText, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Conversations",
      value: "2,847",
      change: "+12%",
      icon: MessageSquare,
      color: "text-primary"
    },
    {
      title: "Documents in KB",
      value: "156",
      change: "+8",
      icon: FileText,
      color: "text-accent"
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+5%",
      icon: Users,
      color: "text-success"
    },
    {
      title: "Accuracy Rate",
      value: "94.2%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-warning"
    }
  ];

  const recentActivity = [
    { type: "conversation", message: "User asked about refund policy", time: "2 min ago", status: "resolved" },
    { type: "document", message: "New FAQ document uploaded", time: "15 min ago", status: "processed" },
    { type: "conversation", message: "User inquiry about product specs", time: "1 hour ago", status: "resolved" },
    { type: "system", message: "Vector database synchronized", time: "2 hours ago", status: "success" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="glass-card hover-lift animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Metrics */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              AI Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Response Accuracy</span>
                <span className="font-medium">94.2%</span>
              </div>
              <Progress value={94.2} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Knowledge Base Coverage</span>
                <span className="font-medium">87.5%</span>
              </div>
              <Progress value={87.5} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Average Response Time</span>
                <span className="font-medium">1.2s</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>User Satisfaction</span>
                <span className="font-medium">96.1%</span>
              </div>
              <Progress value={96.1} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="flex-shrink-0 mt-1">
                    {activity.status === "resolved" && <CheckCircle className="h-4 w-4 text-success" />}
                    {activity.status === "processed" && <FileText className="h-4 w-4 text-primary" />}
                    {activity.status === "success" && <Zap className="h-4 w-4 text-accent" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant={activity.status === "resolved" ? "default" : "secondary"} className="text-xs">
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;