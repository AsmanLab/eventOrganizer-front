import Image from "next/image";
import whatsappLogo from "@/assets/whatsapp-icon.svg";
import telegramLogo from "@/assets/telegram-icon.svg";
import instagramLogo from "@/assets/instagram-icon.svg";
import contactImg from "@/assets/contact_main.jpeg";
import { Metadata } from "next";
import { BRAND } from "shared/brand";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    `Контакты ${BRAND.name}: WhatsApp, Telegram, Instagram (демо-данные).`,
};

const ContactsPage = () => {
  return (
    <main className="max-container w-full min-h-screen">
      <section
        className="page-container pt-12 pb-10 px-4 sm:px-6 md:px-8 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 md:gap-8"
        aria-labelledby="contacts-heading"
      >
        <div className="flex-1">
          <h1
            id="contacts-heading"
            className="font-semibold text-main-blue text-xl"
          >
            Контакты
          </h1>
          <p className="text-4xl font-medium max-w-2xl capitalize text-slate-800 mt-4">
            {BRAND.contactPerson}
          </p>

          {/* Contact Details */}
          <address className="mt-8 not-italic">
            <ul className="flex flex-col gap-4">
              <li className="w-max px-4 py-3 flex items-center gap-4 border border-slate-300 rounded-xl text-main-blue">
                <Image
                  src={whatsappLogo}
                  alt={"Написать в WhatsApp"}
                  width={40}
                  height={40}
                />
                <a
                  href={BRAND.whatsapp}
                  className="text-lg font-medium hover:underline"
                  aria-label="Написать в WhatsApp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {BRAND.phone}
                </a>
              </li>
              <li className="w-max px-4 py-3 flex items-center gap-4 border border-slate-300 rounded-xl text-main-blue">
                <Image
                  src={telegramLogo}
                  alt={"Написать в Telegram"}
                  width={40}
                  height={40}
                />
                <a
                  href={BRAND.telegram}
                  className="text-lg font-medium hover:underline"
                  aria-label="Написать в Telegram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {BRAND.phone}
                </a>
              </li>
            </ul>
          </address>

          {/* Social Media */}
          <div className="mt-12">
            <div className="flex justify-start items-center gap-4">
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Профиль в Instagram"
              >
                <Image
                  src={instagramLogo}
                  alt="Instagram"
                  width={80}
                  height={80}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Image */}
        <div className="flex-1 flex justify-center">
          <figure className="w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] rounded-xl bg-slate-100 relative shadow-custom">
            <Image
              src={contactImg}
              alt="Свяжитесь с нами"
              fill
              sizes="(min-width: 808px) 50vw, 100vw"
              className="object-cover object-center rounded-xl"
            />
          </figure>
        </div>
      </section>
    </main>
  );
};

export default ContactsPage;
