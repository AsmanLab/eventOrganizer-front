import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import type { Metadata } from "next";
import { BRAND } from "shared/brand";

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — ${BRAND.shortTagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow w-full bg-white mt-[74px]">{children}</main>
      <Footer />
    </div>
  );
};
export default HomeLayout;
