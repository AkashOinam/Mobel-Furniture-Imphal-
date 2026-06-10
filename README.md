# 🪑 Stupendous Interior — Premium E-Commerce Website

A modern, high-performance, and visually stunning e-commerce platform designed and built for **Stupendous Interior**, the premier furniture destination in Manipur. This application showcases premium furniture items including sofas, luxury dining sets, bedroom packages, storage solutions, office setups, and home decor, providing a seamless browsing and shopping experience.

---

## ✨ Key Features

- **🛍️ Extensive Product Catalog**: Browse curated furniture categories with high-quality images, detailed descriptions, dimensions, and materials.
- **🔍 Advanced Filtering & Sorting**: Easily filter furniture by category, price ranges, and search keywords.
- **🛒 Dynamic Shopping Cart**: Seamlessly add, remove, adjust quantities, and preview order summaries in real-time.
- **💳 Structured Checkout Process**: Step-by-step checkout page collecting contact, delivery, and payment information.
- **🔐 Furniture Manager Admin Portal**: Secure portal at `/furniture-manager` for administrators to add, edit, and delete catalog products.
- **🖼️ Cloudinary Asset Integration**: Automatic compression and hosting of product images uploaded through the admin panel.
- **🗃️ PostgreSQL Database Support**: Dynamic CRUD operations backed by a remote PostgreSQL database (compatible with Prisma Postgres and Vercel Postgres) with automatic schema initialization and seeding.
- **📱 Fully Responsive Premium UI**: Immersive shopping experience with clean glassmorphism accents, smooth micro-interactions, and beautiful transitions.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: PostgreSQL (Prisma Postgres / Vercel Postgres)
- **Database Driver**: [node-postgres (`pg`)](https://node-postgres.com/)
- **Image Storage**: [Cloudinary](https://cloudinary.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Folder Structure

```text
mobel-furniture/
├── app/                  # Next.js App Router root
│   ├── api/              # API Route Handlers (Uploads, Auth, Product CRUD)
│   ├── checkout/         # Checkout flow page
│   ├── components/       # Reusable UI components (Navbar, Footer, Product Cards)
│   ├── context/          # React Context (Shopping Cart state)
│   ├── data/             # Static product fallback data and types
│   ├── furniture-manager/# Admin portal page
│   ├── lib/              # Library configurations and DB handlers
│   ├── product/          # Dynamic product details ([id] route)
│   ├── globals.css       # Core Tailwind CSS directives and custom styles
│   ├── layout.tsx        # Root HTML shell & metadata
│   └── page.tsx          # Homepage / Main Catalog
├── public/               # Static assets (images, logo, icons)
├── package.json          # Dependency and script definitions
└── tsconfig.json         # TypeScript configuration
```

---

## 🔑 Environment Variables Configuration

Create a `.env.local` file in the root directory and configure the following variables:

```env
# Google Sheets Integration
GOOGLE_SHEET_WEBAPP_URL=your_google_sheet_webhook_url

# Cloudinary Credentials
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Database Settings (Prisma Postgres / Vercel Postgres)
POSTGRES_URL=your_postgresql_connection_string

# Admin Authentication
ADMIN_PASSWORD=your_admin_portal_password
```

---

## 🚀 Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

Ensure you have **Node.js** (v18.x or later) and **npm** installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AkashOinam/Mobel-Furniture-Imphal-.git
   cd mobel-furniture
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the environment:**
   Set up your `.env.local` file using the keys detailed in the **Environment Variables** section.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application in action.

---

## 🏗️ Production Build

To build the application for production deployment:

```bash
npm run build
```

This compiles the TypeScript code, optimizes the assets, and generates a production-ready build in the `.next` directory. You can start the production server with:

```bash
npm run start
```

---

## 📝 License

This project is configured for private use. All rights reserved by **Oinam Akash Khuman**.