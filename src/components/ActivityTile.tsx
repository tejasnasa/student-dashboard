"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import DynamicIcon from "./DynamicIcon";

interface ActivityTileProps {
  columnsCount?: number;
}

interface HoveredCellState {
  minutes: number;
  day: string;
  x: number;
  y: number;
}

export default function ActivityTile({ columnsCount = 20 }: ActivityTileProps) {
  const [hoveredCell, setHoveredCell] = useState<HoveredCellState | null>(null);

  const contributions = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const data = [];

    for (let row = 0; row < 7; row++) {
      const rowData = [];
      for (let col = 0; col < columnsCount; col++) {
        const rand = Math.random();
        let level = 0;
        if (rand > 0.85) level = 4;
        else if (rand > 0.65) level = 3;
        else if (rand > 0.45) level = 2;
        else if (rand > 0.2) level = 1;

        if ((row === 0 || row === 6) && Math.random() > 0.4) {
          level = Math.max(0, level - 2);
        }

        const minutes =
          level === 0 ? 0 : Math.round(level * 30 + Math.random() * 25);

        rowData.push({
          level,
          minutes,
          day: days[row],
          week: col,
        });
      }
      data.push(rowData);
    }
    return data;
  }, [columnsCount]);

  const getBlockColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-[var(--accent)] opacity-30";
      case 1:
        return "bg-[var(--chart-5)] opacity-60";
      case 2:
        return "bg-[var(--chart-4)] opacity-80";
      case 3:
        return "bg-[var(--chart-3)]";
      case 4:
        return "bg-[var(--primary)]";
      default:
        return "bg-[var(--accent)]";
    }
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    block: any,
  ) => {
    const blockElement = e.currentTarget;
    const blockRect = blockElement.getBoundingClientRect();
    const article = blockElement.closest("article");

    if (article) {
      const articleRect = article.getBoundingClientRect();
      const x = blockRect.left + blockRect.width / 2 - articleRect.left;
      const y = blockRect.top - articleRect.top;

      setHoveredCell({
        minutes: block.minutes,
        day: block.day,
        x,
        y,
      });
    }
  };

  return (
    <article className="relative rounded-3xl bg-[var(--card)] border border-[var(--border)] p-6 flex flex-col justify-between h-full shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
            <DynamicIcon
              name="TrendingUp"
              className="text-[var(--primary)]"
              size={18}
            />
            Learning Activity
          </h2>
          <p className="text-xs text-[var(--muted-foreground)]">
            Daily study patterns and contribution mapping
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--primary)] bg-[var(--primary)]/5 border border-[var(--primary)]/10 px-2.5 py-1 rounded-lg">
          <DynamicIcon name="Clock" size={12} />
          <span>8.4 hrs/week avg</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center my-2 overflow-x-auto scrollbar-none">
        <div className="min-w-[340px] flex gap-2 items-start">
          <div className="flex flex-col gap-1.5 text-[10px] font-bold text-[var(--muted-foreground)] w-7 select-none shrink-0 pt-[2px]">
            <div className="h-3.5 flex items-center"></div>
            <div className="h-3.5 flex items-center">Mon</div>
            <div className="h-3.5 flex items-center"></div>
            <div className="h-3.5 flex items-center">Wed</div>
            <div className="h-3.5 flex items-center"></div>
            <div className="h-3.5 flex items-center">Fri</div>
            <div className="h-3.5 flex items-center"></div>
          </div>

          <div className="flex-1 flex flex-col gap-1.5">
            {contributions.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1.5">
                {row.map((block, colIndex) => (
                  <motion.div
                    key={`${rowIndex}-${colIndex}`}
                    whileHover={{ scale: 1.25, zIndex: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    onMouseEnter={(e) => handleMouseEnter(e, block)}
                    onMouseLeave={() => setHoveredCell(null)}
                    className={`w-3.5 h-3.5 rounded-[3px] ${getBlockColor(block.level)} cursor-pointer transition-colors relative`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-4 text-xs">
        <span className="text-[var(--muted-foreground)] font-medium">
          72 active days this term
        </span>

        <div className="flex items-center gap-1.5 select-none">
          <span className="text-[var(--muted-foreground)] text-[10px]">
            Less
          </span>
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[var(--accent)] opacity-30" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[var(--chart-5)] opacity-60" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[var(--chart-4)] opacity-80" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[var(--chart-3)]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[var(--primary)]" />
          <span className="text-[var(--muted-foreground)] text-[10px]">
            More
          </span>
        </div>
      </div>

      <AnimatePresence>
        {hoveredCell && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 2, scale: 0.95, x: "-50%" }}
            transition={{ duration: 0.1 }}
            className="absolute z-50 pointer-events-none"
            style={{
              left: hoveredCell.x,
              top: hoveredCell.y - 34,
            }}
          >
            <div className="bg-[var(--popover)] border border-[var(--border)] text-[var(--popover-foreground)] text-[10px] font-bold rounded-lg px-2.5 py-1.5 shadow-2xl whitespace-nowrap">
              {hoveredCell.minutes > 0
                ? `${hoveredCell.minutes} mins studied`
                : "No study records"}
              <span className="text-[var(--muted-foreground)] ml-1">
                on {hoveredCell.day}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
