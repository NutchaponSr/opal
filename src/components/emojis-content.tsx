import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { emojiCategories } from "@/constants/emojis";

import { Button } from "@/components/ui/button";

interface Props {
  searchTerm: string;
  onChange: (icon: string) => void;
}

export const EmojisContent = ({ searchTerm, onChange }: Props) => {
  const [category, setCategory] = useState<string | null>(null);
  const [filteredCategories, setFilteredCategories] = useState(emojiCategories); 

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // TODO: Recent store
  // TODO: Popover select skin tone

  const onScroll = () => {
    if (!scrollContainerRef.current) return;

    const scrollContainerRect = scrollContainerRef.current.getBoundingClientRect();
    const middlePoint = scrollContainerRect.top + scrollContainerRect.height / 4;

    let currentCategory: string | null = null;

    Object.entries(categoryRefs.current).forEach(([category, ref]) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();

        if (rect.top <= middlePoint && rect.bottom >= middlePoint) {
          currentCategory = category;
        }
      }
    });

    setCategory(currentCategory);
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", onScroll);
      return () => scrollContainer.removeEventListener("scroll", onScroll);
    }
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCategories(emojiCategories);
      return;
    }

    const filtered = emojiCategories.map(category => ({
      ...category,
      emojis: category.emojis.filter(emoji => 
        emoji.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(category => category.emojis.length > 0);

    setFilteredCategories(filtered);
  }, [searchTerm]);

  return (
    <div className="flex flex-col w-full h-full max-h-[calc(208px+45px)]">
      <div 
        ref={scrollContainerRef}
        onScroll={onScroll}
        className="w-full grow max-h-52 overflow-x-hidden overflow-y-auto custom-scrollbar pb-1.5"
      >
        {filteredCategories.map((category, i) => (
          <div 
            key={i} 
            ref={(el) => { categoryRefs.current[category.label] = el }}
            className="flex flex-col gap-0.5 items-stretch"
          >
            <div className="flex p-2 text-[#37352fa6] text-xs">
              <p className="self-center whitespace-nowrap overflow-hidden text-ellipsis">
                {category.label}
              </p>
            </div>
            <div className="flex flex-wrap gap-[2.7px] pl-2">
              {category.emojis.map((emoji) => (
                <Button
                  key={emoji.slug}
                  variant="ghost" 
                  size="smIcon"
                  onClick={() => onChange(emoji.icon)}
                >
                  <Icon icon={emoji.icon} className="size-[22px]" />
                </Button>
              ))}
            </div>
          </div>
          ))}
      </div>

      <div className="border-t p-2 flex justify-between min-h-[45px] max-h-[45px]">
        {emojiCategories.map((cat) => (
          <Button 
            key={cat.label} 
            variant="ghost" 
            size="smIcon"
            className={cn(category === cat.label && "bg-[#f2f1ee99]")}
            onClick={() => {
              categoryRefs.current[cat.label]?.scrollIntoView({
                behavior: "auto",
                block: "start",
              });
              setCategory(cat.label);
            }}
          >
            <Icon icon={cat.icon} />
          </Button>
        ))}
      </div>
    </div>
  );
}