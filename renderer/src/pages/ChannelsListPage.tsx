import { useEffect, useRef, useState } from "react";
import { cx } from "@/utils";
import { VideoPlayer, ChannelNav, IconButton } from "@/components";
import { goTo } from "@/routing/utils";
import ChevronLeftIcon from "@/assets/icons/angle-small-left.svg";
import SearchIcon from "@/assets/icons/search.svg";
import type { Channel } from "@shared/types";
import { useChannels } from "@/hooks";

const ChannelsListPage = () => {
    const { channels, selectedChannel, selectChannel } = useChannels();
    const [focusedChannel, setFocusedChannel] = useState<Channel | null>(selectedChannel);
    const channelListRef = useRef<HTMLDivElement>(null);

    const scrollToChannel = (channel: Channel, options?: ScrollIntoViewOptions) => {
        const element = channelListRef?.current?.querySelector(`#channel-${channels.findIndex(c => c.url === channel.url)}`)

        element?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            ...options
        });
    }

    // Go to selected channel on mount, separate useEffect because of the different scroll behavior (no smooth scrolling on mount)
    useEffect(() => {
        if(focusedChannel && channelListRef.current) {
            scrollToChannel(focusedChannel, { behavior: "auto" });
        }
    }, [channelListRef])

    useEffect(() => {
        if(focusedChannel && channelListRef.current) {
            scrollToChannel(focusedChannel);
        }
    }, [focusedChannel, channelListRef])
    
    return (
        <div className="w-screen h-screen max-h-screen">
            <div 
                className="
                    absolute top-0 left-0 w-screen flex items-center z-30! pt-10 pb-16 px-10
                    bg-[linear-gradient(to_bottom,var(--color-bg),70%,transparent,transparent)]
                " 
            >
                <IconButton
                    icon={ChevronLeftIcon} 
                    onClick={() => goTo("#/")}
                />
                <h2 className="text-white ml-4">Live TV</h2>

                <IconButton 
                    size={28}
                    icon={SearchIcon}
                    className="ml-auto"
                    onClick={() => alert('Unimplemented feature')}
                />
            </div>
            <div
                className={
                    cx("max-h-screen z-10 flex")
                }
            >
                <div className="flex h-full">
                    <ChannelNav
                        channels={channels}
                        ref={channelListRef}
                        selectedChannel={selectedChannel}
                        focusedChannel={focusedChannel}
                        onChannelSelect={(channel) => {
                            if(channel.url === selectedChannel?.url) {
                                goTo("#/live-tv");
                                return;
                            }

                            selectChannel(channel);
                            setFocusedChannel(channel);
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
                                <h2 className="text-white mt-1">{selectedChannel.name}</h2>
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