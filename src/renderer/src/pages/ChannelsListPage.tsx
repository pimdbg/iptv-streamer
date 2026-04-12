import { useEffect, useMemo, useRef, useState } from "react";
import { cx } from "@/utils";
import { VideoPlayer, ChannelNav, IconButton } from "@/components";
import { goTo } from "@/routing/utils";
import RetroTvIcon from "@/assets/icons/tv-retro.svg";
import StarIcon from "@/assets/icons/star.svg";
import type { Channel } from "@shared/types";
import { useChannels } from "@/hooks";
import { IconSize } from "@/enums/IconSize";
import ChannelsListPageLayout from "@/layouts/ChannelsListPageLayout";

const ChannelsListPage = () => {
    const { 
        channels, 
        selectedChannel, 
        selectedCategory,
        selectCategory,
        selectChannel,
    } = useChannels();
    const [focusedChannel, setFocusedChannel] = useState<Channel | null>(selectedChannel);
    const [query, setQuery] = useState("");
    const channelListRef = useRef<HTMLDivElement>(null);
    
    // Retrieves all channels that match the search query. Returns all channels if the query is empty.
    const filteredChannels = useMemo(() => query
        ? channels.filter(channel => channel.name.toLowerCase().includes(query.toLowerCase())) 
        : channels, [channels, query]);

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
        <ChannelsListPageLayout
            searchQuery={query}
            onSearchQueryChange={setQuery}
        >

            <div
                className={
                    cx("max-h-screen h-screen z-10 flex")
                }
            >   
                <div className="flex-1 flex items-center justify-start h-full">
                    <div className="flex flex-col gap-4 p-10">
                        <IconButton 
                            size={IconSize.LARGE}
                            icon={RetroTvIcon}
                            className={cx(selectedCategory === 'default' && 'bg-purple-secondary')}
                            onClick={() => {
                                selectCategory?.('default');
                            }}
                        />

                        <IconButton 
                            size={IconSize.LARGE}
                            icon={StarIcon}
                            className={cx(selectedCategory === 'favourites' && 'bg-purple-secondary')}
                            onClick={() => {
                                selectCategory?.('favourites');
                            }}
                        />
                    </div>
                </div>


                <div className="flex-1 flex h-full">
                    <ChannelNav
                        channels={filteredChannels}
                        ref={channelListRef}
                        className="w-[50vw]"
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
                                <p className="text-white/50 text-sm font-light mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ex eveniet rem culpa cum ab nesciunt quidem facilis dignissimos. Saepe sunt quam voluptatem a nam eveniet laboriosam voluptate provident quaerat?</p>
                            </div>

                            <div className="absolute top-0 left-0 bottom-0 right-0 bg-linear-to-br from-bg to-transparent h-full z-10" />
                            <div className="absolute top-0 left-0 bottom-0 right-0 bg-linear-to-r from-bg to-transparent h-full z-10" />
                        </div>
                    )}
                </div>
            </div>
        </ChannelsListPageLayout>
    );
}

export default ChannelsListPage;