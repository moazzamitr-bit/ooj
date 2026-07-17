"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import type { ChartBarKind, ProfileChartBar } from "@/lib/data/profile-mock-data";
import { toPersianDigits } from "@/lib/utils/persian";

type LabelMode = "default" | "compact" | "monthly" | "angled" | "grade";

interface SketchBarChartProps {
  data: ProfileChartBar[];
  yMax: number;
  yStep: number;
  labelMode?: LabelMode;
  valueUnit?: string;
  persianYAxis?: boolean;
  /** When set, only this many bars fit in view; the rest scroll horizontally. */
  visibleBars?: number;
  showScrollControls?: boolean;
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
const SCROLL_SLOT_WIDTH = 38;

function barWidth(kind: ChartBarKind = "default", dataLength = 0, scrollable = false) {
  if (kind === "total") return 12;
  if (kind === "surplus") return 9;
  if (kind === "grade") return 10;
  if (scrollable) return 20;
  if (dataLength >= 13) return 14;
  return 20;
}

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
  if (labelMode === "grade") {
    return { top: 6, right: 8, bottom: 54, left: 28 };
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

function formatTooltipLabel(label: string, group?: string) {
  const clean = label.replace(/\n/g, " ").trim();
  if (group && clean) return `${group} پایه ${clean}`;
  if (group) return group;
  return clean;
}

function buildSlotCenters(
  data: ProfileChartBar[],
  paddingLeft: number,
  plotWidth: number,
  scrollable: boolean
) {
  if (scrollable) {
    return data.map((_, index) => paddingLeft + SCROLL_SLOT_WIDTH * index + SCROLL_SLOT_WIDTH / 2);
  }

  const hasGroups = data.some((bar) => bar.group);
  if (!hasGroups) {
    const slotWidth = plotWidth / data.length;
    return data.map((_, index) => paddingLeft + slotWidth * index + slotWidth / 2);
  }

  const groups: { name: string; indices: number[] }[] = [];
  data.forEach((bar, index) => {
    const name = bar.group ?? bar.label;
    const last = groups[groups.length - 1];
    if (last && last.name === name) {
      last.indices.push(index);
    } else {
      groups.push({ name, indices: [index] });
    }
  });

  const groupGap = 14;
  const totalGaps = Math.max(0, groups.length - 1) * groupGap;
  const totalBars = data.length;
  const usable = Math.max(plotWidth - totalGaps, totalBars * 12);
  const unit = usable / totalBars;

  const centers: number[] = new Array(data.length);
  let cursor = paddingLeft;

  groups.forEach((group, groupIndex) => {
    group.indices.forEach((barIndex) => {
      centers[barIndex] = cursor + unit / 2;
      cursor += unit;
    });
    if (groupIndex < groups.length - 1) cursor += groupGap;
  });

  return centers;
}

function getGroupRanges(data: ProfileChartBar[], centers: number[]) {
  const ranges: { name: string; start: number; end: number; firstIndex: number }[] = [];
  data.forEach((bar, index) => {
    if (!bar.group) return;
    const last = ranges[ranges.length - 1];
    if (last && last.name === bar.group) {
      last.end = centers[index];
    } else {
      ranges.push({
        name: bar.group,
        start: centers[index],
        end: centers[index],
        firstIndex: index,
      });
    }
  });
  return ranges;
}

export function SketchBarChart({
  data,
  yMax,
  yStep,
  labelMode = "default",
  valueUnit = "ساعت",
  persianYAxis = false,
  visibleBars,
  showScrollControls = false,
}: SketchBarChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollState, setScrollState] = useState({
    canGoBack: false,
    canGoForward: true,
    startIndex: 0,
  });

  const scrollable =
    typeof visibleBars === "number" && visibleBars > 0 && data.length > visibleBars;
  const padding = getPadding(labelMode);
  const width = scrollable
    ? padding.left + padding.right + data.length * SCROLL_SLOT_WIDTH + DEPTH_X
    : data.length >= 15
      ? 440
      : data.length >= 12
        ? 400
        : data.length >= 10
          ? 380
          : 356;
  const baseHeight = labelMode === "monthly" || labelMode === "angled" || labelMode === "grade" ? 236 : 222;
  const height = Math.round(baseHeight * HEIGHT_SCALE);
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const baseline = padding.top + plotHeight;
  const ticks = Array.from({ length: Math.floor(yMax / yStep) + 1 }, (_, i) => i * yStep);
  const centers = buildSlotCenters(data, padding.left, plotWidth, scrollable);
  const groupRanges = labelMode === "grade" ? getGroupRanges(data, centers) : [];

  const updateScrollState = () => {
    const viewport = scrollViewportRef.current;
    if (!viewport || !visibleBars) return;

    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const ratio = maxScroll > 0 ? viewport.scrollLeft / maxScroll : 0;
    const hiddenBars = Math.max(0, data.length - visibleBars);
    setScrollState({
      canGoBack: viewport.scrollLeft > 2,
      canGoForward: viewport.scrollLeft < maxScroll - 2,
      startIndex: Math.round(ratio * hiddenBars),
    });
  };

  useEffect(() => {
    if (!scrollable) return;
    const frame = requestAnimationFrame(updateScrollState);
    window.addEventListener("resize", updateScrollState);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [scrollable, data.length, visibleBars]);

  const scrollChart = (direction: "back" | "forward") => {
    const viewport = scrollViewportRef.current;
    if (!viewport) return;
    viewport.scrollBy({
      left: direction === "forward" ? viewport.clientWidth * 0.72 : -viewport.clientWidth * 0.72,
      behavior: "smooth",
    });
  };

  const showTooltip = (bar: ProfileChartBar, event: React.MouseEvent<SVGRectElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    setTooltip({
      value: bar.value,
      label: formatTooltipLabel(bar.label, bar.group),
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
          const slotCenter = centers[index];
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
                  : labelMode === "grade"
                    ? 14
                    : 14);

          return (
            <g key={`${bar.group ?? ""}-${bar.label}-${index}`}>
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

        {groupRanges.map((group) => {
          const mid = (group.start + group.end) / 2;
          return (
            <text
              key={`group-${group.name}-${group.firstIndex}`}
              x={mid}
              y={baseline + 36}
              textAnchor="middle"
              className="pointer-events-none fill-slate-800 text-[10px] font-extrabold"
            >
              {group.name}
            </text>
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

  const visibleEnd = Math.min(
    data.length,
    scrollState.startIndex + (visibleBars ?? data.length)
  );

  return (
    <div className="w-full">
      <div
        ref={scrollViewportRef}
        onScroll={updateScrollState}
        className="w-full overflow-x-auto overscroll-x-contain pb-1 [scrollbar-color:#94a3b8_transparent] [scrollbar-width:thin]"
      >
        {chart}
      </div>

      {showScrollControls ? (
        <div className="mx-2 mt-1.5 flex items-center justify-between gap-2 rounded-xl border border-slate-200/80 bg-white/75 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]" dir="rtl">
          <button
            type="button"
            onClick={() => scrollChart("back")}
            disabled={!scrollState.canGoBack}
            className="inline-flex min-h-9 items-center gap-1 rounded-lg px-2.5 text-[11px] font-bold text-slate-700 transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="نمایش هفته‌های قبلی"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            قبلی
          </button>

          <div className="flex min-w-0 flex-col items-center text-center">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500">
              <MoveHorizontal className="h-3.5 w-3.5 text-primary" aria-hidden />
              بازهٔ نمایش
            </span>
            <span className="mt-0.5 text-[11px] font-extrabold tabular-nums text-slate-800">
              هفته‌های {toPersianDigits(scrollState.startIndex + 1)} تا{" "}
              {toPersianDigits(visibleEnd)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => scrollChart("forward")}
            disabled={!scrollState.canGoForward}
            className="inline-flex min-h-9 items-center gap-1 rounded-lg px-2.5 text-[11px] font-bold text-slate-700 transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="نمایش هفته‌های بعدی"
          >
            بعدی
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      ) : null}
    </div>
  );
}
