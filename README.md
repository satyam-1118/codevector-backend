# CodeVector Backend Assignment

A backend application built using **Node.js, Express.js, Prisma ORM, and PostgreSQL** that allows users to browse a large product catalog with efficient cursor-based pagination and category filtering.

## 🚀 Live Demo

**API Base URL**

https://codevector-backend-svzu.onrender.com

### Products API

GET /api/products

Example:

https://codevector-backend-svzu.onrender.com/api/products

---

## 📌 Features

- Browse products (Newest First)
- Cursor-based Pagination
- Category Filter
- Fast Pagination for Large Dataset
- Batch Seed Script
- PostgreSQL Database
- Prisma ORM
- REST API
- Render Deployment

---

## 🛠 Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (Neon)
- Render
- Faker.js

---

## 📂 Folder Structure

```
codevector-backend
│
├── prisma
│   ├── migrations
│   ├── schema.prisma
│   └── seed.js
│
├── src
│   ├── config
│   │   └── prisma.js
│   ├── controllers
│   │   └── productController.js
│   ├── routes
│   │   └── productRoutes.js
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation

Clone Repository

```bash
git clone https://github.com/satyam-1118/codevector-backend.git
```

Go to project

```bash
cd codevector-backend
```

Install dependencies

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Migration

```bash
npx prisma migrate dev
```

Start Server

```bash
npm start
```

Development Mode

```bash
npm run dev
```

---

## 🌱 Seed Database

Generate Products

```bash
npm run seed
```

The seed script generates products with:

- Name
- Category
- Price
- created_at
- updated_at

using Prisma's `createMany()` for efficient batch insertion.

---

## 📖 API Endpoints

### Home

```http
GET /
```

Response

```json
{
  "success": true,
  "message": "CodeVector Backend API is running 🚀"
}
```

---

### Get Products

```http
GET /api/products
```

---

### Pagination

```http
GET /api/products?limit=20
```

Next Page

```http
GET /api/products?limit=20&cursorUpdatedAt=2026-06-22T11:33:55.144Z&cursorId=YOUR_CURSOR_ID
```

---

### Category Filter

```http
GET /api/products?category=Electronics
```

Example

```http
GET /api/products?category=Books
```

---

## ⚡ Pagination Strategy

This project uses **cursor-based pagination (seek pagination)** instead of OFFSET pagination.

Benefits:

- Faster on large datasets
- Better performance
- No expensive OFFSET scan
- Suitable for continuously growing datasets

Products are ordered by:

- updated_at DESC
- id DESC

---

## 📈 Database

PostgreSQL hosted on Neon.

Indexes:

- updated_at
- updated_at + id
- category + updated_at + id

---

## 🔮 Future Improvements

- Request Validation
- Swagger API Documentation
- Docker Support
- Unit Testing
- Authentication
- Rate Limiting
- Logging

---

## 🤖 AI Usage

AI tools (ChatGPT) were used to:

- Understand cursor-based pagination
- Review project structure
- Improve implementation
- Debug issues during development

The final implementation was tested and understood before submission.

---

## 👨‍💻 Author

**Satyam Tiwari**

GitHub

https://github.com/satyam-1118
