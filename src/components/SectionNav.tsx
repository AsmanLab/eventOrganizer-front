"use client";

import { cn } from "@/components/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const normalizePath = (path: string) => {
  return path.split("?")[0].replace(/\/$/, "");
};

type NavLink = {
  name: string;
  link: string;
};

const SectionNav = ({ navLinks }: { navLinks: NavLink[] }) => {
  const pathname = normalizePath(usePathname() || "");

  return (
    <div className="flex justify-center gap-2 sm:gap-4 md:gap-8 mb-8">
      {navLinks.map((item) => {
        const normalizedHref = normalizePath(item.link);
        const isActive = pathname === normalizedHref;

        return (
          <Link
            key={item.link}
            href={item.link}
            className={cn(
              "border text-center border-main-blue px-1 sm:px-2 md:px-4 py-1.5 rounded-2xl text-xs sm:text-sm md:text-base font-semibold text-main-blue hover:text-main-blue hover:bg-main-blue/5",
              isActive
                ? "bg-main-red border-main-red text-white hover:bg-main-red/85 hover:text-white"
                : ""
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default SectionNav;
