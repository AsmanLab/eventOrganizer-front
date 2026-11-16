import Image from "next/image";
import Link from "next/link";
import { BRAND } from "shared/brand";

const Logo = ({ src }: { src: string }) => {
  return (
    <div className="relative">
      <Link href="/">
        <Image src={src} alt={`${BRAND.name} logo`} width={120} height={74} />
      </Link>
    </div>
  );
};

export default Logo;
