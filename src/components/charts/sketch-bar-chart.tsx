"use client";

import { useRef, useState } from "react";
import type { ChartBarKind, ProfileChartBar } from "@/lib/data/profile-mock-data";

type LabelMode = "default" | "compact" | "monthly" | "angled";

interface SketchBarChartProps {
  data: ProfileChartBar[];
  yMax: number;
  yStep: number;
  labelMode?: LabelMode;
}

interface TooltipState {
  value: number;
  label: string;
  x: number;
  y: number;
}

const BAR_COLORS = {
  front: "#2563EB",
  top: "#60A5FA",
  side: "#1D4ED8",
  hover: "#1E40AF",
};

const DEPTH_X = 5;
const DEPTH_Y = 4;

function barWidth(kind: ChartBarKind = "default") {
  if (kind === "total") return 28;
  if (kind === "surplus") return 9;
  return 20;
}

function getPadding(labelMode: LabelMode) {
  if (labelMode === "monthly") {
    return { top: 10, right: 56, bottom: 66, left: 8 };
  }
  if (labelMode === "angled") {
    return { top: 10, right: 44, bottom: 62, left: 8 };
  }
  if (labelMode === "compact") {
    return { top: 10, right: 42, bottom: 50, left: 8 };
  }
  return { top: 10, right: 42, bottom: 44, left: 8 };
}

function Bar3D({
  x,
  baseline,
  height,
  width,
  hovered,
}: {
  x: number;
  baseline: number;
  height: number;
  width: number;
  hovered: boolean;
}) {
  if (height <= 0) return null;

  const top = baseline - height;
  const right = x + width;
  const sideRight = right + DEPTH_X;
  const topEdge = top - DEPTH_Y;
  const baseDepth = baseline - DEPTH_Y;
  const front = hovered ? BAR_COLORS.hover : BAR_COLORS.front;

  return (
    <g>
      <polygon
        points={`${right},${top} ${sideRight},${topEdge} ${sideRight},${baseDepth} ${right},${baseline}`}
        fill={BAR_COLORS.side}
      />
      <polygon
        points={`${x},${top} ${x + DEPTH_X},${topEdge} ${sideRight},${topEdge} ${right},${top}`}
        fill={BAR_COLORS.top}
      />
      <rect x={x} y={top} width={width} height={height} fill={front} />
    </g>
  );
}

function splitLabel(label: string) {
  return label.split("\n");
}

function formatTooltipLabel(label: string) {
  return label.replace(/\n/g, " ").trim();
}

export function SketchBarChart({
  data,
  yMax,
  yStep,
  labelMode = "default",
}: SketchBarChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const width = 340;
  const height = labelMode === "monthly" || labelMode === "angled" ? 252 : 238;
  const padding = getPadding(labelMode);
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const baseline = padding.top + plotHeight;
  const ticks = Array.from({ length: Math.floor(yMax / yStep) + 1 }, (_, i) => i * yStep);
  const slotWidth = plotWidth / data.length;

  const showTooltip = (bar: ProfileChartBar, event: React.MouseEvent<SVGRectElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    setTooltip({
      value: bar.value,
      label: formatTooltipLabel(bar.label),
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <div ref={containerRef} className="relative" onMouseLeave={() => {
      setTooltip(null);
      setHoveredIndex(null);
    }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label="نمودار مطالعه"
      >
        {Array.from({ length: Math.floor(plotHeight / 12) + 1 }, (_, i) => {
          const y = padding.top + i * 12;
          return (
            <line
              key={`paper-${i}`}
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="#E2E8F0"
              strokeWidth={0.5}
            />
          );
        })}

        {ticks.map((tick) => {
          const y = baseline - (tick / yMax) * plotHeight;
          return (
            <g key={tick}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#CBD5E1"
                strokeWidth={0.75}
              />
              <text
                x={width - padding.right + 8}
                y={y + 3}
                textAnchor="start"
                className="fill-slate-700 text-[11px] font-medium"
              >
                {tick}
              </text>
            </g>
          );
        })}

        <line
          x1={padding.left}
          y1={baseline}
          x2={width - padding.right}
          y2={baseline}
          stroke="#94A3B8"
          strokeWidth={1}
        />

        {data.map((bar, index) => {
          const kind = bar.kind ?? "default";
          const barW = barWidth(kind);
          const slotCenter = padding.left + slotWidth * index + slotWidth / 2;
          const barX = slotCenter - barW / 2;
          const barHeight = Math.max((bar.value / yMax) * plotHeight, kind === "surplus" ? 3 : 0);
          const labelLines = splitLabel(bar.label);
          const isHovered = hoveredIndex === index;
          const labelY =
            baseline +
            (labelMode === "monthly" ? 10 : labelMode === "compact" ? 14 : labelMode === "angled" ? 12 : 12);

          return (
            <g key={`${bar.label}-${index}`}>
              <Bar3D
                x={barX}
                baseline={baseline}
                height={barHeight}
                width={barW}
                hovered={isHovered}
              />
              <rect
                x={barX - 2}
                y={baseline - barHeight - DEPTH_Y}
                width={barW + DEPTH_X + 4}
                height={barHeight + DEPTH_Y + 4}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={(event) => {
                  setHoveredIndex(index);
                  showTooltip(bar, event);
                }}
                onMouseMove={(event) => {
                  setHoveredIndex(index);
                  showTooltip(bar, event);
                }}
              />
              {bar.label ? (
                <text
                  x={slotCenter}
                  y={labelY}
                  textAnchor={labelMode === "monthly" || labelMode === "angled" ? "end" : "middle"}
                  transform={
                    labelMode === "monthly"
                      ? `rotate(-36, ${slotCenter}, ${labelY})`
                      : labelMode === "angled"
                        ? `rotate(-28, ${slotCenter}, ${labelY})`
                        : undefined
                  }
                  className="pointer-events-none fill-slate-700 text-[10.5px] font-medium leading-[1.2]"
                >
                  {labelLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={slotCenter} dy={lineIndex === 0 ? 0 : 9}>
                      {line}
                    </tspan>
                  ))}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>

      {tooltip ? (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white shadow-lg"
          style={{ left: tooltip.x, top: tooltip.y - 10 }}
        >
          {tooltip.label ? `${tooltip.label}: ` : null}
          {tooltip.value} ساعت
        </div>
      ) : null}
    </div>
  );
}
