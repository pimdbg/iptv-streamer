import { useChannels } from "../hooks/useChannels";
import { Card } from "../components/Card";
import { cx } from "../utils/cctx";
import type { Channel } from "../../../shared/types";
import { useState } from "react";
import { VideoPlayer } from "../components/VideoPlayer";

interface ChannelListProps {
    channels: Channel[];
    className?: string;
    onChannelSelect?: (channel: Channel) => void;
    onChannelFocus: (channel: Channel) => void;
}

function ChannelList({
    channels,
    className,
    onChannelSelect,
    onChannelFocus,
    ...props
}: ChannelListProps & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <nav
            className={cx("overflow-y-scroll no-scrollbar max-h-screen h-full px-10 py-48", className)}
            {...props}
        >
            <ul className="w-[700px] flex flex-col gap-6">
                {channels.map((channel, index) => (
                    <li key={index} >
                        <Card 
                            className="p-6 w-full flex h-64"
                            hoverIndicatorPosition="left"
                            onClick={() => {
                                onChannelSelect?.(channel);
                            }}
                            onMouseEnter={() => {
                                onChannelFocus(channel);
                            }}
                        >
                                <div className="h-full aspect-square bg-[rgb(34,32,44)] flex items-center justify-center p-6 mr-6">
                                    {/* Attempting to not get blacklisted. */}
                                    {/* TODO: Load image on viewport */}
                                    {index === 0 && (
                                        <img 
                                            src={channel.logo} 
                                            alt={channel.name} 
                                            height="100%"
                                            className="object-contain"
                                        />
                                    )}
                                </div>
                            <h3 className="text-white text-2xl font-medium">{channel.name}</h3>
                        </Card>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

const ChannelsListPage = () => {
    const { channels } = useChannels();
    const [focusedChannel, setFocusedChannel] = useState<Channel | null>(null);
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
    
    return (
        <div className="w-screen h-screen max-h-screen">
            <div
                className={
                    cx("max-h-screen z-10 flex")
                }
            >
                <div className="flex h-full">
                    <button
                        onClick={() => window.history.back()}
                        className="w-16 h-16 aspect-square bg-black rounded-full mt-10 ml-10"
                    >&lt;</button>
                    
                    <ChannelList
                        channels={channels}
                        onChannelSelect={(channel) => {
                            setSelectedChannel(channel);

                            if(channel.url === focusedChannel?.url) {
                                // setSelectedChannel(null);
                            }
                            // window.location.hash = `/live-tv?channel=${encodeURIComponent(channel.url)}`;
                        }}
                        onChannelFocus={setFocusedChannel}
                    />
                </div>
                <div className="flex-1 flex">
                    {selectedChannel && (
                        <div 
                            className="w-full h-full bg-center flex items-end p-6 mt-auto relative top-0 self-end"
                        >
                            <VideoPlayer 
                                channel={selectedChannel}
                                className="absolute top-0 left-0 right-0 bottom-0 opacity-80 object-cover"
                            />
                            <div className="z-20 p-8">
                                <h2 className="text-white text-3xl">{selectedChannel.name}</h2>
                                <p className="text-white text-sm font-light mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ex eveniet rem culpa cum ab nesciunt quidem facilis dignissimos. Saepe sunt quam voluptatem a nam eveniet laboriosam voluptate provident quaerat?</p>
                            </div>

                            <div className="absolute top-0 left-0 bottom-0 right-0 bg-linear-to-br from-[rgba(28,26,39,1)] to-transparent h-full z-10" />
                            <div className="absolute top-0 left-0 bottom-0 right-0 bg-linear-to-r from-[rgba(28,26,39,1)] to-transparent h-full z-10" />
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default ChannelsListPage;