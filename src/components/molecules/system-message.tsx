import * as React from "react";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SystemMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "success" | "warning" | "error" | "info";
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const SystemMessage = React.forwardRef<HTMLDivElement, SystemMessageProps>(
  ({ type, title, children, dismissible = false, onDismiss, className, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };

    if (!isVisible) return null;

    const typeConfig = {
      success: {
        icon: CheckCircle,
        bgColor: "bg-[hsl(var(--success-bg))]",
        textColor: "text-[hsl(var(--success-text))]",
        borderColor: "border-success",
      },
      warning: {
        icon: AlertTriangle,
        bgColor: "bg-[hsl(var(--warning-bg))]",
        textColor: "text-[hsl(var(--warning-text))]", 
        borderColor: "border-warning",
      },
      error: {
        icon: XCircle,
        bgColor: "bg-error",
        textColor: "text-error-foreground",
        borderColor: "border-error",
      },
      info: {
        icon: Info,
        bgColor: "bg-info",
        textColor: "text-info-foreground",
        borderColor: "border-info",
      },
    };

    const config = typeConfig[type];
    const Icon = config.icon;

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start gap-3 p-4 rounded-lg border",
          config.bgColor,
          config.textColor,
          config.borderColor,
          className
        )}
        role="alert"
        aria-live="polite"
        {...props}
      >
        <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
        
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className="font-semibold text-sm mb-1">
              {title}
            </h3>
          )}
          <div className="text-sm">
            {children}
          </div>
        </div>

        {dismissible && (
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 ml-2 p-1 rounded-md hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Dismiss message"
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
SystemMessage.displayName = "SystemMessage";

export { SystemMessage };
