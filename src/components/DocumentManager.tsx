import { useState } from "react";
import { 
  Upload, 
  FileText, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  Download,
  Plus,
  Database
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DocumentManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const documents = [
    {
      id: 1,
      name: "FAQ - Refund Policy.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      status: "processed",
      chunks: 45,
      embeddings: 45
    },
    {
      id: 2,
      name: "Product Catalog 2024.docx",
      type: "DOCX", 
      size: "8.7 MB",
      uploadDate: "2024-01-14",
      status: "processing",
      chunks: 127,
      embeddings: 89
    },
    {
      id: 3,
      name: "Customer Support Guide.txt",
      type: "TXT",
      size: "1.2 MB", 
      uploadDate: "2024-01-13",
      status: "processed",
      chunks: 32,
      embeddings: 32
    },
    {
      id: 4,
      name: "Company Policies.pdf",
      type: "PDF",
      size: "3.1 MB",
      uploadDate: "2024-01-12",
      status: "failed",
      chunks: 0,
      embeddings: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processed": return "success";
      case "processing": return "warning";
      case "failed": return "destructive";
      default: return "secondary";
    }
  };

  const totalDocuments = documents.length;
  const processedDocuments = documents.filter(doc => doc.status === "processed").length;
  const totalChunks = documents.reduce((sum, doc) => sum + doc.chunks, 0);
  const totalEmbeddings = documents.reduce((sum, doc) => sum + doc.embeddings, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Knowledge Base Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <div>
                <p className="text-2xl font-bold">{totalDocuments}</p>
                <p className="text-xs text-muted-foreground">Total Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-accent" />
              <div>
                <p className="text-2xl font-bold">{totalChunks}</p>
                <p className="text-xs text-muted-foreground">Text Chunks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <div>
                <p className="text-2xl font-bold">{totalEmbeddings}</p>
                <p className="text-xs text-muted-foreground">Embeddings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div>
                <p className="text-2xl font-bold">{Math.round((processedDocuments / totalDocuments) * 100)}%</p>
                <p className="text-xs text-muted-foreground">Processing Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Area */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Drop files here or click to upload</h3>
            <p className="text-muted-foreground mb-4">
              Supports PDF, DOC, DOCX, TXT files up to 10MB each
            </p>
            <Button className="gradient-primary">
              <Plus className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Document List */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent" />
              Knowledge Base Documents
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{doc.name}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.uploadDate}</span>
                      <span>•</span>
                      <span>{doc.chunks} chunks, {doc.embeddings} embeddings</span>
                    </div>
                    {doc.status === "processing" && (
                      <div className="mt-2">
                        <Progress value={(doc.embeddings / doc.chunks) * 100} className="h-1" />
                        <p className="text-xs text-muted-foreground mt-1">
                          Processing embeddings... {doc.embeddings}/{doc.chunks}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge variant={getStatusColor(doc.status) as any}>
                    {doc.status}
                  </Badge>
                  
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentManager;