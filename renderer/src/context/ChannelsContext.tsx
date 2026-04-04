import { createContext, useEffect, useState } from "react";
import { type Channel, type ParsedChannel } from "@shared/types"

type ChannelsContextType = {
    channels: Channel[];
    selectedChannel: Channel | null;
    selectedCategory?: string;
    selectChannel: (channel: Channel) => void;
    selectCategory: (category: string) => void;
    fetchChannels?: () => Promise<void>;
}

export const ChannelsContext = createContext<ChannelsContextType>({ channels: [], selectedChannel: null, selectChannel: () => {}, selectCategory: () => {} });

export function ChannelsProvider({ children }: { children: React.ReactNode  }) {
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('default');

    // Keeping the key a string and not an enum because it might must become dynamic in case categories are loaded via the main process
    const [channelsMap, setChannelsMap] = useState<Record<string, Channel[]>>({});
    
    const channels = channelsMap[selectedCategory] ?? [];

    const fetchChannels = async () => {
        const favouriteChannelResponse = await window.electronAPI.getFavourites();
        const favouriteChannelData = favouriteChannelResponse.map<Channel>((channel: ParsedChannel) => ({ 
            ...channel, 
            isFavourite: true 
        }));
        
        const playlistResponse = await window.electronAPI.getPlaylists();
        const playlistData = playlistResponse.map<Channel>((channel: ParsedChannel) => ({ 
            ...channel, 
            isFavourite: favouriteChannelData.some((fav: Channel) => fav.url === channel.url)
        }));

        setChannelsMap(prev => ({ 
            ...prev, 
            ['default']: playlistData,
            ['favourites']: favouriteChannelData,
        }))
    }

    // Wrapper function to set selected channel
    const selectChannel = (channel: Channel) => {
        setSelectedChannel(channel);
    }

    const selectCategory = (category: string) => {
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
            selectedCategory,
            fetchChannels, 
            selectChannel,
            selectCategory,
        }}>
            {children}
        </ChannelsContext.Provider>
    );

}