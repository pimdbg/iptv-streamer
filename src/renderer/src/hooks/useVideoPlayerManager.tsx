import Hls from "hls.js";
import React, { useEffect } from "react";

export function useVideoPlayerManager(
    ref: React.RefObject<HTMLVideoElement | null>, 
    sourceUrl: string,
) {
    useEffect(() => {
        if (!ref.current) return;

        const video = ref.current;
        const hls = new Hls();

        hls.loadSource(sourceUrl);
        hls.attachMedia(video);

        return () => {
            hls.destroy();
        };
    }, [sourceUrl, ref])
}