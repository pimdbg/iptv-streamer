import React, { useEffect, useState } from "react";
import { type Channel } from "../../../shared/types"

export function useChannels() {
    const [channels, setChannels] = useState<Channel[]>([]);

    useEffect(() => {
        if(channels.length > 0) return;

        window.electronAPI.getPlaylists().then((data: Channel[]) => {
            setChannels(data);
            console.log("Fetched playlists:", data);
        }).catch(error => {
            console.error("Failed to fetch playlists:", error);
        })
    }, [])

    return { channels };
}