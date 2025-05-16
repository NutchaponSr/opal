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

export interface Category {
  label: string;
  icon: string;
  emojis: Emoji[];
}

export type EmojiItem = {
  code: string[];
  emoji: string;
  name: string;
}

export type EmojiSubCategory = {
  [subCategory: string]: EmojiItem[];
};

export type EmojiCategory = {
  [category: string]: EmojiSubCategory;
};

export type EmojiData = {
  emojis: EmojiCategory;
}