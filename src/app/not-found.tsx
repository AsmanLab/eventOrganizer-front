"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <main className="grid h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-6xl font-semibold text-main-red">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
          Страница не найдена
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500">
          Похоже, вы заблудились между стендами.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4">
          <Link
            href="/"
            className="rounded-md bg-main-red px-4 py-2 text-sm font-semibold text-white shadow hover:bg-main-red/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Вернуться на главную
          </Link>
          <Button
            variant={"outline"}
            onClick={() => router.back()}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 shadow hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Вернуться назад
          </Button>
        </div>
      </div>
    </main>
  );
}
