import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-primary-container": "#858383",
        "on-primary-fixed": "#1c1b1b",
        "background": "#fbf9f9",
        "on-primary": "#ffffff",
        "primary": "#000000",
        "surface-bright": "#fbf9f9",
        "on-surface-variant": "#444748",
        "secondary-fixed-dim": "#e9c176",
        "surface-container-low": "#f5f3f3",
        "surface-container-highest": "#e3e2e2",
        "on-tertiary-fixed-variant": "#454747",
        "surface": "#fbf9f9",
        "on-tertiary": "#ffffff",
        "on-error-container": "#93000a",
        "surface-tint": "#5f5e5e",
        "surface-container-lowest": "#ffffff",
        "primary-container": "#1c1b1b",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-tertiary-container": "#838484",
        "tertiary-container": "#1a1c1c",
        "on-surface": "#1b1c1c",
        "error": "#ba1a1a",
        "surface-container": "#efeded",
        "on-secondary": "#ffffff",
        "on-primary-fixed-variant": "#474746",
        "on-secondary-fixed-variant": "#5d4201",
        "tertiary": "#000000",
        "primary-fixed-dim": "#c8c6c5",
        "outline-variant": "#c4c7c7",
        "tertiary-fixed-dim": "#c6c6c7",
        "primary-fixed": "#e5e2e1",
        "inverse-primary": "#c8c6c5",
        "inverse-surface": "#303031",
        "secondary-container": "#fed488",
        "surface-dim": "#dbdad9",
        "outline": "#747878",
        "tertiary-fixed": "#e2e2e2",
        "surface-variant": "#e3e2e2",
        "on-secondary-container": "#785a1a",
        "secondary": "#775a19",
        "secondary-fixed": "#ffdea5",
        "on-background": "#1b1c1c",
        "surface-container-high": "#e9e8e7",
        "on-tertiary-fixed": "#1a1c1c",
        "on-secondary-fixed": "#261900",
        "inverse-on-surface": "#f2f0f0"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "margin-mobile": "20px",
        "xs": "8px",
        "lg": "40px",
        "gutter": "16px",
        "md": "24px",
        "base": "4px",
        "xl": "64px",
        "sm": "16px"
      },
      fontFamily: {
        "body-lg": ["Inter"],
        "label-caps": ["Inter"],
        "headline-md": ["Inter"],
        "body-md": ["Inter"],
        "headline-lg": ["Inter"],
        "headline-sm": ["Inter"]
      },
      fontSize: {
        "body-lg": ["16px", { "lineHeight": "1.6", "letterSpacing": "0", "fontWeight": "400" }],
        "label-caps": ["12px", { "lineHeight": "1", "letterSpacing": "0.1em", "fontWeight": "600" }],
        "headline-md": ["24px", { "lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "400" }],
        "body-md": ["14px", { "lineHeight": "1.5", "letterSpacing": "0", "fontWeight": "400" }],
        "headline-lg": ["32px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "300" }],
        "headline-sm": ["20px", { "lineHeight": "1.4", "letterSpacing": "0", "fontWeight": "500" }]
      }

    },
  },
  plugins: [],
};
export default config;
