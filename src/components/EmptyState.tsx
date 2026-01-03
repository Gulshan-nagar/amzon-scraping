import { Search, ArrowRight } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mb-6">
        <Search className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Start Scraping Products
      </h3>
      <p className="text-muted-foreground max-w-md mb-6">
        Enter an Amazon product URL, search keyword, or ASIN to extract product data automatically.
      </p>
      <div className="flex flex-col gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-primary" />
          <span>Paste a product URL from Amazon</span>
        </div>
        <div className="flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-primary" />
          <span>Search by product keyword</span>
        </div>
        <div className="flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-primary" />
          <span>Enter an ASIN for direct lookup</span>
        </div>
      </div>
    </div>
  );
};
