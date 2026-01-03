import { Package, Clock, TrendingUp } from "lucide-react";

interface StatsBarProps {
  productCount: number;
  lastScrape?: Date;
}

export const StatsBar = ({ productCount, lastScrape }: StatsBarProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Package className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{productCount}</p>
          <p className="text-sm text-muted-foreground">Products Scraped</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-green-500" />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">100%</p>
          <p className="text-sm text-muted-foreground">Success Rate</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
          <Clock className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">
            {lastScrape ? lastScrape.toLocaleTimeString() : '--:--'}
          </p>
          <p className="text-sm text-muted-foreground">Last Scrape</p>
        </div>
      </div>
    </div>
  );
};
