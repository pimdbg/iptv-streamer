import { useState } from "react";
import { cx } from "@/utils";
import { Card } from "./Card";

export interface PageCardProps extends React.HTMLAttributes<HTMLButtonElement> {
    title: string;
    subTitle: string;
    icon?: React.ReactNode;
}

export function PageCard({
  title,
  subTitle,
  icon,
  className,
  onMouseEnter,
onMouseLeave,
  ...props
}: PageCardProps) {
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
        <Card 
            className={cx("w-64 p-8 pb-12 text-left group", className)}
            isHighlighted={isHovered}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <div className="flex flex-col h-full">
                <div className="mt-auto">
                    {icon && (
                        <div className="mb-4">
                            {icon}
                        </div>
                    )}
                    <h3 className="text-white mt-auto">
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
        </Card>
  )
}