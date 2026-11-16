"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { navLinks } from "shared/config";

const DesktopNav = () => {
  const pathname = usePathname();

  return (
    <ul className="hidden lg:flex xl:px-8 gap-x-10 text-sm font-medium items-center bg-main-blue my-3 px-4 rounded-3xl text-white shadow-md navLink">
      {navLinks.map((item) => {
        const isActive =
          item.path === "/"
            ? pathname === item.path
            : pathname.startsWith(item.path);
        return (
          <li key={item.path}>
            <Link href={item.path} className={isActive ? "active" : ""}>
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DesktopNav;
