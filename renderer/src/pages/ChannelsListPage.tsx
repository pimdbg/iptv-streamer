import { useEffect, useRef, useState } from "react";
import { cx } from "@/utils/cctx";
import { useChannels } from "@/hooks/useChannels";
import { VideoPlayer, ChannelNav, IconButton } from "@/components";
import { goTo } from "@/routing/utils";
import ChevronLeftIcon from "@/assets/icons/angle-small-left.svg";
import type { Channel } from "@shared/types";

const ChannelsListPage = () => {
    const { channels, selectedChannel, selectChannel } = useChannels();
    const [focusedChannel, setFocusedChannel] = useState<Channel | null>(null);
    const channelListRef = useRef<HTMLDivElement>(null);

    const scrollToChannel = (channel: Channel, options?: ScrollIntoViewOptions) => {
        const element = channelListRef?.current?.querySelector(`#channel-${channels.findIndex(c => c.url === channel.url)}`)

        element?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            ...options
        });
    }

    // Go to selected channel on mount
    useEffect(() => {
        if(selectedChannel && channelListRef.current) {
            scrollToChannel(selectedChannel, { behavior: "auto" });
        }
    }, [channelListRef])

    // Scroll to selected channel on change
    useEffect(() => {
        if (selectedChannel && channelListRef.current) {
            scrollToChannel(selectedChannel);
        }
    }, [selectedChannel, channelListRef, channels])
    
    return (
        <div className="w-screen h-screen max-h-screen">
            <div 
                className="
                    absolute top-0 left-0 right-0 bottom-0 pointer-events-none 
                    bg-[linear-gradient(to_bottom,_var(--color-bg),_4%,_transparent,transparent,96%,var(--color-bg))]
                " 
            />
            <div
                className={
                    cx("max-h-screen z-10 flex")
                }
            >
                <div className="flex h-full">
                    <IconButton
                        icon={ChevronLeftIcon} 
                        className="ml-10 mt-10"
                        onClick={() => goTo("#/")}
                    />
                    
                    <ChannelNav
                        channels={channels}
                        ref={channelListRef}
                        selectedChannel={selectedChannel}
                        onChannelSelect={(channel) => {
                            if(channel.url === selectedChannel?.url) {
                                goTo("#/live-tv");
                                return;
                            }

                            selectChannel(channel);
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
                                <p className="text-sm">Now playing...</p>
                                <h2 className="text-white text-3xl font-medium mt-1">{selectedChannel.name}</h2>
                                <p className="text-white text-sm font-light mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ex eveniet rem culpa cum ab nesciunt quidem facilis dignissimos. Saepe sunt quam voluptatem a nam eveniet laboriosam voluptate provident quaerat?</p>
                            </div>

                            <div className="absolute top-0 left-0 bottom-0 right-0 bg-linear-to-br from-bg to-transparent h-full z-10" />
                            <div className="absolute top-0 left-0 bottom-0 right-0 bg-linear-to-r from-bg to-transparent h-full z-10" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChannelsListPage;