"use client";

import { motion } from "framer-motion";
import DynamicIcon from "./DynamicIcon";

export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const meshes = [
    "radial-gradient(circle at 10% 10%, var(--primary) 0%, transparent 45%), radial-gradient(circle at 90% 90%, var(--chart-2) 0%, transparent 45%)",
    "radial-gradient(circle at 90% 10%, var(--chart-3) 0%, transparent 45%), radial-gradient(circle at 10% 90%, var(--chart-4) 0%, transparent 45%)",
    "radial-gradient(circle at 50% 10%, var(--chart-1) 0%, transparent 45%), radial-gradient(circle at 50% 90%, var(--primary) 0%, transparent 45%)",
    "radial-gradient(circle at 20% 80%, var(--chart-5) 0%, transparent 45%), radial-gradient(circle at 80% 20%, var(--chart-2) 0%, transparent 45%)",
  ];

  const meshBackground = meshes[index % meshes.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
        borderColor: "var(--primary)",
      }}
      className="relative overflow-hidden rounded-3xl bg-[var(--card)] border border-[var(--border)] p-6 flex flex-col justify-between h-full min-h-[220px] transition-colors duration-300 group shadow-lg cursor-pointer"
    >
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity duration-500"
        style={{ backgroundImage: meshBackground }}
      />
      <div className="absolute inset-0 -z-10 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-2xl bg-[var(--accent)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)] group-hover:scale-110 transition-transform duration-300 relative">
          <div className="absolute inset-0 rounded-2xl bg-[var(--primary)] opacity-0 group-hover:opacity-10 blur-md transition-opacity" />
          <DynamicIcon
            name={course.icon_name}
            size={22}
            className="relative z-10"
          />
        </div>

        <span className="text-[10px] font-bold tracking-widest text-[var(--muted-foreground)] uppercase">
          COURSE
        </span>
      </div>

      <div className="mt-4 flex-1">
        <h3 className="text-lg font-bold text-[var(--foreground)] tracking-tight line-clamp-2 leading-snug group-hover:text-[var(--chart-2)] transition-colors duration-200">
          {course.title}
        </h3>
      </div>

      <div className="mt-auto space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-[var(--muted-foreground)]">
          <span>Progress</span>
          <span className="text-[var(--foreground)]">{course.progress}%</span>
        </div>

        <div className="h-2 w-full bg-[var(--background)] rounded-full overflow-hidden border border-[var(--border)] relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{
              delay: 0.5 + index * 0.1,
              duration: 1.2,
              type: "spring",
              stiffness: 80,
              damping: 15,
            }}
            className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--chart-2)] rounded-full relative"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white opacity-80 shadow-md shadow-white" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
