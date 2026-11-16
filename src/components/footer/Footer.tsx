import Logo from "../header/Logo";
import logoSrc from "@/assets/logo2.png";
import whatsappLogo from "@/assets/whatsapp-icon.svg";
import telegramLogo from "@/assets/telegram-icon.svg";
import Image from "next/image";
import { BRAND } from "shared/brand";

const CONTACT_DETAILS = [
  {
    type: "Email",
    value: BRAND.email,
    href: `mailto:${BRAND.email}`,
  },
  {
    type: "Телефон",
    value: BRAND.phone,
    href: BRAND.phoneHref,
  },
  {
    type: "Адрес",
    value: BRAND.address,
    href: BRAND.addressHref,
  },
];

const SOCIAL_LINKS = [
  {
    icon: telegramLogo,
    label: "Написать в Telegram",
    href: BRAND.telegram,
  },
  {
    icon: whatsappLogo,
    label: "Написать в WhatsApp",
    href: BRAND.whatsapp,
  },
];

const Footer = () => {
  return (
    <footer className="bg-main-blue text-white py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Contact Information */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h3 className="text-lg font-medium mb-4">Наши контакты</h3>
          <address className="not-italic">
            <ul className="space-y-2">
              {CONTACT_DETAILS.map((item) => (
                <li key={item.type}>
                  <span className="font-medium">{item.type}:</span>{" "}
                  <a
                    href={item.href}
                    className="hover:underline"
                    target={item.type !== "Адрес" ? "_blank" : undefined}
                    rel={
                      item.type !== "Адрес" ? "noopener noreferrer" : undefined
                    }
                  >
                    {item.value}
                  </a>
                </li>
              ))}
            </ul>
          </address>
        </div>

        {/* Logo */}
        <div className="mb-6 md:mb-0">
          <Logo src={logoSrc.src} />
        </div>

        {/* Social Links */}
        <div className="text-center md:text-right">
          <h3 className="text-lg font-medium mb-4">Пишите через</h3>
          <div className="flex justify-center md:justify-end gap-4">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:opacity-80"
                aria-label={item.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={40}
                  height={40}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-6 border-t border-white/15 text-sm text-white/70 flex flex-col sm:flex-row gap-2 justify-between items-center">
        <span>
          © {BRAND.year} {BRAND.name}. Демо-версия: все данные вымышлены.
        </span>
        <a
          href={BRAND.developer.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          Разработка — {BRAND.developer.name}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
