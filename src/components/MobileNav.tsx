"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { User } from "@/payload-types";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { useOnClickOutside } from "@/hooks/use-onClick-outside";

interface MobileNavProps {
  user: User | null;
}
const MobileNav = (props: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathname = usePathname();

  const { user } = props;

  const { signOut } = useAuth();

  // close on click
  const mobileNavRef = useRef<HTMLDivElement | null>(null);

  // whenever we click an item in the menu and navigate away, we want to close the menu
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // when we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that won't change (we're already there)
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false);
    }
  };

  // remove second scrollbar when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [isOpen]);
  useOnClickOutside(mobileNavRef, () => setIsOpen(false));

  if (!isOpen)
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
    );

  return (
    <div>
      <div className="relative z-40 lg:hidden">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </div>

      <div className="fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex">
        <div className="w-4/5">
          <div
            ref={mobileNavRef}
            className="relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-2">
              <ul>
                {PRODUCT_CATEGORIES.map((category) => (
                  <li key={category.label} className="space-y-5 px-4 pb-4 pt-5">
                    <div className="border-b border-gray-200">
                      <div className="-mb-px flex">
                        <p className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 pb-4 text-base font-medium">
                          {category.label}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                            <Image
                              fill
                              src={item.imageSource}
                              alt="product category image"
                              className="object-cover object-center"
                            />
                          </div>
                          <Link
                            href={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            {item.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {user ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-start gap-2">
                    <div className="flex flex-col bg-zinc-100 rounded-lg w-full py-1 px-2 space-y-0.5 leading-none">
                      <p className="text-muted-foreground text-sm">
                        Signed in as:
                      </p>
                      <p className="font-medium text-base text-black">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Button className="w-full" onClick={signOut}>
                      Log out
                    </Button>
                  </div>
                  <div className="mx-auto my-auto">
                    <Link className="border-b -mb-1 text-sm" href="/sell">
                      Go to seller dashboard &rarr;
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-6 shadow">
                  <div className="flow-root">
                    <Link
                      onClick={() => closeOnCurrent("/sign-in")}
                      href="/sign-in"
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "-m-2 block p-2 font-medium text-gray-900 text-center"
                      )}
                    >
                      Sign in
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      onClick={() => closeOnCurrent("/sign-up")}
                      href="/sign-up"
                      className={cn(
                        buttonVariants(),
                        "-m-2 block p-2 font-medium text-gray-50 shadow text-center"
                      )}
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
