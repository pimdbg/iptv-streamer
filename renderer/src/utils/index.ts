import { twMerge } from "tailwind-merge";

export const cx = (...classNames: (string | undefined | false | null)[]): string => {
    return twMerge(...classNames);
}