# kwork-tigr-shop

Серверная часть проекта **kwork-tigr-shop**, написанная на **TypeScript** с использованием **PostgreSQL** и **Tinkoff API**.

---

## 📦 Установка

1. Клонируйте репозиторий:

```bash
git branch backend
git clone [https://github.com/AndreySmirnoffv/kwork-tigr-shop/tree/backend](https://github.com/AndreySmirnoffv/kwork-tigr-shop/tree/backend)
```

2. Установите зависимости:

```bash
npm install
npm install -D
```

## ⚙️ Настройка переменных окружения

Создайте файл .env в корне проекта и добавьте в него следующие переменные:

```bash
DATABASE_URL=""
PORT=""

JWT_ACCESS_TOKEN=""
JWT_REFRESH_TOKEN=""
```

🔐 Убедитесь, что файл .env добавлен в .gitignore, чтобы чувствительные данные не попали в репозиторий.

##🚀 Запуск проекта

Для запуска сервера в режиме разработки используйте:

```bash
npx tsx src/index.ts
```bash

##🛠️ Сборка проекта

Для сборки проекта выполните:

```bash
npm run build
```
