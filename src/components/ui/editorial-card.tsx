import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface EditorialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  portrait?: boolean;
  editorial?: boolean;
  imageUrl?: string;
  alt?: string;
}

const EditorialCard = React.forwardRef<HTMLDivElement, EditorialCardProps>(
  ({ className, portrait = false, editorial = false, imageUrl, alt, children, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "group overflow-hidden transition-all duration-300",
          "hover:shadow-lg hover:-translate-y-1",
          editorial && "bg-surface-secondary border-border-subtle",
          portrait && "aspect-[3/4]",
          className
        )}
        {...props}
      >
        <CardContent className={cn("p-0 h-full", portrait && "relative")}>
          {imageUrl && (
            <div className={cn(
              "overflow-hidden",
              portrait ? "h-2/3" : "h-48"
            )}>
              <img
                src={imageUrl}
                alt={alt || ""}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-300",
                  "group-hover:scale-105"
                )}
              />
            </div>
          )}
          
          <div className={cn(
            "p-6",
            portrait && imageUrl && "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white",
            editorial && "space-y-4"
          )}>
            {children}
          </div>
        </CardContent>
      </Card>
    );
  }
);
EditorialCard.displayName = "EditorialCard";

export { EditorialCard };