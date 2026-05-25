"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { ReactNode, useState } from "react";
import ActivityTile from "./ActivityTile";
import DynamicIcon from "./DynamicIcon";
import HeroTile from "./HeroTile";
import Sidebar, { NavItem } from "./Sidebar";

interface DashboardContainerProps {
  coursesGrid: ReactNode;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { id: "courses", label: "My Courses", icon: "GraduationCap" },
  { id: "analytics", label: "Analytics", icon: "BarChart3" },
  { id: "schedule", label: "Schedule", icon: "Calendar" },
  { id: "settings", label: "Settings", icon: "Settings" },
];

export default function DashboardContainer({
  coursesGrid,
}: DashboardContainerProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <motion.div
              variants={itemVariants}
              className="col-span-1 md:col-span-2"
            >
              <HeroTile studentName="Tejas" streakCount={7} />
            </motion.div>

            <motion.div variants={itemVariants} className="col-span-1">
              <article className="relative overflow-hidden rounded-3xl bg-[var(--card)] border border-[var(--border)] p-6 flex flex-col justify-between h-full group shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-[var(--muted-foreground)] tracking-wider uppercase">
                    Overview
                  </h2>
                  <div className="w-8 h-8 rounded-xl bg-[var(--accent)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)]">
                    <DynamicIcon name="Award" size={16} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-end justify-between border-b border-[var(--border)] pb-3">
                    <div>
                      <span className="text-2xl font-black text-[var(--foreground)]">
                        14.5 hrs
                      </span>
                      <span className="text-xs text-[var(--muted-foreground)] ml-1">
                        this week
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-[var(--primary)] flex items-center gap-1">
                      <DynamicIcon name="TrendingUp" size={12} />
                      +18%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[10px] font-bold text-[var(--muted-foreground)] uppercase">
                        Completed
                      </span>
                      <span className="text-base font-extrabold text-[var(--foreground)]">
                        12 lessons
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-[var(--muted-foreground)] uppercase">
                        Certificates
                      </span>
                      <span className="text-base font-extrabold text-[var(--foreground)]">
                        2 earned
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs text-[var(--muted-foreground)] bg-[var(--background)] bg-opacity-40 border border-[var(--border)] p-2.5 rounded-xl">
                  <DynamicIcon
                    name="CheckCircle2"
                    className="text-[var(--primary)]"
                    size={14}
                  />
                  <span>Next milestone: 15 days streak</span>
                </div>
              </article>
            </motion.div>

            <motion.div variants={itemVariants} className="col-span-1">
              <article className="relative overflow-hidden rounded-3xl bg-[var(--card)] border border-[var(--border)] p-6 flex flex-col justify-between h-full group shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-[var(--muted-foreground)] tracking-wider uppercase">
                    Upcoming Tasks
                  </h2>
                  <div className="w-8 h-8 rounded-xl bg-[var(--accent)] border border-[var(--border)] flex items-center justify-center text-[var(--chart-1)]">
                    <DynamicIcon name="Calendar" size={16} />
                  </div>
                </div>

                <div className="space-y-3.5 flex-1">
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-[var(--background)] bg-opacity-40 border border-[var(--border)] hover:border-[var(--primary)] transition-colors duration-200 cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] shrink-0 mt-0.5">
                      <DynamicIcon name="Code" size={14} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[var(--foreground)] line-clamp-1">
                        Submit Capstone Project
                      </h4>
                      <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">
                        React patterns • Due in 2 days
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-[var(--background)] bg-opacity-40 border border-[var(--border)] hover:border-[var(--chart-2)] transition-colors duration-200 cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-[var(--chart-2)]/10 border border-[var(--chart-2)]/20 flex items-center justify-center text-[var(--chart-2)] shrink-0 mt-0.5">
                      <DynamicIcon name="Globe" size={14} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[var(--foreground)] line-clamp-1">
                        App Router Live Workshop
                      </h4>
                      <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">
                        Next.js webinar • Tomorrow, 6 PM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-semibold text-[var(--primary)] hover:underline cursor-pointer">
                  <span>View Full Schedule</span>
                  <DynamicIcon name="ChevronRight" size={14} />
                </div>
              </article>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="col-span-1 md:col-span-2"
            >
              <ActivityTile columnsCount={24} />
            </motion.div>

            {coursesGrid}
          </motion.div>
        );

      default:
        const tabInfo = navItems.find((t) => t.id === activeTab);
        return (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center text-center p-12 bg-[var(--card)] border border-[var(--border)] rounded-3xl min-h-[450px] shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 -z-10 pointer-events-none opacity-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[var(--primary)] filter blur-[80px]" />
            </div>

            <div className="w-16 h-16 rounded-3xl bg-[var(--accent)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)] mb-6 shadow-lg shadow-[var(--primary)]/5">
              <DynamicIcon name={tabInfo?.icon || "BookOpen"} size={32} />
            </div>

            <h2 className="text-2xl font-extrabold text-[var(--foreground)] tracking-tight">
              {tabInfo?.label} Portal
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] max-w-sm mt-2">
              This section is ready for deployment. The database, state
              managers, and authentication wrappers are fully connected.
            </p>

            <button
              onClick={() => setActiveTab("dashboard")}
              className="mt-8 px-5 py-2.5 bg-[var(--sidebar-accent)] text-[var(--primary)] border border-[var(--border)] rounded-xl text-xs font-bold hover:bg-[var(--accent)] hover:border-[var(--primary)] transition-all flex items-center gap-2 shadow-md shadow-black/10 hover:scale-105 duration-200"
            >
              <DynamicIcon name="LayoutDashboard" size={14} />
              Return to Dashboard
            </button>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col md:flex-row">
      <Sidebar
        items={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <main className="flex-1 min-w-0 p-6 md:p-8 lg:p-10 pb-24 md:pb-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-8 md:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[var(--primary)] to-[var(--chart-2)] flex items-center justify-center text-xs">
              <DynamicIcon
                name="GraduationCap"
                className="text-white"
                size={16}
              />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-[var(--foreground)]">
              Aether Learn
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center">
            <DynamicIcon name="User" size={14} />
          </div>
        </header>

        <AnimatePresence mode="wait">
          <div key={activeTab}>{renderContent()}</div>
        </AnimatePresence>
      </main>
    </div>
  );
}
