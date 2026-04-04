export interface ParsedChannel {
    name: string;
    logo?: string;
    group?: string;
    url: string;
}
export interface Channel extends ParsedChannel {
  isFavourite?: boolean;
}
