import { Star, ExternalLink } from "lucide-react";
import { Product } from "@/types/product";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  // Parse rating like "4.2 out of 5 stars"
  const parseRating = (rating?: string): number => {
    if (!rating) return 0;
    const match = rating.match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const numericRating = parseRating(product.rating);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-primary/50 text-primary" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 text-muted-foreground/30" />
        );
      }
    }
    return stars;
  };

  return (
    <Card className="group gradient-card border-border overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-elevated animate-fade-in">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative w-full md:w-48 h-48 md:h-auto bg-secondary/50 flex-shrink-0">
          {product.image && (
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col">
          <h3 className="text-foreground font-semibold text-lg line-clamp-2 mb-3 group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">{renderStars(numericRating)}</div>
              <span className="text-foreground font-medium">{numericRating.toFixed(1)}</span>
              <span className="text-muted-foreground text-sm">
                {product.rating}
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-bold text-primary">₹{product.price}</span>
          </div>

          {/* Actions */}
          <div className="mt-auto flex gap-3">
            {product.link && (
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => window.open(product.link, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
                View on Amazon
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
