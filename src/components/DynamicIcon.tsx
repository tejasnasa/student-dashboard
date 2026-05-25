import {
  Atom,
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code,
  Database,
  Flame,
  Globe,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Sparkles,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import React from "react";

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const iconMap: Record<string, React.ComponentType<any>> = {
  Atom,
  Globe,
  Sparkles,
  Database,
  BookOpen,
  Code,
  LayoutDashboard,
  GraduationCap,
  BarChart3,
  Settings,
  User,
  Flame,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award,
  Calendar,
  LogOut,
  Menu,
  X,
  Clock,
  CheckCircle2,
};

export default function DynamicIcon({
  name,
  className = "",
  size,
}: DynamicIconProps) {
  const IconComponent = iconMap[name] || BookOpen;
  return <IconComponent className={className} size={size} />;
}
