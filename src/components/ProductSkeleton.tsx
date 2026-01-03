import { Card } from "@/components/ui/card";

export const ProductSkeleton = () => {
  return (
    <Card className="gradient-card border-border overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Image skeleton */}
        <div className="w-full md:w-48 h-48 bg-secondary animate-shimmer" />

        {/* Content skeleton */}
        <div className="flex-1 p-5 space-y-4">
          {/* Title */}
          <div className="h-6 bg-secondary rounded animate-shimmer w-3/4" />
          <div className="h-6 bg-secondary rounded animate-shimmer w-1/2" />

          {/* Rating */}
          <div className="flex gap-2">
            <div className="h-4 bg-secondary rounded animate-shimmer w-24" />
            <div className="h-4 bg-secondary rounded animate-shimmer w-16" />
          </div>

          {/* Price */}
          <div className="h-8 bg-secondary rounded animate-shimmer w-28" />

          {/* Stock */}
          <div className="h-4 bg-secondary rounded animate-shimmer w-20" />

          {/* Button */}
          <div className="h-11 bg-secondary rounded animate-shimmer w-40 mt-auto" />
        </div>
      </div>
    </Card>
  );
};
