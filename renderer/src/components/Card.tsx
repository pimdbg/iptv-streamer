import { cx } from "@/utils/cctx";

export interface CardProps extends React.HTMLAttributes<HTMLButtonElement> {
    highlightIndicatorPosition?: "bottom" | "left" | null,
    isHighlighted?: boolean;
}

export function Card({
  style,    
  className,
  children,
  highlightIndicatorPosition = "bottom",
  isHighlighted = false,
  ...props
}: CardProps) {
    return (
        <button 
            className={
                cx(
                    "bg-purple-primary p-6 border border-white/10 transition-transform group", 
                    isHighlighted && "scale-105 glassmorphism bg-[rgba(64,60,76,0.8)]",
                    className
                )
            }
            style={{
                // This UI inline styling is necessary for the border animation, this cannot be done with just tailwindcss logic
                borderImage: isHighlighted 
                    ? "linear-gradient(to top right, rgba(255,255,255,0.3), rgba(255,255,255,0.1), rgba(255,255,255,0.6)) 1" 
                    : "none",
                ...style
            }}
            {...props}
        >
            {children}
            
            {/* Hover indicator, only visible on hover */}
            {(highlightIndicatorPosition && isHighlighted) && (
                <div 
                    className={cx(
                        "bg-white translate-y-full",
                        highlightIndicatorPosition === "bottom" && "absolute left-1/2 bottom-0 -translate-x-1/2 h-1 w-1/4 z-0",
                        highlightIndicatorPosition === "left" && "absolute -left-1 top-1/2 -translate-y-1/2 h-1/4 w-1",
                    )}
                />
            )}
        </button>
  )
}