import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="konektGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ED7354" />
              <stop offset="50%" stopColor="#315771" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
          </defs>
          <circle
            cx="16"
            cy="16"
            r="11"
            fill="none"
            stroke="url(#konektGrad)"
            strokeWidth="6"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
