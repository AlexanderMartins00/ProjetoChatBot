import { useState } from "react";
import { 
  Key, 
  MessageSquare, 
  Database, 
  Shield, 
  Save,
  TestTube,
  ExternalLink,
  Copy,
  Eye,
  EyeOff
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [showWhatsAppToken, setShowWhatsAppToken] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your configuration has been updated successfully.",
    });
  };

  const handleTest = (service: string) => {
    toast({
      title: `Testing ${service}...`,
      description: "Connection test initiated. Please wait...",
    });
  };

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in">
      {/* OpenAI Configuration */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            OpenAI Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="openai-key">API Key</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="openai-key"
                  type={showApiKey ? "text" : "password"}
                  placeholder="sk-..."
                  defaultValue="sk-proj-xxxxxxxxxxxxxxxxxxxx"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleTest("OpenAI API")}>
                <TestTube className="h-4 w-4 mr-2" />
                Test
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-success">Connected</Badge>
              <span className="text-xs text-muted-foreground">Last tested: 2 minutes ago</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              defaultValue="gpt-4o"
              placeholder="gpt-4o, gpt-3.5-turbo, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="temperature">Temperature</Label>
            <Input
              id="temperature"
              type="number"
              step="0.1"
              min="0"
              max="2"
              defaultValue="0.7"
            />
            <p className="text-xs text-muted-foreground">
              Controls randomness: 0 = focused, 2 = creative
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-tokens">Max Tokens</Label>
            <Input
              id="max-tokens"
              type="number"
              defaultValue="1000"
            />
            <p className="text-xs text-muted-foreground">
              Maximum length of the AI response
            </p>
          </div>
        </CardContent>
      </Card>

      {/* WhatsApp Configuration */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-success" />
            WhatsApp Business API
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="whatsapp-token">Access Token</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="whatsapp-token"
                  type={showWhatsAppToken ? "text" : "password"}
                  placeholder="EAAxxxxxxxxxxxxxxx"
                  defaultValue="EAAxxxxxxxxxxxxxxx"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                  onClick={() => setShowWhatsAppToken(!showWhatsAppToken)}
                >
                  {showWhatsAppToken ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleTest("WhatsApp API")}>
                <TestTube className="h-4 w-4 mr-2" />
                Test
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-success">Active</Badge>
              <span className="text-xs text-muted-foreground">Webhook verified</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone-number">Phone Number ID</Label>
            <Input
              id="phone-number"
              defaultValue="123456789012345"
              placeholder="Your WhatsApp Business phone number ID"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <div className="flex gap-2">
              <Input
                id="webhook-url"
                defaultValue="https://your-app.com/api/webhook"
                placeholder="https://your-app.com/api/webhook"
              />
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vector Database Configuration */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-accent" />
            Vector Database
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vector-db">Database Type</Label>
            <Input
              id="vector-db"
              defaultValue="Pinecone"
              placeholder="Pinecone, ChromaDB, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="embedding-model">Embedding Model</Label>
            <Input
              id="embedding-model"
              defaultValue="text-embedding-ada-002"
              placeholder="OpenAI embedding model"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chunk-size">Chunk Size</Label>
            <Input
              id="chunk-size"
              type="number"
              defaultValue="1000"
              placeholder="Text chunk size for processing"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chunk-overlap">Chunk Overlap</Label>
            <Input
              id="chunk-overlap"
              type="number"
              defaultValue="200"
              placeholder="Overlap between chunks"
            />
          </div>
        </CardContent>
      </Card>

      {/* RAG Configuration */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-warning" />
            RAG Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="system-prompt">System Prompt</Label>
            <Textarea
              id="system-prompt"
              rows={4}
              defaultValue="You are a helpful customer service assistant. Use the provided context to answer questions accurately and professionally. If you don't find relevant information in the context, politely say so and offer to help with other questions."
              placeholder="Enter the system prompt for the AI assistant..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="similarity-threshold">Similarity Threshold</Label>
            <Input
              id="similarity-threshold"
              type="number"
              step="0.01"
              min="0"
              max="1"
              defaultValue="0.7"
            />
            <p className="text-xs text-muted-foreground">
              Minimum similarity score for retrieved documents (0-1)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-results">Max Retrieved Results</Label>
            <Input
              id="max-results"
              type="number"
              min="1"
              max="20"
              defaultValue="5"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Enable Fallback Response</Label>
              <p className="text-sm text-muted-foreground">
                Show a fallback message when no relevant context is found
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fallback-message">Fallback Message</Label>
            <Textarea
              id="fallback-message"
              rows={2}
              defaultValue="I don't have specific information about that in my knowledge base. Could you please rephrase your question or ask about something else I can help you with?"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="gradient-primary shadow-primary">
          <Save className="h-4 w-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default Settings;