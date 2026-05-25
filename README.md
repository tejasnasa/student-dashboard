# 🚀 Aether Learn — Next-Gen Student Dashboard

A futuristic, highly animated dark-mode learning dashboard prototype. Built with Next.js (App Router), Tailwind CSS, Framer Motion, and integrated with live Supabase database queries.

## 🛠️ Architecture & Core Decisions

### 1. Server/Client Component Split
To build a highly performant and secure app, we cleanly separated our components:
*   **Server Components (RSC)**: `CoursesGrid` is a Server Component. It connects directly to the Supabase database and queries the courses record. This ensures sensitive database connection parameters and fetch queries run securely on the server, keeping the client bundle size small.
*   **Client Components**: Components requiring animations, hover states, navigation tabs, or window resizing logic (`Sidebar`, `DashboardContainer`, `HeroTile`, `ActivityTile`, `CourseCard`, and `CoursesSkeleton`) are marked as Client Components.

### 2. Loading State Streaming (React Suspense)
To ensure **zero layout shifts** and a fast visual response, we wrap the `CoursesGrid` server component inside a React `<Suspense>` boundary in `page.tsx`:
*   The shell of the application (collapsible Sidebar, Hero welcome banner, Activity graph, and Quick Stats) renders instantly.
*   While the Supabase query runs, a pulsing skeleton loader (`CoursesSkeleton`) occupies the space of the course cards, maintaining the Bento structure.
*   Once the data is ready, the skeleton is replaced by the course cards, which stagger in smoothly.

### 3. Database Security & Setup
*   **Table Name**: `courses`
*   **Row Level Security (RLS)**: Active. A public select policy (`Allow public read access`) has been configured so that client endpoints can query active courses anonymously but cannot write or modify them.
*   **Database Seeding**: We created and executed a Node.js seeding script using direct pg pooler connections on port `6543` to establish the `courses` table and populate it with initial data.

---

## 🎨 Design System & Custom Animations

All UI styling is strictly constructed using the CSS custom properties inside `src/app/globals.css` (the dark mode oklch colors):
*   **Theme**: Cyberpunk-adjacent dark-mode palette combining deep background grays (`var(--background)`, `var(--card)`) with neon-cyan accents (`var(--primary)`) and magenta/purple tones (`var(--chart-1)` to `var(--chart-5)`).
*   **Framer Motion Spring Physics**: Hover states for all Bento cards scale up by 2%, triggering glowing border highlights using spring-based motion (`type: "spring", stiffness: 300, damping: 20`) for a natural, tactile feel.
*   **Snapping Micro-interactions**: The sidebar navigation uses Framer Motion's `layoutId` layout animations, causing the active background highlight to slide and snap into place when clicked.
*   **Responsive Adaptation**:
    *   **Desktop (> 1024px)**: Full bento grid layout with expanded toggleable sidebar.
    *   **Tablet (768px - 1024px)**: Sidebar automatically collapses to icons only, and the Bento grid transitions into a 2-column layout.
    *   **Mobile (< 768px)**: Sidebar converts into a bottom navigation bar, and the Bento grid stacks into a single, vertical scrolling column.

---

## ⚙️ Getting Started

### 1. Prerequisites
Ensure you have Node.js (v18+) and npm installed on your system.

### 2. Configure Environment Variables
Copy `.env.example` to `.env` in the root directory and update with your Supabase credentials:
```bash
cp .env.example .env
```
Ensure your `.env` contains:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

### 3. Install Dependencies & Build
Install all packages and build for production verification:
```bash
npm install
npm run build
```

### 4. Run Development Server
Start the local server on `http://localhost:3000`:
```bash
npm run dev
```

---

## 📂 Database Table Schema

If you need to re-create the table schema in Supabase, execute this query in the Supabase SQL editor:
```sql
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  progress INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
  icon_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Allow read access to everyone
CREATE POLICY "Allow public read access" ON public.courses FOR SELECT USING (true);
```
