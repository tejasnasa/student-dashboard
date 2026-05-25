import CoursesGrid from "@/components/CoursesGrid";
import CoursesSkeleton from "@/components/CoursesSkeleton";
import DashboardContainer from "@/components/DashboardContainer";
import { Suspense } from "react";

export const revalidate = 0;

export default function Home() {
  return (
    <DashboardContainer
      coursesGrid={
        <Suspense fallback={<CoursesSkeleton />}>
          <CoursesGrid />
        </Suspense>
      }
    />
  );
}
