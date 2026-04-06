import 'dotenv/config';

export const env = (key: string, defaultValue?: string) => {
    const value = process.env[key];
    return value !== undefined ? value : defaultValue;
}