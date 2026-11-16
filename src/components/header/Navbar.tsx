import Link from "next/link";
import { Button } from "../ui/button";
import DesktopNav from "./DesktopNav";
import Logo from "./Logo";
import { MobileNavToggle } from "./MobileNavToggle";
import logoSrc from "@/assets/logo.svg";

function Navbar() {
  return (
    <nav className="w-full flex item-center justify-between px-3 xl:px-12">
      <Logo src={logoSrc} />
      <DesktopNav />
      <div className="hidden lg:flex justify-end items-center gap-2">
        <Link href={"/apply/stand"}>
          <Button
            className="rounded-3xl bg-main-red hover:bg-main-red/80"
            size={"lg"}
          >
            Забронировать стенд
          </Button>
        </Link>
      </div>
      <MobileNavToggle />
    </nav>
  );
}

export default Navbar;
