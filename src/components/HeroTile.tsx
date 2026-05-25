"use client";

import { motion } from "framer-motion";
import DynamicIcon from "./DynamicIcon";

interface HeroTileProps {
  studentName?: string;
  streakCount?: number;
}

export default function HeroTile({
  studentName = "Tejas",
  streakCount = 7,
}: HeroTileProps) {
  return (
    <article className="relative overflow-hidden rounded-3xl bg-[var(--card)] border border-[var(--border)] p-6 md:p-8 flex flex-col justify-between h-full group shadow-xl">
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-30 group-hover:opacity-40 transition-opacity duration-500">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[var(--primary)] filter blur-[60px]" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[var(--chart-2)] filter blur-[60px]" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-[var(--accent)] border border-[var(--border)] text-xs font-semibold text-[var(--primary)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
            LIVE DASHBOARD
          </div>
          <span className="text-xs text-[var(--muted-foreground)]">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--chart-1)] bg-clip-text text-transparent">
              {studentName}
            </span>
            !
          </h1>
          <p className="text-sm md:text-base text-[var(--muted-foreground)] max-w-md">
            You are making great progress this week. Keep up the momentum and
            reach your learning goals!
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4 bg-[var(--background)] bg-opacity-40 border border-[var(--border)] rounded-2xl p-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              filter: [
                "drop-shadow(0 0 4px var(--chart-2))",
                "drop-shadow(0 0 12px var(--chart-2))",
                "drop-shadow(0 0 4px var(--chart-2))",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[var(--chart-2)] to-[var(--chart-3)] flex items-center justify-center shadow-lg"
          >
            <DynamicIcon
              name="Flame"
              className="text-[var(--foreground)]"
              size={24}
            />
          </motion.div>

          <div>
            <div className="text-2xl font-black text-[var(--foreground)] flex items-baseline gap-1">
              {streakCount}
              <span className="text-xs font-normal text-[var(--muted-foreground)]">
                days
              </span>
            </div>
            <div className="text-xs font-medium text-[var(--muted-foreground)]">
              Current Study Streak
            </div>
          </div>
        </div>

        <div className="h-8 w-px bg-[var(--border)] hidden sm:block" />

        <div className="flex gap-4 sm:ml-auto">
          <div className="text-center sm:text-left">
            <span className="block text-xs font-medium text-[var(--muted-foreground)]">
              Daily Target
            </span>
            <span className="text-sm font-bold text-[var(--foreground)]">
              45 min
            </span>
          </div>
          <div className="text-center sm:text-left">
            <span className="block text-xs font-medium text-[var(--muted-foreground)]">
              Today Completed
            </span>
            <span className="text-sm font-bold text-[var(--primary)]">
              35 / 45m
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
