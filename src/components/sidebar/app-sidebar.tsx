import {
  CalendarDays,
  Handshake,
  Home,
  MicVocal,
  Grid2X2,
  Store,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import SignOutButton from "../auth/logout/sign-out-button";
import { BRAND } from "shared/brand";

// Menu items.
const items = [
  {
    title: "Главная",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Мероприятия",
    url: "/dashboard/festivals",
    icon: CalendarDays,
  },
  {
    title: "Спонсоры",
    url: "/dashboard/sponsors",
    icon: Handshake,
  },
  {
    title: "Спикеры",
    url: "/dashboard/speakers",
    icon: MicVocal,
  },
  {
    title: "Посетители",
    url: "/dashboard/visitors",
    icon: Users,
  },
  {
    title: "Заявки на стенды",
    url: "/dashboard/stand-applications",
    icon: Store,
  },
  {
    title: "Схемы мероприятий",
    url: "/dashboard/event-layouts",
    icon: Grid2X2,
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="bg-white" />
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl text-main-blue font-semibold">
            {BRAND.adminTitle}<span className="text-main-red">{BRAND.adminSuffix}</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="text-base my-1 text-admin-primary hover:text-admin-primary hover:bg-admin-primary/5"
                    asChild
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <SignOutButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
