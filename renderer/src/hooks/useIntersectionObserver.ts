import type React from "react";
import { useEffect } from "react";

export function useIntersectionObserver<T extends HTMLElement | null = HTMLElement>(
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