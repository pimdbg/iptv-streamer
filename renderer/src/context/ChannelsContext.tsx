import { createContext, useEffect, useState } from "react";
import { type Channel } from "../../../shared/types"

type Ok<T> = {
    status: "ok";
    data: T;
}

type Error = {
    status: "error";
    error: string;
}

type FetchResponse<T> = Ok<T> | Error;

type ChannelsContextType = {
    channels: Channel[];
    selectedChannel: Channel | null;
    fetchStatus: FetchResponse<Channel[]> | null;
    selectChannel: (channel: Channel) => void;
    fetchChannels?: () => Promise<void>;
}

export const ChannelsContext = createContext<ChannelsContextType>({ channels: [], selectedChannel: null, fetchStatus: null, selectChannel: () => {} });

export function ChannelsProvider({ children }: { children: React.ReactNode  }) {
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
    const [fetchStatus, setFetchStatus] = useState<FetchResponse<Channel[]> | null>(null);
    const [channels, setChannels] = useState<Channel[]>([]);

    const fetchChannels = async () => {
        window.electronAPI.getPlaylists().then((data: Channel[]) => {
            setChannels(data);
            setFetchStatus({ status: "ok", data });
        }).catch(error => {
            setFetchStatus({ status: "error", error: error.message });
        })
    }

    // Wrapper function to set selected channel
    const selectChannel = (channel: Channel) => {
        setSelectedChannel(channel);
    }

    useEffect(() => {
        if(channels.length > 0) return;

        fetchChannels();
    }, [])

    return (
        <ChannelsContext.Provider value={{ channels, selectedChannel, fetchStatus, fetchChannels, selectChannel }}>
            {children}
        </ChannelsContext.Provider>
    );

}