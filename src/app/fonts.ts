import localFont from "next/font/local";
import { Poppins, Montserrat, Open_Sans } from "next/font/google";

export const arkhip = localFont({
  src: "../../public/fonts/Arkhip.woff2",
  variable: "--font-arkhip",
});

export const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const open_sans = Open_Sans({
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});