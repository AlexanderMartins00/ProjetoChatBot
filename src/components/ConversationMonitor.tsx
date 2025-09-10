import { useState } from "react";
import { 
  MessageSquare, 
  User, 
  Bot, 
  Search, 
  Filter,
  Calendar,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const ConversationMonitor = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);

  const conversations = [
    {
      id: 1,
      user: "+55 11 99999-8888",
      lastMessage: "What's your refund policy?",
      timestamp: "2 min ago",
      status: "resolved",
      messageCount: 5,
      satisfaction: "positive"
    },
    {
      id: 2,
      user: "+55 11 88888-7777",
      lastMessage: "I need help with my order",
      timestamp: "15 min ago",
      status: "active",
      messageCount: 12,
      satisfaction: "neutral"
    },
    {
      id: 3,
      user: "+55 11 77777-6666",
      lastMessage: "Thank you for the help!",
      timestamp: "1 hour ago",
      status: "resolved",
      messageCount: 8,
      satisfaction: "positive"
    },
    {
      id: 4,
      user: "+55 11 66666-5555",
      lastMessage: "This doesn't answer my question",
      timestamp: "2 hours ago",
      status: "escalated",
      messageCount: 15,
      satisfaction: "negative"
    }
  ];

  const messages = [
    {
      id: 1,
      type: "user",
      content: "Hi, I need to know about your refund policy",
      timestamp: "14:25"
    },
    {
      id: 2,
      type: "bot",
      content: "Hello! I'd be happy to help you with information about our refund policy. Based on our current policy, you can request a refund within 30 days of purchase if the item is unused and in its original packaging. Would you like me to provide more specific details about any particular aspect of the refund process?",
      timestamp: "14:25",
      confidence: 0.94,
      sources: ["FAQ - Refund Policy.pdf"]
    },
    {
      id: 3,
      type: "user",
      content: "What about digital products?",
      timestamp: "14:27"
    },
    {
      id: 4,
      type: "bot",
      content: "For digital products, our refund policy is a bit different. Digital products can be refunded within 7 days of purchase if there are technical issues that prevent you from using the product. However, if the digital product has been downloaded and used successfully, refunds are generally not available unless there's a specific technical problem. Would you like me to help you with a specific digital product issue?",
      timestamp: "14:27",
      confidence: 0.87,
      sources: ["Product Catalog 2024.docx", "FAQ - Refund Policy.pdf"]
    },
    {
      id: 5,
      type: "user",
      content: "Perfect, that answers my question. Thank you!",
      timestamp: "14:28"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "success";
      case "active": return "warning";
      case "escalated": return "destructive";
      default: return "secondary";
    }
  };

  const getSatisfactionColor = (satisfaction: string) => {
    switch (satisfaction) {
      case "positive": return "text-success";
      case "negative": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)] animate-fade-in">
      {/* Conversation List */}
      <Card className="glass-card lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Conversations
          </CardTitle>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            <div className="space-y-1 p-3">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedConversation === conv.id 
                      ? "bg-primary/10 border border-primary/20" 
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedConversation(conv.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{conv.user}</span>
                    <Badge variant={getStatusColor(conv.status) as any} className="text-xs">
                      {conv.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate mb-2">
                    {conv.lastMessage}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{conv.timestamp}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{conv.messageCount} msgs</span>
                      <div className={`w-2 h-2 rounded-full ${getSatisfactionColor(conv.satisfaction)}`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Conversation Detail */}
      <Card className="glass-card lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-accent" />
              +55 11 99999-8888
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-success">Resolved</Badge>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Started: Today 14:25</span>
            <span>•</span>
            <span>Duration: 3 min</span>
            <span>•</span>
            <span>Messages: 5</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            <div className="space-y-4 p-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : ""}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground ml-auto"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <div className={`flex items-center gap-2 mt-1 text-xs text-muted-foreground ${
                      message.type === "user" ? "justify-end" : ""
                    }`}>
                      <span>{message.timestamp}</span>
                      {message.type === "bot" && message.confidence && (
                        <>
                          <span>•</span>
                          <span>Confidence: {Math.round(message.confidence * 100)}%</span>
                        </>
                      )}
                    </div>
                    {message.type === "bot" && message.sources && (
                      <div className="mt-2 text-xs">
                        <span className="text-muted-foreground">Sources: </span>
                        {message.sources.map((source, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs mr-1">
                            {source}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={`flex-shrink-0 ${message.type === "user" ? "order-1" : ""}`}>
                    {message.type === "user" ? (
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationMonitor;