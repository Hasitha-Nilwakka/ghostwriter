import * as React from "react";

export type LoaderVariant =
  | "classic-spinner"
  | "dots-pulse"
  | "pulse-ring"
  | "bars"
  | "square-spin"
  | "double-bounce"
  | "circular-progress"
  | "wave-loader"
  | "skeleton"
  | "glow-pulse"
  | "clock"
  | "hourglass"
  | "gear"
  | "orbit"
  | "snake"
  | "infinity"
  | "text-shimmer"
  | "grid"
  | "heartbeat"
  | "floating-bubble"
  | "matrix"
  | "loader-dna"
  | "hex-spin"
  | "concentric-rings"
  | "dots-rotate"
  | "morphing-hex"
  | "ripple-pulse"
  | "orbiting-spheres"
  | "paired-revolution"
  | "eyes-gaze"
  | "ripple-wave"
  | "audio-wave"
  | "fading-ring"
  | "morphing-shape"
  | "dots-chase"
  | "atom"
  | "solar-system"
  | "radar-sweep"
  | "blocks-wave"
  | "coffee-cup"
  | "progress-slider"
  | "flower-spin"
  | "bouncing-ball"
  | "walking-steps"
  | "corner-chase";

export interface LoaderProps {
  variant: LoaderVariant;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const loaderSnakeKeyframes = `
@keyframes loader-snake {
  0%, 100% { clip-path: inset(0 0 95% 0); }
  25% { clip-path: inset(0 95% 0 0); }
  50% { clip-path: inset(95% 0 0 0); }
  75% { clip-path: inset(0 0 0 95%); }
}
.animate-loader-snake { animation: loader-snake 2s linear infinite; }
`;

const loaderShimmerKeyframes = `
@keyframes loader-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-loader-shimmer { animation: loader-shimmer 2s infinite; }
`;

const loaderPingKeyframes = `
@keyframes loader-ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}
`;

const loaderMorphHexKeyframes = `
@keyframes loader-morph-hex {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(0.875); }
}
`;

const variantKeyframes: Partial<Record<LoaderVariant, string>> = {
  snake: loaderSnakeKeyframes,
  skeleton: loaderShimmerKeyframes,
  infinity: loaderShimmerKeyframes,
  "text-shimmer": loaderShimmerKeyframes,
  matrix: loaderShimmerKeyframes,
  "ripple-pulse": loaderPingKeyframes,
  "morphing-hex": loaderMorphHexKeyframes,
};

export const Loader: React.FC<LoaderProps> = ({
  variant,
  size = "md",
  className = "",
}) => {
  const containerSize = sizeClasses[size] ?? sizeClasses.md;
  const primaryBgClass = "bg-linear-to-r/srgb from-indigo-500 to-teal-400 dark:bg-zinc-50";
  const keyframes = variantKeyframes[variant];

  let content: React.ReactNode = null;

  switch (variant) {
    case "paired-revolution":
      content = (
        <div
          className={`${containerSize} relative flex items-center justify-center ${className}`}
        >
          <style>{`
            @keyframes loader-twin-orbit-rotate {
              100% {
                transform: rotate(360deg) translate(150%);
              }
            }
          `}</style>
          <div
            className={`absolute rounded-full ${primaryBgClass}`}
            style={{
              width: "15px",
              height: "15px",
              zIndex: 10,
            }}
          />
          <div className="absolute w-full h-full">
            {[0, 1].map((i) => (
              <div
                key={i}
                className={`absolute rounded-full ${primaryBgClass}`}
                style={{
                  width: "10px",
                  height: "10px",
                  top: "50%",
                  left: "50%",
                  transform: "rotate(0deg) translate(155%)",
                  animation: "loader-twin-orbit-rotate 1.8s ease infinite",
                  animationDelay: `${i * 0.8}s`,
                  marginTop: "-5px",
                  marginLeft: "-5px",
                }}
              />
            ))}
          </div>
        </div>
      );
      break;
  }

  return (
    <>
      {keyframes ? <style>{keyframes}</style> : null}
      {content}
    </>
  );
};