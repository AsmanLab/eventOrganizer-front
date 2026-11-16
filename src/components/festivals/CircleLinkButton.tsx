import Link from "next/link";
import { MoveUpRight } from "lucide-react";

import { Button } from "../ui/button";

function CircleLinkButton() {
  return (
    <Link href="/events">
      <Button className="flex justify-center items-center w-12 h-12 rounded-full bg-primary text-white">
        <MoveUpRight />
      </Button>
    </Link>
  );
}

export default CircleLinkButton;
