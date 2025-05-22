export const DEFAULT_KEY = "emoji";

export const iconTabs = [
  { key: "emoji", label: "Emoji" },
  { key: "icon", label: "Icon" },
]

export interface Emoji {
  slug: string;
  icon: string;
  name: string;
  keywords?: string[];
  skinTones?: {
    light: string;
    mediumLight: string;
    medium: string;
    mediumDark: string;
    dark: string;
  };
}