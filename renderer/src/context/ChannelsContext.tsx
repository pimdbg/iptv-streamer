import { createContext, useEffect, useState } from "react";
import { type Channel, type ParsedChannel } from "@shared/types"

type ChannelsContextType = {
    channels: Channel[];
    selectedChannel: Channel | null;
    selectedCategory?: string;
    selectChannel: (channel: Channel) => void;
    selectCategory: (category: string) => void;
    fetchChannels: () => Promise<void>;
    fetchFavouriteChannels: () => Promise<void>;
}

export const ChannelsContext = createContext<ChannelsContextType>({ 
    channels: [], 
    selectedChannel: null, 
    selectedCategory: 'default',
    selectChannel: () => {}, 
    selectCategory: () => {},
    fetchChannels: async () => {},
    fetchFavouriteChannels: async () => {},
});

export function ChannelsProvider({ children }: { children: React.ReactNode  }) {
    const [selectedChannelUrl, setSelectedChannelUrl] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('default');
    const [favouriteChannels, setFavouriteChannels] = useState<Channel[]>([]);

    // Keeping the key a string and not an enum because it might must become dynamic in case categories are loaded via the main process
    const [channelsMap, setChannelsMap] = useState<Record<string, Channel[]>>({
        'default': [],
        'favourites': [],
    });

    
    const channels = channelsMap[selectedCategory] ?? [];
    const selectedChannel = channels.find(channel => channel.url === selectedChannelUrl) || null;

    const fetchFavouriteChannels = async () => {
        const favouriteChannelResponse = await window.electronAPI.getFavourites();
        const favouriteChannelData = favouriteChannelResponse.map<any>((channel: Channel) => ({ 
            ...channel, 
            isFavourite: true,
        }));

        setFavouriteChannels(favouriteChannelData);
    }

    const fetchChannels = async () => {
        const playlistResponse = await window.electronAPI.getPlaylists();
        const playlistData = playlistResponse.map<Channel>((channel: ParsedChannel) => ({ 
            ...channel, 
            isFavourite: channelsMap['favourites']?.some((fav: Channel) => fav.url === channel.url) ?? false
        }));

        setChannelsMap(prev => ({ 
            ...prev, 
            ['default']: playlistData,
        }))
    }
    
    const selectChannel = (channel: Channel) => {
        setSelectedChannelUrl(channel.url);
    }

    // Wrapper function to select category
    const selectCategory = (category: string) => {
        setSelectedCategory(category);
    }

    useEffect(() => {
        fetchFavouriteChannels();
        fetchChannels();
    }, [])

    useEffect(() => {
        if(channelsMap['default'] == null) return;
        
        const updatedDefaultChannels = channelsMap['default'].map(channel => ({
            ...channel,
            isFavourite: favouriteChannels.some((fav: Channel) => fav.url === channel.url)
        }));

        setChannelsMap(prev => ({
            ...prev,
            ['default']: updatedDefaultChannels,
            ['favourites']: favouriteChannels,
        }))
    }, [favouriteChannels])

    return (
        <ChannelsContext.Provider value={{ 
            channels, 
            selectedChannel, 
            selectedCategory,
            fetchChannels, 
            fetchFavouriteChannels,
            selectChannel,
            selectCategory,
        }}>
            {children}
        </ChannelsContext.Provider>
    );

}