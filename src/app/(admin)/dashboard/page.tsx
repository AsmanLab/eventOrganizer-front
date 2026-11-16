"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "shared/types/auth";
import { getUser } from "store/auth";

const dashboardRoutes = [
  {
    route: "/dashboard/festivals",
    description: "Список мероприятий",
    icon: "🏟️",
  },
  {
    route: "/dashboard/sponsors",
    description: "Список заявок на спонсорство",
    icon: "🤝",
  },
  {
    route: "/dashboard/speakers",
    description: "Список заявок на спикеров",
    icon: "🎤",
  },
  {
    route: "/dashboard/stand-applications",
    description: "Список заявок на стенды",
    icon: "📋",
  },
  {
    route: "/dashboard/visitors",
    description: "Список заявок на посещение",
    icon: "👥",
  },
  {
    route: "/dashboard/event-layouts",
    description: "Список макетов мероприятий",
    icon: "🗺️",
  },
];

function DashboardPage() {
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUser());
    setHydrated(true);
  }, []);

  if (!hydrated) return <div>Загрузка...</div>;

  if (!user) return <div>Данные пользователя не найдены!</div>;

  return (
    <div className="p-2 md:p-6">
      <h1 className="text-xl font-bold mb-4">
        Добро пожаловать, {user.first_name} {user.last_name}
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Панель управления</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {dashboardRoutes.map((item) => (
          <Link
            key={item.route}
            href={item.route}
            className="flex items-center p-4 border rounded-lg bg-white hover:bg-slate-100 transition-colors"
          >
            <span className="text-4xl mr-4">{item.icon}</span>
            <div>
              <h3 className="text-lg md:text-xl font-semibold">{item.route}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
