"use client";

import React, { useEffect, useState, type FC } from "react";

interface FolderProps {
  color?: string;
  size?: number;
  items?: React.ReactNode[];
  className?: string;
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (color.length !== 6) return hex.toUpperCase();

  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;

  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));

  const rr = r.toString(16).padStart(2, "0");
  const gg = g.toString(16).padStart(2, "0");
  const bb = b.toString(16).padStart(2, "0");

  return `#${rr}${gg}${bb}`.toUpperCase();
};

export const Folder: FC<FolderProps> = ({
  color = "#ff2626",
  size = 1,
  items = [],
  className = "",
}) => {
  const maxItems = 3;
  const papers = Array(maxItems)
    .fill(null)
    .map((_, i) => items[i] || null);

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );

  const folderBackColor = darkenColor(color, 0.08);
  const paper1Color = darkenColor("#FFFFFF", 0.12);
  const paper2Color = darkenColor("#FFFFFF", 0.06);
  const paper3Color = "#FFFFFF";

  const resetOffsets = () =>
    setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));

  const handleClick = () => {
    setOpen((prev) => {
      if (prev) {
        resetOffsets();
      }
      return !prev;
    });
  };

  const handlePaperMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.1;
    const offsetY = (e.clientY - centerY) * 0.1;
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (
    _e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  useEffect(() => resetOffsets(), [open]);

  const folderBaseStyle: React.CSSProperties = {
    transform: `scale(${size})`,
    transformOrigin: "center center",
    display: "inline-block",
  };

  const folderInteractiveStyle: React.CSSProperties = {
    transform: open ? "translateY(-10px)" : undefined,
  };

  const getOpenTransform = (index: number) => {
    const baseTransforms = [
      "translate(-110%, -80%) rotate(-12deg)",
      "translate(15%, -80%) rotate(12deg)",
      "translate(-40%, -120%) rotate(4deg)",
    ];
    const mouseTransform = `translate(${paperOffsets[index].x}px, ${paperOffsets[index].y}px)`;
    return `${baseTransforms[index] || ""} ${mouseTransform}`;
  };

  return (
    <div style={folderBaseStyle} className={className}>
      <div
        className="group relative cursor-pointer transition-all duration-300 ease-out"
        style={folderInteractiveStyle}
        onClick={handleClick}
      >
        <div
          className="relative h-[80px] w-[100px] rounded-bl-[10px] rounded-br-[10px] rounded-tr-[10px] shadow-lg"
          style={{ backgroundColor: folderBackColor }}
        >
          <span
            className="absolute bottom-[99%] left-0 h-[10px] w-[36px] rounded-tl-[6px] rounded-tr-[6px]"
            style={{ backgroundColor: folderBackColor }}
          />
          {papers.map((itemContent, i) => {
            let sizeClasses = "";
            if (i === 0) sizeClasses = open ? "w-[75%] h-[85%]" : "w-[70%] h-[80%]";
            else if (i === 1)
              sizeClasses = open ? "w-[85%] h-[75%]" : "w-[80%] h-[70%]";
            else if (i === 2)
              sizeClasses = open ? "w-[95%] h-[65%]" : "w-[90%] h-[60%]";

            const paperBaseTransform = !open ? "translate(-50%, 10%)" : "";
            const paperHoverTransform = !open ? "group-hover:translate-y-0" : "hover:scale-105";

            const palette = [paper1Color, paper2Color, paper3Color];
            const backgroundColor = palette[i] || paper3Color;

            return (
              <div
                key={`paper-${i}`}
                onMouseMove={(e) => handlePaperMouseMove(e, i)}
                onMouseLeave={(e) => handlePaperMouseLeave(e, i)}
                className={`absolute left-1/2 bottom-[12%] flex items-center justify-center overflow-hidden rounded-md border border-black/5 shadow-lg transition-all duration-300 ease-out ${paperHoverTransform} ${sizeClasses}`}
                style={{
                  backgroundColor,
                  transform: open ? getOpenTransform(i) : paperBaseTransform,
                }}
              >
                <div className="pointer-events-none flex items-center justify-center text-xs font-semibold uppercase tracking-[0.35em] text-black/60">
                  {itemContent}
                </div>
              </div>
            );
          })}
          <div
            className="absolute z-[40] h-full w-full origin-bottom rounded-br-[10px] rounded-bl-[10px] rounded-tr-[10px] transition-all duration-300 ease-out"
            style={{
              backgroundColor: color,
              transform: open ? "translateY(20%) skewX(25deg) scaleY(0.55)" : "skewX(0deg) scaleY(1)",
            }}
          />
          <div
            className="absolute z-[41] h-full w-full origin-bottom rounded-br-[10px] rounded-bl-[10px] rounded-tr-[10px] transition-all duration-300 ease-out"
            style={{
              backgroundColor: color,
              transform: open ? "translateY(20%) skewX(-25deg) scaleY(0.55)" : "skewX(0deg) scaleY(1)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
