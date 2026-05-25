"use client";

export default function CoursesSkeleton() {
  const skeletonCards = Array.from({ length: 4 });

  return (
    <>
      {skeletonCards.map((_, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-3xl bg-[var(--card)] border border-[var(--border)] p-6 flex flex-col justify-between h-full min-h-[220px] animate-pulse"
        >
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent)] opacity-40" />
            <div className="w-12 h-3 bg-[var(--accent)] opacity-40 rounded" />
          </div>

          <div className="mt-4 flex-1 space-y-2">
            <div className="w-3/4 h-5 bg-[var(--accent)] opacity-40 rounded" />
            <div className="w-1/2 h-5 bg-[var(--accent)] opacity-40 rounded" />
          </div>

          <div className="mt-auto space-y-2">
            <div className="flex items-center justify-between">
              <div className="w-12 h-3 bg-[var(--accent)] opacity-40 rounded" />
              <div className="w-8 h-3 bg-[var(--accent)] opacity-40 rounded" />
            </div>
            <div className="h-2 w-full bg-[var(--background)] rounded-full overflow-hidden border border-[var(--border)]">
              <div className="h-full w-1/3 bg-[var(--accent)] opacity-30 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
