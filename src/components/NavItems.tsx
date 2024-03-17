"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-onClick-outside";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);
  useOnClickOutside(navRef, () => setActiveIndex(null));

  const isAnyOpen = activeIndex !== null;

  return (
    <div className="flex h-full gap-4" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, index) => {
        const handleOpen = () => {
          if (activeIndex === index) {
            setActiveIndex(null);
          } else {
            setActiveIndex(index);
          }
        };

        const isOpen = index === activeIndex;
        return (
          <NavItem
            category={category}
            isOpen={isOpen}
            handleOpen={handleOpen}
            isAnyOpen={isAnyOpen}
            key={category.label}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
