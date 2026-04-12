import { useEffect, useState } from "react";
import { cx, formatTime } from "@/utils";
import { IconButton } from "@/components";
import { goTo } from "@/routing/utils";
import ChevronLeftIcon from "@/assets/icons/angle-small-left.svg";
import SearchIcon from "@/assets/icons/search.svg";
import { useGetCurrentDate } from "@/hooks";
import { IconSize } from "@/enums/IconSize";

interface ChannelsListLayoutProps {
    onSearchQueryChange?: (query: string) => void;
    searchQuery?: string;
    children: React.ReactNode;
}

const ChannelsListPageLayout = (
    {
        searchQuery = '',
        onSearchQueryChange,
        children,
    }: ChannelsListLayoutProps
) => {
    return (
        <div className="w-screen h-screen max-h-screen">
            <Header 
                className="absolute top-0 left-0 w-screen z-30" 
                query={searchQuery}
                onQueryChange={onSearchQueryChange}
            />
            {children}
        </div>
    );
}

export default ChannelsListPageLayout;

function Header({
    className,
    query: queryProp = '',
    onQueryChange,
    ...props
}: any) {
    const [displaySearch, setDisplaySearch] = useState(false);
    const [query, setQuery] = useState(queryProp);
    const currentDate = useGetCurrentDate();

    useEffect(() => {
        setQuery(queryProp);
    }, [queryProp])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        onQueryChange?.(newQuery);
    }

    const handleSearchBlur = () => {
        setDisplaySearch(false);
        setQuery('');
        onQueryChange?.('');
    }

    return (
        <div className={cx("flex items-center justify-between pt-10 pb-16 px-10 bg-[linear-gradient(to_bottom,var(--color-bg),70%,transparent,transparent)]", className)} {...props}>
            <div className="flex items-center">
                <IconButton
                    icon={ChevronLeftIcon} 
                    onClick={() => goTo("#/")}
                />
                <h2 className="text-white ml-4">Live TV</h2>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-lg">{formatTime(currentDate)}</span>
                {displaySearch ? (
                    <input 
                        type="text" 
                        className="px-4 py-2 w-md rounded-full bg-purple-secondary text-white placeholder:text-white/50" 
                        placeholder="Search..." 
                        value={query}
                        onChange={handleSearchChange}
                        onBlur={handleSearchBlur}
                        autoFocus
                    />
                ) : (
                    <IconButton 
                        size={IconSize.LARGE}
                        icon={SearchIcon}
                        type="button"
                        onClick={() => setDisplaySearch(prev => !prev)}
                    />
                )}
            </div>
        </div>
    );
}