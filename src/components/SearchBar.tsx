import { useState } from "react";
import { Search, Link, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string, type: "url" | "keyword" | "asin") => void;
  isLoading: boolean;
}

export const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<"url" | "keyword" | "asin">("url");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), searchType);
    }
  };

  const detectSearchType = (value: string) => {
    if (value.includes("amazon.") || value.startsWith("http")) {
      setSearchType("url");
    } else if (/^[A-Z0-9]{10}$/.test(value.toUpperCase())) {
      setSearchType("asin");
    } else {
      setSearchType("keyword");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSearchType("url")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              searchType === "url"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <Link className="w-4 h-4 inline mr-2" />
            Product URL
          </button>
          <button
            type="button"
            onClick={() => setSearchType("keyword")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              searchType === "keyword"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <Search className="w-4 h-4 inline mr-2" />
            Keyword
          </button>
          <button
            type="button"
            onClick={() => setSearchType("asin")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              searchType === "asin"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            ASIN
          </button>
        </div>

        <div className="relative flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={
                searchType === "url"
                  ? "Paste Amazon product URL..."
                  : searchType === "asin"
                  ? "Enter ASIN (e.g., B09V3KXJPB)"
                  : "Search products by keyword..."
              }
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                detectSearchType(e.target.value);
              }}
              className="pl-12 h-14 text-base bg-card border-border"
            />
          </div>
          <Button
            type="submit"
            variant="gradient"
            size="xl"
            disabled={isLoading || !query.trim()}
            className="min-w-[140px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Scraping...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Scrape
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};
