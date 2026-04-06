import Hls from "hls.js";
import type { Channel } from "@shared/types";
import { useEffect, useRef } from "react";
import { cx } from "@/utils";

interface VideoPlayerProps extends React.HTMLAttributes<HTMLVideoElement> {
    channel: Channel;
}

export function VideoPlayer({ channel, className, ...props }: VideoPlayerProps) {
    const ref = useRef<HTMLVideoElement>(null);
    
    useVideoPlayerManager(ref, channel.url);

    return (
        <video
            ref={ref}
            autoPlay
            className={cx("w-full h-full object-contain", className)}
            {...props}
        />
    )
}

function useVideoPlayerManager(
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