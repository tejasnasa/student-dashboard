import { supabase } from "@/lib/supabase";
import CourseCard, { Course } from "./CourseCard";
import DynamicIcon from "./DynamicIcon";

export default async function CoursesGrid() {
  let courses: Course[] = [];
  let errorMsg = "";

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      throw error;
    }

    courses = data || [];
  } catch (err: any) {
    console.error("Failed to fetch courses from Supabase:", err);
    errorMsg = err.message || "Unknown database connection error";
  }

  if (errorMsg) {
    return (
      <div className="col-span-full bg-[var(--card)] border border-[var(--destructive)] bg-opacity-50 rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-4 shadow-lg min-h-[220px]">
        <div className="w-12 h-12 rounded-2xl bg-[var(--destructive)]/10 border border-[var(--destructive)]/20 flex items-center justify-center text-[var(--destructive)]">
          <DynamicIcon name="X" size={24} />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-[var(--foreground)]">
            Database Connection Offline
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] max-w-sm">
            We couldn't establish a secure connection to the Supabase database.
            Please check your credentials or network settings.
          </p>
        </div>
        <div className="text-[10px] font-mono text-[var(--destructive)] bg-[var(--destructive)]/5 border border-[var(--destructive)]/10 px-3 py-1.5 rounded-lg select-all">
          Error: {errorMsg}
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="col-span-full bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-4 shadow-lg min-h-[220px]">
        <div className="w-12 h-12 rounded-2xl bg-[var(--accent)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)] animate-pulse">
          <DynamicIcon name="BookOpen" size={24} />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-[var(--foreground)]">
            No Courses Found
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] max-w-xs">
            There are no learning modules registered in your student profile
            yet. Seed the database to view active courses.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </>
  );
}
