import { useState } from "react";
import { cx } from "@/utils/cctx";

export interface PageCardProps extends React.HTMLAttributes<HTMLButtonElement> {
    title: string;
    subTitle: string;
}

export function PageCard({
  title,
  subTitle,
  style,    
  className,
  onMouseEnter,
onMouseLeave,
  ...props
}: PageCardProps) {
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
            className={cx("bg-[rgb(42,39,55)] h-full w-64 p-8 pb-12 border border-[rgb(76,71,106,0.75)] hover:scale-105 transition-transform text-left group", className)}
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
            <div className="flex flex-col h-full">
                <div className="mt-auto">
                    <h3 className="text-2xl font-medium text-white mt-auto">
                        {title}
                    </h3>
                    <p className="text-white/50 font-light text-sm mt-1">
                        {subTitle}
                    </p>
                </div>
            </div>
            
            {/* Hover indicator, only visible on hover */}
            <div 
                className="bg-white h-1 w-1/4 translate-y-full absolute bottom-0 left-1/2 -translate-x-1/2 invisible group-hover:visible"
            />
        </button>
  )
}