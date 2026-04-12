import type { Channel } from "@shared/types";
import { useRef } from "react";
import { cx } from "@/utils";
import { useVideoPlayerManager } from "@/hooks";

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