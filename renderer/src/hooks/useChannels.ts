import { useContext } from "react";
import { ChannelsContext } from "@/context/ChannelsContext";

export function useChannels() {
    const ctx = useContext(ChannelsContext);

    if (!ctx) {
        throw new Error("useChannels must be used within a ChannelsProvider");
    }

    return ctx;
}