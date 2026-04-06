import { twMerge } from "tailwind-merge";

export const cx = (...classNames: (string | undefined | false | null)[]): string => {
    return twMerge(...classNames);
}

export const formatTime = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
    return date.toLocaleTimeString('en-UK', {
        hour: "2-digit",
        minute: "2-digit",
        ...options,
    });
}

export const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
    return date.toLocaleDateString('en-UK', {
        weekday: "long",
        month: "long",
        day: "numeric",
        ...options,
    });
}