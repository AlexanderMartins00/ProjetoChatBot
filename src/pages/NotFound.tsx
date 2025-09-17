import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="gradient-primary p-4 rounded-2xl inline-block mb-6 shadow-primary">
          <AlertTriangle className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Página não encontrada</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link to="/">
          <Button className="gradient-primary text-white hover:opacity-90 shadow-primary">
            <Home className="mr-2 h-4 w-4" />
            Voltar ao Início
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
