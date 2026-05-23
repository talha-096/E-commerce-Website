# Multi-Vendor E-Commerce Application

A modern, scalable Multi-Vendor E-Commerce platform built using the latest Next.js 15, Supabase, Drizzle ORM, and Hono.js.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Backend API**: [Hono.js](https://hono.dev/) mounted on Next.js serverless routes
- **Database / Auth**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Database Client / ORM**: [Drizzle ORM](https://orm.drizzle.team/) & `postgres.js`
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [TanStack React Query v5](https://tanstack.com/query/latest)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Swiper.js](https://swiperjs.com/)

---

## 📂 Project Architecture

```
├── app/                  # Next.js App Router routes
│   ├── (apps)/           # Core app pages divided by roles
│   │   ├── (public)/     # Public routes: Home, Cart, Shop, Search, Deals
│   │   ├── admin/        # Admin panel routes
│   │   ├── sel/          # Seller/Vendor panel routes
│   │   └── user/         # Customer account/dashboard routes
│   ├── api/              # Hono.js API backend routes
│   │   └── [[...route]]/ # Unified routing with Hono modules
│   └── auth/             # Custom authentication screens
├── components/           # Reusable UI components
│   ├── common/           # Shared layouts, Navbar, and Footer
│   ├── global/           # Scroll carousel & global widgets
│   ├── shared/           # Product cards and likes
│   └── ui/               # Lower-level design components (meteors, word rotate)
├── db/                   # Database schemas and connections
│   ├── models/           # Drizzle schema definitions for tables
│   ├── drizzle.ts        # Database connection client
│   └── schema.ts         # Main exported schema bundling all models
├── features/             # Business logic layer / API queries (React Query)
│   ├── admin/            # Admin state hooks
│   ├── auth/             # Sign-up, Sign-in, OTP, Password resets
│   ├── orders/           # Orders query hooks
│   ├── products/         # Products query hooks
│   └── reviews/          # Reviews query hooks
├── hooks/                # Custom React hooks
├── lib/                  # Utilities, constants, and Supabase client configs
│   ├── hono/             # Hono client instances
│   ├── supabase/         # Supabase client, server, and middleware logic
│   └── utils/            # Helper utility functions
└── screens/              # UI Screen views corresponding to pages
```

---

## 🗄️ Database Models & Schema

The application database is designed using PostgreSQL and defined with **Drizzle ORM** in `db/models/`:

1. **`users.ts`**: Customer profiles containing name, email, avatar, role, status, and metadata.
2. **`admin.ts`**: Admin configuration and permissions table.
3. **`seller.ts`**: Seller store information, business name, address, tax details, and earnings.
4. **`product.ts`**: Product details, vendor-association, pricing, description, category, brand, stock, and status.
5. **`category.ts` / `brand.ts`**: Hierarchical organization for brand and category listings.
6. **`cart.ts`**: Saved user shopping carts containing item lists and quantities.
7. **`order.ts`**: Tracked transactions, user association, delivery details, amounts, status, and payment types.
8. **`review.ts`**: Product ratings and review feedback.
9. **`addresses.ts`**: Stored user address profiles for checkout.
10. **`coupon.ts`**: Discount and promotion coupon definitions.

---

## 🔐 Authentication & Session Flow

The application implements a robust authentication state system using **Supabase Auth** and a custom **Next.js Middleware** (`lib/supabase/middleware.ts`):

- **Protected Routes**: Paths like `/user`, `/vendor`, `/admin`, and `/cart/checkout` require authentication.
- **Verification Gate**: Unverified users (users whose emails are not verified) are automatically redirected to the `/auth/confirm-otp` screen.
- **Role Redirection**: Authenticated users trying to access `/auth/*` pages are automatically routed to their dashboards (e.g., `/user/dashboard`).
- **Google One Tap**: Built-in support for Google One Tap authentication using `google-auth-library` and a native callback route.

---

## 🛠️ Installation and Setup

### 1. Clone the repository and install dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory and add the following keys (based on `.env.example`):
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_direct_postgres_database_url
```

### 3. Database Migration with Drizzle
To generate and apply database migrations to your Supabase PostgreSQL instance:
```bash
# Generate migrations schema based on Drizzle models
npm run generate

# Push migrations to the database directly
npm run push

# Run migrations using drizzle-kit migrate
npm run migrate

# Open local Drizzle Studio to view database tables
npm run studio
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🧩 Backend API & Modules

All API endpoints are unified under `/api/*` handled by **Hono.js**. The router is split into modular controllers located in `app/api/[[...route]]/(modules)/`:
- **Auth Module**: Sign-in, Sign-up, confirmation OTP handling.
- **Seller Module**: Dashboard and listing logic for vendors.
- **Admin Module**: Oversight actions.
- **Products Module**: Search and filter endpoints.
- **Orders & Reviews Module**: Submitting checkout and product feedback.