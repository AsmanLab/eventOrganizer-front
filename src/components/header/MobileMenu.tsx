"use client";

import { useContext } from "react";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { HeaderContext } from "../providers/HeaderProvider";
import Link from "next/link";
import { useClickOutside } from "../hooks/use-click-outside";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import { mobileNavLinks } from "shared/config";

function MobileMenu() {
  const { mobileMenuOpen, setMobileMenuOpen } = useContext(HeaderContext);
  const pathname = usePathname();

  const mobileMenuRef = useClickOutside(() => setMobileMenuOpen(false));

  const handleCloseMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    mobileMenuOpen && (
      <div
        className={twMerge(
          "lg:hidden",
          mobileMenuOpen ? "bg-black bg-opacity-40" : "hidden"
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 z-10 blur-sm backdrop-blur-sm backdrop-filter"></div>
        <div
          ref={mobileMenuRef}
          className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-2 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-end">
            <div
              className="-m-2.5 rounded-md p-3 text-gray-700 cursor-pointer"
              onClick={handleCloseMenu}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6 text-main-blue" />
            </div>
          </div>

          {/* Mobile Menu Content */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 text-main-blue ">
              {mobileNavLinks.map((link) => {
                const isActive =
                  link.path === "/"
                    ? pathname === link.path
                    : pathname.startsWith(link.path);

                return (
                  <Link
                    href={link.path}
                    key={link.path}
                    onClick={handleCloseMenu}
                    className={cn(
                      "-mx-2 block rounded-lg px-3 py-3 text-base font-semibold leading-7 text-main-blue hover:bg-gray-50",
                      isActive && "bg-main-blue/10"
                    )}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default MobileMenu;
