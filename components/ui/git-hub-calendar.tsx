"use client";

import { useState, useEffect, useRef } from "react";
import { format, subDays, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns";

interface ContributionDay {
  date: string; // ISO date string (e.g., "2025-09-13")
  count: number;
}

interface GitHubCalendarProps {
  data: ContributionDay[]; // Contribution data
  colors?: string[]; // Custom color scale (default: GitHub-like greens)
}

// Internal type for processed data
type ProcessedDay = { date: Date; count: number };

const GitHubCalendar = ({ data, colors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"] }: GitHubCalendarProps) => {
  const [contributions, setContributions] = useState<ProcessedDay[]>([]);
  const today = new Date();
  const startDate = subDays(today, 364); // One year back
  const weeks = 53;
  const daysInWeek = 7;
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [cellSize, setCellSize] = useState<number>(12); // px size per square
  const monthsRef = useRef<HTMLDivElement | null>(null);
  const [labelOffset, setLabelOffset] = useState<number>(20);

  // Process data prop
  useEffect(() => {
    setContributions(
      (data || []).map((item) => ({ date: new Date(item.date), count: item.count }))
    );
  }, [data]);

  // Auto-fit squares to available width
  useEffect(() => {
    if (!gridRef.current) return;
    const gap = 4; // Tailwind gap-1 = 4px
    const ro = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      // Compute size so 53 columns + 52 gaps fit exactly
      const size = Math.floor((width - gap * (weeks - 1)) / weeks);
      // Allow growing to fill available width, but keep a sensible minimum
      setCellSize(Math.max(8, size));
    });
    ro.observe(gridRef.current);
    return () => ro.disconnect();
  }, []);

  // Measure month label row height to align day labels correctly
  useEffect(() => {
    const updateOffset = () => {
      const h = monthsRef.current?.offsetHeight ?? 20;
      setLabelOffset(h);
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  // Get color based on contribution count
  const getColor = (count: number) => {
    if (count === 0) return colors[0];
    if (count === 1) return colors[1];
    if (count === 2) return colors[2];
    if (count === 3) return colors[3];
    return colors[4] || colors[colors.length - 1]; // Fallback to last color
  };

  // Render weeks
  const renderWeeks = () => {
    const weeksArray = [] as any[];
    let currentWeekStart = startOfWeek(startDate, { weekStartsOn: 0 });

    for (let i = 0; i < weeks; i++) {
      const weekDays = eachDayOfInterval({
        start: currentWeekStart,
        end: endOfWeek(currentWeekStart, { weekStartsOn: 0 }),
      });

      weeksArray.push(
        <div key={i} className="flex flex-col gap-1">
          {weekDays.map((day, index) => {
            const contribution = contributions.find((c) => isSameDay(c.date, day));
            const color = contribution ? getColor(contribution.count) : colors[0];

            return (
              <div
                key={index}
                className="rounded-[4px]"
                style={{ backgroundColor: color, width: `${cellSize}px`, height: `${cellSize}px` }}
                title={`${format(day, "PPP")}: ${contribution?.count || 0} contributions`}
              />
            );
          })}
        </div>
      );
      currentWeekStart = addDays(currentWeekStart, 7);
    }

    return weeksArray;
  };

  // Render month labels
  const renderMonthLabels = () => {
    const months = [] as any[];
    let currentMonth = startDate;
    for (let i = 0; i < 12; i++) {
      months.push(
        <span key={i} className="text-xs text-gray-500">
          {format(currentMonth, "MMM")}
        </span>
      );
      currentMonth = addDays(currentMonth, 30);
    }
    return months;
  };

  // Render day labels
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full">
      <div className="flex w-full">
        <div className="flex flex-col justify-between mr-2 min-w-[24px]" style={{ marginTop: labelOffset }}>
          {dayLabels.map((day, index) => (
            <span key={index} className="text-xs text-gray-500 flex items-center" style={{ height: `${cellSize}px` }}>
              {day}
            </span>
          ))}
        </div>
        <div className="flex-1 min-w-0">
          <div ref={monthsRef} className="flex w-full justify-between gap-2 mb-2 px-1">{renderMonthLabels()}</div>
          <div ref={gridRef} className="flex gap-1">{renderWeeks()}</div>
        </div>
      </div>
      <div className="mt-4 justify-center flex gap-2 text-xs items-center">
        <span>Less</span>
        {colors.map((color, index) => (
          <div key={index} className="w-3 h-3 rounded-[4px]" style={{ backgroundColor: color }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

export { GitHubCalendar };
