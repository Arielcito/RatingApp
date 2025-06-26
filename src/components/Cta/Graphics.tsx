import React from "react";

const Graphics = () => {
  return (
    <>
      <div className="absolute -top-[250px] right-0 -z-10">
        <svg
          width="610"
          height="1183"
          viewBox="0 0 610 1183"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.2" filter="url(#filter0_f_47_19)">
            <circle
              cx="591.5"
              cy="591.5"
              r="341.5"
              fill="url(#paint0_linear_47_19)"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_47_19"
              x="0"
              y="0"
              width="1183"
              height="1183"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="125"
                result="effect1_foregroundBlur_47_19"
              />
            </filter>
            <linearGradient
              id="paint0_linear_47_19"
              x1="250"
              y1="250"
              x2="1057.46"
              y2="718.481"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF8FE8" />
              <stop offset="1" stopColor="#FFC960" />
            </linearGradient>
          </defs>
        </svg>
      </div>

   
    </>
  );
};

export default Graphics;
