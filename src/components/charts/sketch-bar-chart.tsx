"use client";

import { useRef, useState } from "react";
import type { ChartBarKind, ProfileChartBar } from "@/lib/data/profile-mock-data";
import { toPersianDigits } from "@/lib/utils/persian";

type LabelMode = "default" | "compact" | "monthly" | "angled";

interface SketchBarChartProps {
  data: ProfileChartBar[];
  yMax: number;
  yStep: number;
  labelMode?: LabelMode;
  valueUnit?: string;
  persianYAxis?: boolean;
  /** When set, only this many bars fit in view; the rest scroll horizontally. */
  visibleBars?: number;
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

const DEPTH_X = 7;
const HEIGHT_SCALE = 1.2;

function barWidth(kind: ChartBarKind = "default", dataLength = 0, scrollable = false) {
  if (kind === "total") return 28;
  if (kind === "surplus") return 9;
  if (scrollable) return 20;
  if (dataLength >= 13) return 14;
  return 20;
}

const SCROLL_SLOT_WIDTH = 38;

function getPadding(labelMode: LabelMode) {
  if (labelMode === "monthly") {
    return { top: 6, right: 8, bottom: 44, left: 28 };
  }
  if (labelMode === "angled") {
    return { top: 6, right: 8, bottom: 58, left: 28 };
  }
  if (labelMode === "compact") {
    return { top: 6, right: 8, bottom: 48, left: 28 };
  }
  return { top: 6, right: 8, bottom: 42, left: 28 };
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
  const capital = Math.min(6, Math.max(3, height * 0.08));
  const front = hovered ? BAR_COLORS.hover : BAR_COLORS.front;
  const leftShade = hovered ? "#1E3A8A" : "#1E40AF";
  const capitalFill = hovered ? "#93C5FD" : BAR_COLORS.top;

  return (
    <g>
      {/* soft side depth — flat column, no pointed tip */}
      <polygon
        points={`${right},${top} ${sideRight},${top} ${sideRight},${baseline} ${right},${baseline}`}
        fill={BAR_COLORS.side}
      />
      <polygon
        points={`${x},${top} ${x},${baseline} ${x + 2},${baseline} ${x + 2},${top}`}
        fill={leftShade}
        opacity={0.45}
      />
      <rect x={x} y={top} width={width} height={height} fill={front} rx={1.5} />
      {/* flat capital like a university pillar */}
      <rect x={x - 1.5} y={top} width={width + 3} height={capital} fill={capitalFill} rx={1} />
      <rect
        x={x - 1.5}
        y={baseline - 2.5}
        width={width + 3}
        height={2.5}
        fill={leftShade}
        opacity={0.85}
        rx={0.5}
      />
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
  valueUnit = "ساعت",
  persianYAxis = false,
  visibleBars,
}: SketchBarChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scrollable =
    typeof visibleBars === "number" && visibleBars > 0 && data.length > visibleBars;
  const padding = getPadding(labelMode);
  const width = scrollable
    ? padding.left + padding.right + data.length * SCROLL_SLOT_WIDTH + DEPTH_X
    : data.length >= 13
      ? 440
      : data.length >= 10
        ? 380
        : 356;
  const baseHeight = labelMode === "monthly" || labelMode === "angled" ? 236 : 222;
  const height = Math.round(baseHeight * HEIGHT_SCALE);
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const baseline = padding.top + plotHeight;
  const ticks = Array.from({ length: Math.floor(yMax / yStep) + 1 }, (_, i) => i * yStep);
  const slotWidth = scrollable ? SCROLL_SLOT_WIDTH : plotWidth / data.length;

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

  const chart = (
    <div
      ref={containerRef}
      className="relative"
      style={
        scrollable && visibleBars
          ? {
              width: `${(data.length / visibleBars) * 100}%`,
              minWidth: width,
            }
          : undefined
      }
      onMouseLeave={() => {
        setTooltip(null);
        setHoveredIndex(null);
      }}
    >
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
                x={padding.left - 6}
                y={y + 3}
                textAnchor="end"
                className="fill-slate-700 text-[9px] font-medium"
              >
                {persianYAxis ? toPersianDigits(tick) : tick}
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
          const barW = barWidth(kind, data.length, scrollable);
          const slotCenter = padding.left + slotWidth * index + slotWidth / 2;
          const barX = slotCenter - barW / 2;
          const barHeight = Math.max(
            (bar.value / yMax) * plotHeight,
            bar.value > 0 ? (kind === "surplus" ? 4 : 5) : 0
          );
          const labelLines = splitLabel(bar.label);
          const isHovered = hoveredIndex === index;
          const labelY =
            baseline +
            (labelMode === "monthly"
              ? 15
              : labelMode === "compact"
                ? 16
                : labelMode === "angled"
                  ? 18
                  : 14);

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
                y={baseline - barHeight - 2}
                width={barW + DEPTH_X + 4}
                height={barHeight + 8}
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
                      ? undefined
                      : labelMode === "angled"
                        ? `rotate(-38, ${slotCenter}, ${labelY})`
                        : undefined
                  }
                  className="pointer-events-none fill-slate-700 text-[8.5px] font-medium leading-[1.2]"
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
          {persianYAxis ? toPersianDigits(tooltip.value) : tooltip.value} {valueUnit}
        </div>
      ) : null}
    </div>
  );

  if (!scrollable) return chart;

  return (
    <div className="w-full overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:thin]">
      {chart}
    </div>
  );
}
