import { useState } from "react";
import { cx } from "../utils/cctx";

export interface CardProps extends React.HTMLAttributes<HTMLButtonElement> {
    hoverIndicatorPosition?: "bottom" | "left" | null
}

export function Card({
  style,    
  className,
  children,
  hoverIndicatorPosition = "bottom",
  onMouseEnter,
  onMouseLeave,
  ...props
}: CardProps) {
    // This UI state is necessary for the border animation, this cannot be done with just tailwindcss logic
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsHovered(true);
        
        if (onMouseEnter) {
            onMouseEnter(event);
        }
    }

    const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsHovered(false);

        if (onMouseLeave) {
            onMouseLeave(event);
        }
    }

    return (
        <button 
            className={cx("bg-[rgb(42,39,55)] p-6 border border-[rgb(76,71,106,0.75)] hover:scale-105 transition-transform group", className)}
            style={{
                borderImage: isHovered 
                    ? "linear-gradient(to top right, rgba(255,255,255,0.3), rgba(255,255,255,0.1), rgba(255,255,255,0.6)) 1" 
                    : "none",
                ...style
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {children}
            
            {/* Hover indicator, only visible on hover */}
            {hoverIndicatorPosition && (
                <div 
                    className={cx(
                        "bg-white translate-y-full invisible group-hover:visible",
                        hoverIndicatorPosition === "bottom" && "absolute left-1/2 bottom-0 -translate-x-1/2 h-1 w-1/4 ",
                        hoverIndicatorPosition === "left" && "absolute -left-1 top-1/2 -translate-y-1/2 h-1/4 w-1",
                    )}
                />
            )}

        </button>
  )
}