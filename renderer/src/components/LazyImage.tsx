import React, { useEffect, useRef, useState } from "react";
import { cx } from "@/utils/cctx";

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

function useIntersectionObserver<T extends HTMLElement | null = HTMLElement>(
    ref: React.RefObject<T>,
    callback: (entry: IntersectionObserverEntry) => void,
    options?: IntersectionObserverInit
) {
    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                callback(entry);
            });
        }, options);

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        }
    }, [ref, callback, options]);
}