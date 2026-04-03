import { createContext, useEffect, useMemo, useState } from "react";
import { type Channel } from "@shared/types"
import { ChannelCategories } from "@/enums/ChannelCategories";

type ChannelsContextType = {
    channels: Channel[];
    selectedChannel: Channel | null;
    selectedCategory?: ChannelCategories;
    selectChannel: (channel: Channel) => void;
    selectCategory: (category: ChannelCategories) => void;
    fetchChannels?: () => Promise<void>;
}

export const ChannelsContext = createContext<ChannelsContextType>({ channels: [], selectedChannel: null, selectChannel: () => {}, selectCategory: () => {} });

export function ChannelsProvider({ children }: { children: React.ReactNode  }) {
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<ChannelCategories>(ChannelCategories.DEFAULT);

    // Keeping the key a string and not an enum because it might must become dynamic in case categories are loaded via the main process
    const [channelsMap, setChannelsMap] = useState<Record<string, Channel[]>>({});
    
    const channels = channelsMap[selectedCategory] ?? [];

    const fetchChannels = async () => {
        console.log(window.electronAPI);
        window.electronAPI.getPlaylists()
                            .then((data: Channel[]) => 
                                setChannelsMap(prev => ({ 
                                    ...prev, 
                                    ['default']: data
                                }))
                            )

        window.electronAPI.getFavourites()
                            .then((data: Channel[]) => 
                                setChannelsMap(prev => ({ 
                                    ...prev, 
                                    ['favourites']: data
                                }))
                            )
    }

    // Wrapper function to set selected channel
    const selectChannel = (channel: Channel) => {
        setSelectedChannel(channel);
    }

    const selectCategory = (category: ChannelCategories) => {
        setSelectedCategory(category);
    }

    useEffect(() => {
        if(channels.length > 0) return;

        fetchChannels();
    }, [])

    return (
        <ChannelsContext.Provider value={{ 
            channels, 
            selectedChannel, 
            fetchChannels, 
            selectChannel,
            selectCategory,
        }}>
            {children}
        </ChannelsContext.Provider>
    );

}