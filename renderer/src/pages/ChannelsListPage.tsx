import { useEffect, useMemo, useRef, useState } from "react";
import { cx, formatTime } from "@/utils";
import { VideoPlayer, ChannelNav, IconButton } from "@/components";
import { goTo } from "@/routing/utils";
import ChevronLeftIcon from "@/assets/icons/angle-small-left.svg";
import SearchIcon from "@/assets/icons/search.svg";
import RetroTvIcon from "@/assets/icons/tv-retro.svg";
import StarIcon from "@/assets/icons/star.svg";
import type { Channel } from "@shared/types";
import { useChannels, useGetCurrentDate } from "@/hooks";
import { IconSize } from "@/enums/IconSize";
import { ChannelCategories } from "@/enums/ChannelCategories";

const ChannelsListPage = () => {
    const { 
        channels, 
        selectedChannel, 
        selectCategory,
        selectChannel,
        selectedCategory,
    } = useChannels();

    const [query, setQuery] = useState("");
    const [focusedChannel, setFocusedChannel] = useState<Channel | null>(selectedChannel);
    
    const channelListRef = useRef<HTMLDivElement>(null);
    
    // Retrieves all channels that match the search query. Returns all channels if the query is empty.
    const filteredChannels = useMemo(() => {
        if(!query) return channels;

        return channels.filter(channel => channel.name.toLowerCase().includes(query.toLowerCase()))
    }, [channels, query]);

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
            <Header 
                className="absolute top-0 left-0 w-screen z-30" 
                query={query}
                onQueryChange={setQuery}
            />

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
                            onClick={() => {
                                selectCategory?.(ChannelCategories.DEFAULT);
                            }}
                        />
                        <IconButton 
                            size={IconSize.LARGE}
                            icon={StarIcon}
                            onClick={() => {
                                selectCategory?.(ChannelCategories.FAVOURITES);
                            }}
                        />
                    </div>
                </div>

                <div className="flex-1 w-[70%] flex h-full">
                    <ChannelNav
                        channels={filteredChannels}
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
                                <p className="text-white/50 text-sm font-light mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ex eveniet rem culpa cum ab nesciunt quidem facilis dignissimos. Saepe sunt quam voluptatem a nam eveniet laboriosam voluptate provident quaerat?</p>
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

function Header({
    className,
    query: queryProp = '',
    onQueryChange,
    ...props
}: any) {
    const [displaySearch, setDisplaySearch] = useState(false);
    const [query, setQuery] = useState(queryProp);
    const currentDate = useGetCurrentDate();

    useEffect(() => {
        setQuery(queryProp);
    }, [queryProp])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        onQueryChange?.(newQuery);
    }

    const handleSearchBlur = () => {
        setDisplaySearch(false);
        setQuery('');
        onQueryChange?.('');
    }

    return (
        <div className={cx("flex items-center justify-between pt-10 pb-16 px-10 bg-[linear-gradient(to_bottom,var(--color-bg),70%,transparent,transparent)]", className)} {...props}>
            <div className="flex items-center">
                <IconButton
                    icon={ChevronLeftIcon} 
                    onClick={() => goTo("#/")}
                />
                <h2 className="text-white ml-4">Live TV</h2>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-lg">{formatTime(currentDate)}</span>
                {displaySearch ? (
                    <input 
                        type="text" 
                        className="px-4 py-2 w-md rounded-full bg-purple-secondary text-white placeholder:text-white/50" 
                        placeholder="Search..." 
                        value={query}
                        onChange={handleSearchChange}
                        onBlur={handleSearchBlur}
                        autoFocus
                    />
                ) : (
                    <IconButton 
                        size={IconSize.LARGE}
                        icon={SearchIcon}
                        type="button"
                        onClick={() => setDisplaySearch(prev => !prev)}
                    />
                )}
            </div>
        </div>
    );
}