import { cn } from "@/utils/helpers";

export const CircularProgress = ({ value, max = 280 }) => {
  const strokeWidth = 3; // Adjusted stroke width
  const radius = 12; // Adjusted radius to fit within 30x30 with the stroke
  const svgSize = 2 * (radius + strokeWidth); // Overall SVG size to accommodate circle and stroke
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    value > max ? 0 : circumference - (value / max) * circumference;

  return (
    <div className="flex justify-center items-center">
      <svg width={svgSize} height={svgSize} className={""}>
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          fill="none"
          stroke="#d2d3d4"
          className={cn(
            { "stroke-color-bg-3": value < max + 10 },
            { "stroke-color-bg": value >= max + 10 }
          )}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          fill="none"
          className={cn(
            { "stroke-color-accent-hover": value < max - 20 },
            { "stroke-amber-400": value >= max - 20 && value < max },
            { "stroke-red-600": value >= max && value < max + 10 },
            { "stroke-color-border": value > max + 10 }
          )}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${radius + strokeWidth} ${
            radius + strokeWidth
          })`}
        />
      </svg>

      {value >= max - 20 && (
        <div
          className={cn(
            "absolute text-xs",
            { "text-red-600": value >= max },
            { "text-color-text-dimmed": value < max && value >= max - 20 }
          )}
        >
          {`${280 - value}`}
        </div>
      )}
    </div>
  );
};
