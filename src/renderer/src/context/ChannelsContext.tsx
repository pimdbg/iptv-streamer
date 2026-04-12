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

const arrayToMap = (array: Channel[]): Record<string, Channel> => {
    return array.reduce((acc: Record<string, Channel>, channel: Channel) => {
        acc[channel.url] = channel;
        return acc;
    }, {});
}

/**
 * Provides channel-related state and actions to its children via React Context.
 * 
 * This provider manages:
 * - The currently selected channel and category.
 * - The list of favourite channels.
 * - A map of channels organized by category for efficient access.
 * - Fetching and updating of channels and favourites from the Electron API.
 * - Synchronization of favourite status between the default and favourites categories.
 * 
 * @param children - The React children nodes to be rendered within the provider.
 * 
 * @remarks
 * - Uses Electron's IPC API to fetch playlists and favourites.
 * - Keeps the favourite status in sync across categories.
 * - Exposes context values and actions for channel selection, category selection, and refreshing data.
 */
export function ChannelsProvider({ children }: { children: React.ReactNode  }) {
    const [selectedChannelUrl, setSelectedChannelUrl] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('default');
    const [favouriteChannels, setFavouriteChannels] = useState<Channel[]>([]);

    // Stores channels in a map for O(1) access, with categories as the first level keys and channel URLs as the second level keys.
    const [channelsMap, setChannelsMap] = useState<Record<string, Record<string, Channel>>>({
        'default': {},
        'favourites': {},
    });
    
    const channels = channelsMap[selectedCategory] ?? {};
    const selectedChannel = channels[selectedChannelUrl ?? ''] ?? null;

    const fetchFavouriteChannels = async () => {
        const favouriteChannelResponse = await window.electronAPI.getFavourites();
        const favouriteChannelData = favouriteChannelResponse.map<Channel>((channel: ParsedChannel) => ({ 
            ...channel, 
            isFavourite: true,
        }));

        setFavouriteChannels(favouriteChannelData);
    }

    const fetchChannels = async () => {
        const playlistResponse = await window.electronAPI.getPlaylists();
        const playlistData = arrayToMap(
            playlistResponse.map(
                channel => ({
                    ...channel,
                    isFavourite: channelsMap['favourites']?.[channel.url]?.isFavourite ?? false
                })
            )
        );

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

    // Initial fetch of channels and favourite channels when the component mounts
    useEffect(() => {
        fetchChannels();
        fetchFavouriteChannels();
    }, [])

    // Catches updated favourite channels, and updates the channelsMap to reflect the new favourite status of channels in the default category, as well as updating the favourites category with the new list of favourite channels.
    useEffect(() => {
        if(channelsMap['default'] == null) return;

        const updatedDefaultChannels = { ...channelsMap['default'] };
        const updatedFavouriteChannels = arrayToMap(favouriteChannels);
        
        favouriteChannels.forEach((fav: Channel) => {
            if(updatedDefaultChannels[fav.url]) {
                updatedDefaultChannels[fav.url].isFavourite = true;
            }
        });

        setChannelsMap(prev => ({
            ...prev,
            ['default']: updatedDefaultChannels,
            ['favourites']: updatedFavouriteChannels,
        }))
    }, [favouriteChannels])

    return (
        <ChannelsContext.Provider value={{ 
            channels: Object.values(channels), 
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
