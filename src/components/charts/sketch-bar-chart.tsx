"use client";

import type { ChartBarKind, ProfileChartBar } from "@/lib/data/profile-mock-data";

interface SketchBarChartProps {
  data: ProfileChartBar[];
  yMax: number;
  yStep: number;
  compactLabels?: boolean;
}

const BAR_COLORS = {
  front: "#2563EB",
  top: "#60A5FA",
  side: "#1D4ED8",
};

const DEPTH_X = 5;
const DEPTH_Y = 4;

function barWidth(kind: ChartBarKind = "default") {
  if (kind === "total") return 28;
  if (kind === "surplus") return 9;
  return 20;
}

function Bar3D({
  x,
  baseline,
  height,
  width,
}: {
  x: number;
  baseline: number;
  height: number;
  width: number;
}) {
  if (height <= 0) return null;

  const top = baseline - height;
  const right = x + width;
  const sideRight = right + DEPTH_X;
  const topEdge = top - DEPTH_Y;
  const baseDepth = baseline - DEPTH_Y;

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
      <rect x={x} y={top} width={width} height={height} fill={BAR_COLORS.front} />
    </g>
  );
}

function splitLabel(label: string) {
  return label.split("\n");
}

export function SketchBarChart({
  data,
  yMax,
  yStep,
  compactLabels = false,
}: SketchBarChartProps) {
  const width = 280;
  const height = 210;
  const padding = { top: 10, right: 34, bottom: compactLabels ? 46 : 38, left: 8 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const baseline = padding.top + plotHeight;
  const ticks = Array.from({ length: Math.floor(yMax / yStep) + 1 }, (_, i) => i * yStep);
  const slotWidth = plotWidth / data.length;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-hidden
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
              x={width - padding.right + 6}
              y={y + 3}
              textAnchor="start"
              className="fill-slate-500 text-[8px]"
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

        return (
          <g key={`${bar.label}-${index}`}>
            <Bar3D x={barX} baseline={baseline} height={barHeight} width={barW} />
            {bar.label ? (
              <text
                x={slotCenter}
                y={baseline + (compactLabels ? 14 : 12)}
                textAnchor="middle"
                className="fill-slate-600 text-[7px] leading-[1.15]"
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
  );
}
