"use client";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col md:flex-row animate-pulse">
      <aside className="hidden md:flex flex-col bg-[var(--sidebar)] border-r border-[var(--sidebar-border)] w-64 p-5 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent)] opacity-40" />
          <div className="w-24 h-4 bg-[var(--accent)] opacity-40 rounded" />
        </div>
        <div className="flex-1 space-y-4 py-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-11 bg-[var(--accent)] opacity-40 rounded-xl"
            />
          ))}
        </div>
        <div className="w-full h-12 bg-[var(--accent)] opacity-30 rounded-xl" />
      </aside>

      <main className="flex-1 p-6 md:p-8 lg:p-10 space-y-8">
        <div className="h-10 w-48 bg-[var(--accent)] opacity-40 rounded-lg" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 h-72 bg-[var(--card)] border border-[var(--border)] rounded-3xl" />

          <div className="col-span-1 h-72 bg-[var(--card)] border border-[var(--border)] rounded-3xl" />

          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-56 bg-[var(--card)] border border-[var(--border)] rounded-3xl"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
