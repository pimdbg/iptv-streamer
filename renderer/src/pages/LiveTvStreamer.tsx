import ChevronLeftIcon from "@/assets/icons/angle-small-left.svg";
import { useChannels } from "@/hooks/useChannels";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useState } from "react";
import { goTo } from "@/routing/utils";
import { IconButton } from "@/components";
import { useDetectMouseMovement } from "@/hooks";

const LiveTvStreamer = () => {
    const { selectedChannel } = useChannels();
    const [displayControls, setDisplayControls] = useState(false);

    useDetectMouseMovement({
        onMouseMove: () => setDisplayControls(true),
        onMouseFade: () => setDisplayControls(false),
        timeoutMs: 3000,
    })

    if(!selectedChannel) {
        goTo("#/channels-list");
        return;
    }

    return (
        <div className="w-screen h-screen max-h-screen flex items-center justify-center bg-black">
            {displayControls && (
                <div className="
                    flex items-start flex-col
                    absolute top-0 left-0 right-0 bottom-0 z-10 p-10 pb-24 
                    bg-linear-to-t from-purple-primary/80 to-transparent to-30%
                ">
                    <div className="mb-auto mt-10">
                        <div className="flex">
                            <IconButton
                                onClick={() => goTo("#/channels-list")}
                                className="aspect-square bg-black"
                                icon={ChevronLeftIcon}
                            />
                            <img 
                                src={selectedChannel.logo}
                                alt={selectedChannel.name}
                                height={160}
                                width="auto"
                                className="object-contain ml-4 opacity-40"
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-white font-medium">{selectedChannel.name}</h2>
                    </div>
                </div>
            )}
            
            <VideoPlayer 
                channel={selectedChannel}
                className="w-screen h-screen"
            />
        </div>
    )
}

export default LiveTvStreamer;