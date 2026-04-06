import React, { useRef, useState } from "react";
import { cx } from "@/utils";
import { useIntersectionObserver } from "@/hooks";

export function LazyImage({ src, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
    const ref = useRef<HTMLImageElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useIntersectionObserver(ref, (entry) => {
        if (entry.isIntersecting) {
            setIsLoaded(true);
        }
    }, { threshold: 0.1 });
    
    return (
        <img 
            src={isLoaded ? src : undefined}
            className={cx("object-contain", className)}
            ref={ref}
            {...props}
        />
    )
}