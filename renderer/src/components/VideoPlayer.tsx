import Hls from "hls.js";
import type { Channel } from "../../../shared/types";
import { useEffect, useRef } from "react";
import { cx } from "../utils/cctx";

interface VideoPlayerProps extends React.HTMLAttributes<HTMLVideoElement> {
    channel: Channel;
}

export function VideoPlayer({ channel, className, ...props }: VideoPlayerProps) {
    const ref = useRef<HTMLVideoElement>(null);
    
    useEffect(() => {
        if (!ref.current) return;

        const video = ref.current;
        const hls = new Hls();

        hls.loadSource(channel.url);
        hls.attachMedia(video);

        return () => {
            hls.destroy();
        };
    }, [channel.url, ref])

    return (
        <video
            ref={ref}
            autoPlay
            className={cx("w-full h-full object-contain", className)}
            {...props}
        />
    )
}
