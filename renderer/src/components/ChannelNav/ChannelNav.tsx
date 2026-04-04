    
import React, { forwardRef } from "react";
import type { Channel } from "@shared/types";
import { cx } from "@/utils";
import ChannelCard from "./ChannelCard";

export interface ChannelNavProps {
    channels: Channel[];
    className?: string;
    selectedChannel: Channel | null;
    focusedChannel: Channel | null;
    onChannelSelect?: (channel: Channel) => void;
    onChannelFocus: (channel: Channel) => void;
}

export const ChannelNav = forwardRef<HTMLDivElement, ChannelNavProps>(({
    channels,
    className,
    selectedChannel = null,
    focusedChannel = null,
    onChannelSelect,
    onChannelFocus,
    ...props
}: ChannelNavProps & React.HTMLAttributes<HTMLDivElement>, ref) => {
    return (
        <nav
            className={cx("overflow-y-scroll no-scrollbar max-h-screen h-full px-10 py-48", className)}
            ref={ref}
            {...props}
        >
            {channels.length > 0 ? (
                <ul className="w-full flex flex-col gap-6">
                    {channels.map((channel, index) => (
                        <li key={index} id={`channel-${index}`}>
                            <ChannelCard 
                                channel={channel}
                                isHighlighted={focusedChannel?.url === channel.url}
                                onClick={() => {
                                    onChannelSelect?.(channel);
                                }}
                                onFocus={() => {
                                    onChannelFocus(channel);
                                }}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-white/70 text-center">No channels found</p>
            )}
        </nav>
    )
})
