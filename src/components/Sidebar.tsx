"use client";

import { motion } from "framer-motion";
import DynamicIcon from "./DynamicIcon";

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  items: NavItem[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({
  items,
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  return (
    <>
      <aside
        className={`hidden md:flex flex-col bg-[var(--sidebar)] border-r border-[var(--sidebar-border)] text-[var(--sidebar-foreground)] transition-all duration-300 relative h-screen sticky top-0 z-30 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between p-5 h-20 border-b border-[var(--sidebar-border)]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--primary)] to-[var(--chart-2)] flex items-center justify-center shrink-0 shadow-lg shadow-[var(--primary)]/10">
              <DynamicIcon
                name="GraduationCap"
                className="text-[var(--sidebar-primary-foreground)]"
                size={22}
              />
            </div>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="font-bold text-lg tracking-tight bg-gradient-to-r from-[var(--foreground)] to-[var(--muted-foreground)] bg-clip-text text-transparent whitespace-nowrap"
              >
                Aether Learn
              </motion.span>
            )}
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {items.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-colors relative group ${
                  isActive
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-highlight"
                    className="absolute inset-0 bg-[var(--sidebar-accent)] rounded-xl border-l-2 border-[var(--sidebar-primary)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <div
                  className={`relative z-10 shrink-0 ${isActive ? "text-[var(--sidebar-primary)]" : "group-hover:scale-105 transition-transform"}`}
                >
                  <DynamicIcon name={item.icon} size={20} />
                </div>

                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10 whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Toggle Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-[var(--card)] border border-[var(--sidebar-border)] text-[var(--foreground)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-[var(--primary)] transition-colors shadow-md z-40 hidden lg:flex"
        >
          <DynamicIcon
            name={isCollapsed ? "ChevronRight" : "ChevronLeft"}
            size={14}
          />
        </button>

        <div className="p-4 border-t border-[var(--sidebar-border)]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-[var(--accent)] border border-[var(--sidebar-border)] flex items-center justify-center shrink-0">
              <DynamicIcon
                name="User"
                className="text-[var(--foreground)]"
                size={18}
              />
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col min-w-0"
              >
                <span className="text-sm font-semibold text-[var(--foreground)] truncate">
                  Tejas
                </span>
                <span className="text-xs text-[var(--muted-foreground)] truncate">
                  Student Mode
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[var(--sidebar)] border-t border-[var(--sidebar-border)] flex items-center justify-around px-2 py-1 z-50 shadow-2xl backdrop-blur-md bg-opacity-95">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-2 rounded-xl transition-all relative ${
                isActive
                  ? "text-[var(--sidebar-primary)]"
                  : "text-[var(--muted-foreground)]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-highlight"
                  className="absolute inset-x-3 inset-y-1 bg-[var(--sidebar-accent)] rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <DynamicIcon name={item.icon} size={20} className="mb-0.5" />
              <span className="text-[10px] font-medium tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
