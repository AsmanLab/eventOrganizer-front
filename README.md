# EventPeak — фронтенд (демо)

Платформа для мероприятий со стендами: career fair, comic con, экспо, ярмарки.
Бронирование стендов на схеме зала, билеты с QR-кодом, заявки спикеров и партнёров, админ-панель.

> Демо-версия: все имена, компании и контакты вымышлены.
> Разработка: [Asman Peak R&D](https://aprd.kg)

Стек: Next.js 15, React 19, Tailwind, shadcn/ui, TanStack Query.

## Локальный запуск

```bash
npm install --legacy-peer-deps
cp .env.example .env.local
npm run dev           # http://localhost:3000
```

`NEXT_PUBLIC_API_BASE_URL` — адрес Django API без слэша на конце.

## Деплой на Vercel (бесплатно)

1. Vercel → **Add New → Project** → импортировать этот репозиторий.
2. Framework определится сам (Next.js). Ничего не менять.
3. **Environment Variables:** `NEXT_PUBLIC_API_BASE_URL = https://<ваш-сервис>.onrender.com`
4. **Deploy.**

Если поменяли адрес API — пересоберите проект (Redeploy): переменная `NEXT_PUBLIC_*` вшивается при сборке.

## Ребрендинг под клиента

- `src/shared/brand.ts` — название, слоган, даты, площадка, контакты.
- `tailwind.config.ts` — цвета (`brand-navy`, `brand-blue`, `brand-sky`; старые токены `main-blue` / `main-red` — алиасы).
- `src/components/formats/formats-data.ts` — форматы мероприятий (Career Fair, Comic Con), спикеры, партнёры.
- `src/assets/` — картинки (сгенерированные иллюстрации, можно заменить фото клиента с теми же именами файлов).

Админка: `/login` (логин/пароль задаются на бэкенде, по умолчанию `demo` / `demo12345`).
