import { useEffect } from "react";

export const useDetectMouseMovement = ({
    onMouseMove,
    onMouseFade,
    timeoutMs = 3000,
}: {
    onMouseMove: () => void;
    onMouseFade: () => void;
    timeoutMs?: number;
}) => {
    useEffect(() => {
        let timeout = setTimeout(() => {
            onMouseFade();
        }, timeoutMs);

        const handleMouseMove = () => {
            onMouseMove();
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                onMouseFade();
            }, timeoutMs);
        }

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearTimeout(timeout);
        }
    }, []);
}