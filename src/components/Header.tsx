import { Package, Zap } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Amazon<span className="text-gradient">Scraper</span>
              </h1>
              <p className="text-xs text-muted-foreground">Product Data Extractor</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-secondary/50 px-3 py-2 rounded-lg">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Automated Scraping
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
