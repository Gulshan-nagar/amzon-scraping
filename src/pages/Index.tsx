import { useState } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { ProductCard } from "@/components/ProductCard";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { StatsBar } from "@/components/StatsBar";
import { Product } from "@/types/product";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastScrape, setLastScrape] = useState<Date | undefined>();
  const { toast } = useToast();

  const handleSearch = async (query: string, type: "url" | "keyword" | "asin") => {
    setIsLoading(true);
    
    try {
      const keyword = type === "asin" ? query : query.replace(/\s+/g, "+");
      
      const { data, error } = await supabase.functions.invoke('scrape-amazon', {
        body: { keyword },
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (!data.success) {
        throw new Error(data.error || "Failed to scrape products");
      }
      
      // Map the response data to match Product type
      const mappedProducts = (data.data || []).map((p: any, index: number) => ({
        _id: `product-${index}`,
        title: p.title,
        price: p.price,
        rating: p.rating,
        image: p.image,
        link: p.link,
      }));
      
      setProducts(mappedProducts);
      setLastScrape(new Date());
      
      toast({
        title: "Scraping Complete",
        description: `Found ${data.count || 0} products`,
      });
    } catch (error) {
      console.error("Scraping error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to scrape products",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Extract Amazon Product Data
            <span className="text-gradient"> Automatically</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Scrape product information, prices, ratings, and reviews from Amazon. 
            Just paste a URL, enter an ASIN, or search by keyword.
          </p>
          
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Stats */}
        {products.length > 0 && (
          <StatsBar productCount={products.length} lastScrape={lastScrape} />
        )}

        {/* Results */}
        <div className="space-y-4">
          {isLoading ? (
            <>
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>Amazon Product Scraper</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
