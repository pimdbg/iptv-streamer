import type { Channel } from "@shared/types";
import { Card } from "../Card";
import { LazyImage } from "../LazyImage";
import { cx } from "@/utils";
import { Icon } from "../Icon";
import StarIcon from "@/assets/icons/star-fill-yellow.svg";

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
            <div className="flex flex-col flex-1 py-2">
                <h3 className="text-white font-medium text-left">{channel.name}</h3>
                
                <Icon 
                    icon={StarIcon}
                    className="mt-auto ml-auto"
                />
            </div>
        </Card>
    )
}
