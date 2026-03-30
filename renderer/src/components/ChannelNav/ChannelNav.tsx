    
import React, { forwardRef, useContext } from "react";
import type { Channel } from "../../../../shared/types";
import { cx } from "../../utils/cctx";
import ChannelCard from "./ChannelCard";

export interface ChannelNavProps {
    channels: Channel[];
    className?: string;
    selectedChannel: Channel | null;
    onChannelSelect?: (channel: Channel) => void;
    onChannelFocus: (channel: Channel) => void;
}

export const ChannelNav = forwardRef<HTMLDivElement, ChannelNavProps>(({
    channels,
    className,
    selectedChannel = null,
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
            <ul className="w-[700px] flex flex-col gap-6">
                <p>edwfr</p>
                {channels.map((channel, index) => (
                    <li key={index} id={`channel-${index}`}>
                        <ChannelCard 
                            channel={channel}
                            isHighlighted={selectedChannel?.url === channel.url}
                            onClick={() => {
                                onChannelSelect?.(channel);
                            }}
                            onMouseEnter={() => {
                                onChannelFocus(channel);
                            }}
                        />
                    </li>
                ))}
            </ul>
        </nav>
    )
})