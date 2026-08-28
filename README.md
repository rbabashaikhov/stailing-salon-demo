# Stailing — демонстрационный сайт салона красоты

Персонализированный **demo/prototype** для показа владельцу салона **Stailing** (Москва, Митинская улица, 28к2). Это не production-сайт клиента и не публичный маркетинговый домен.

Preview: `https://stailing-demo.apps.leadmeter.ru`

На VPS: `/srv/miniapps/stailing-demo`, контейнер `stailing-demo` в сети `miniapps-net`, Caddy → `stailing-demo:8080`. Локальный host-порт контейнера: `127.0.0.1:8093` (не публичный).

Preview закрыт от индексации: `noindex,nofollow,noarchive,nosnippet` в HTML, `X-Robots-Tag` и `robots.txt` с `Disallow: /`. Sitemap в поисковики не отправляется.

## Стек

- Frontend: React 18, TypeScript, Vite, React Router, Tailwind CSS
- Backend: Node.js, Express
- Booking: `BookingProvider` → сейчас `DemoBookingProvider`
- Demo DB: SQLite (`better-sqlite3`)
- Deploy: Docker Compose за Caddy

## Локальный запуск

```bash
npm install
npm run dev
```

- Сайт: http://localhost:5173
- API: http://127.0.0.1:8080/api/health (проксируется с Vite как `/api`)

После сборки, как в контейнере:

```bash
npm run preview
```

Preview-сервер: http://127.0.0.1:4173

## Docker

```bash
cp .env.example .env
# задайте свободный HOST_PORT на хосте
docker compose up -d --build
```

Контейнер слушает `PORT` (по умолчанию 8080). Caddy проксирует внешний HTTPS на `HOST_PORT`.

## Команды

| Команда | Назначение |
|---|---|
| `npm run dev` | Vite + Express |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm test` | Vitest |
| `npm run build` | `dist/` + `dist-server/` |
| `npm start` | production Node (нужен `PORT`) |

## Архитектура записи

UI вызывает только интерфейс `BookingProvider` через `HttpBookingProvider`.

Сейчас:

`CRM_PROVIDER=demo` → `DemoBookingProvider`

`getAvailability({ date, masterId })` отдаёт слоты на выбранную дату и мастера. Сейчас это demo/mock (часть слотов помечена недоступными). Позже тот же вызов должен ходить в CRM и возвращать реальные окна. Выбранный слот уходит в `createBooking()` как `preferred_time` (`HH:mm`).

Заявка сохраняется в SQLite со статусом `DEMO`. SMS, Telegram и CRM не вызываются.

Позже, без переписывания UI:

- `YclientsBookingProvider`
- `DikidiBookingProvider`
- `AltegioBookingProvider`
- `CustomCrmBookingProvider`

## Preview deployment

```
Internet → Caddy (stailing-demo.apps.leadmeter.ru)
        → Docker container stailing-demo
        / и /api — один процесс
```

Индексация закрыта на уровне HTML, HTTP-заголовка и `robots.txt`.

## Env

См. `.env.example`. Секреты и пароли в репозиторий не класть.

| Переменная | Смысл |
|---|---|
| `PORT` | Порт процесса в контейнере |
| `HOST_PORT` | Порт на хосте (compose) |
| `NODE_ENV` | `production` / `development` |
| `DEMO_MODE` / `VITE_DEMO_MODE` | Демо-режим |
| `VITE_API_URL` | Пусто = относительный `/api` |
| `SQLITE_PATH` | Файл демо-заявок |
| `CRM_PROVIDER` | Сейчас только `demo` |

## Что заменить реальным контентом

- `public/images/salon/` — фото интерьера
- `public/images/masters/` — фото мастеров
- `src/data/masters.ts` — имена и специализации
- `src/data/services.ts` / `src/data/prices.ts` — полный прайс
- `src/data/reviews.ts` — отзывы (или виджет Яндекс)
- `src/data/salon.ts` — WhatsApp/Telegram, часы работы, точные URL карт
- `server/booking/DemoBookingProvider.ts` → CRM provider

## Политика контента

Не выдумывать цены, мастеров, акции, цитаты клиентов и часы работы. Подтверждено: адрес, телефон, направления услуг, два диапазона цен на стрижки, снимок рейтинга Яндекс на момент анализа (не в JSON-LD).
