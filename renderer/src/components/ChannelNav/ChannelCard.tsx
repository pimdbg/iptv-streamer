import type { Channel } from "@shared/types";
import { Card } from "../Card";
import { LazyImage } from "../LazyImage";
import { cx } from "@/utils/cctx";

interface ChannelCardProps extends React.ComponentProps<typeof Card> {
    channel: Channel;
}

export default function ChannelCard({ channel, className, ...props }: ChannelCardProps) {
    return (
        <Card             
            className={cx("p-6 w-full flex h-64", className)}
            highlightIndicatorPosition="left"
            {...props}
        >
            <div className="h-full aspect-square bg-[rgb(34,32,44)] flex items-center justify-center p-6 mr-6">
                <LazyImage 
                    src={channel.logo} 
                    alt={channel.name} 
                    height="100%"
                    className="object-contain"
                />
            </div>
            <h3 className="text-white text-2xl font-medium text-left">{channel.name}</h3>
        </Card>
    )
}
