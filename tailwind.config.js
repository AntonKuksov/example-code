// tailwind.config.js
const { heroui } = require("@heroui/react");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    // ...
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**"
  ],
  theme: {
    extend: {}
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            default: {
              50: "#f0f7fd",
              100: "#daecfa",
              200: "#c4e0f7",
              300: "#aed5f4",
              400: "#99c9f1",
              500: "#83beee",
              600: "#6c9dc4",
              700: "#557c9b",
              800: "#3e5a71",
              900: "#273947",
              foreground: "#000",
              DEFAULT: "#83beee"
            },
            primary: {
              50: "#fae8f1",
              100: "#f4c7dd",
              200: "#eda6c9",
              300: "#e785b5",
              400: "#e065a1",
              500: "#da448d",
              600: "#b43874",
              700: "#8e2c5c",
              800: "#682043",
              900: "#41142a",
              foreground: "#000",
              DEFAULT: "#da448d"
            },
            secondary: {
              50: "#f9e9e5",
              100: "#f1cac1",
              200: "#e8ab9d",
              300: "#e08c79",
              400: "#d76d55",
              500: "#cf4e31",
              600: "#ab4028",
              700: "#873320",
              800: "#622517",
              900: "#3e170f",
              foreground: "#000",
              DEFAULT: "#cf4e31"
            },
            success: {
              50: "#e4f7ec",
              100: "#beebd2",
              200: "#98dfb7",
              300: "#73d39d",
              400: "#4dc882",
              500: "#27bc68",
              600: "#209b56",
              700: "#197a44",
              800: "#135931",
              900: "#0c381f",
              foreground: "#000",
              DEFAULT: "#27bc68"
            },
            warning: {
              50: "#fcf6e3",
              100: "#f7e9bc",
              200: "#f3dd96",
              300: "#eed06f",
              400: "#eac448",
              500: "#e5b721",
              600: "#bd971b",
              700: "#957715",
              800: "#6d5710",
              900: "#45370a",
              foreground: "#000",
              DEFAULT: "#e5b721"
            },
            danger: {
              50: "#f8e6e8",
              100: "#efc4c8",
              200: "#e6a1a8",
              300: "#dd7f88",
              400: "#d35c68",
              500: "#ca3a48",
              600: "#a7303b",
              700: "#83262f",
              800: "#601c22",
              900: "#3d1116",
              foreground: "#fff",
              DEFAULT: "#ca3a48"
            },
            background: "#f6f7fa",
            foreground: {
              50: "#e0e3e7",
              100: "#b4bcc5",
              200: "#8995a3",
              300: "#5d6e81",
              400: "#32475f",
              500: "#06203d",
              600: "#051a32",
              700: "#041528",
              800: "#030f1d",
              900: "#020a12",
              foreground: "#fff",
              DEFAULT: "#06203d"
            },
            content1: {
              DEFAULT: "#fefeff",
              foreground: "#000"
            },
            content2: {
              DEFAULT: "#f6f7fa",
              foreground: "#000"
            },
            content3: {
              DEFAULT: "#e7ebf6",
              foreground: "#000"
            },
            content4: {
              DEFAULT: "#d3d8e8",
              foreground: "#000"
            },
            focus: "#142335",
            overlay: "#07111e",
            divider: "#c4e0f7"
          }
        },
        dark: {
          colors: {
            default: {
              50: "#091f31",
              100: "#0e314d",
              200: "#13436a",
              300: "#185586",
              400: "#1d67a3",
              500: "#4582b3",
              600: "#6c9cc3",
              700: "#94b7d3",
              800: "#bbd1e3",
              900: "#e3ecf4",
              foreground: "#fff",
              DEFAULT: "#1d67a3"
            },
            primary: {
              50: "#44122a",
              100: "#6b1c42",
              200: "#92265a",
              300: "#ba3173",
              400: "#e13b8b",
              500: "#e65d9f",
              600: "#ec80b4",
              700: "#f1a2c8",
              800: "#f6c4dc",
              900: "#fbe7f1",
              foreground: "#000",
              DEFAULT: "#e13b8b"
            },
            secondary: {
              50: "#3f1910",
              100: "#64271a",
              200: "#893523",
              300: "#ad442d",
              400: "#d25236",
              500: "#da7059",
              600: "#e28f7c",
              700: "#eaada0",
              800: "#f2cbc3",
              900: "#f9e9e6",
              foreground: "#000",
              DEFAULT: "#d25236"
            },
            success: {
              50: "#052d17",
              100: "#084724",
              200: "#0b6131",
              300: "#0e7b3e",
              400: "#11954b",
              500: "#3ba86b",
              600: "#64ba8a",
              700: "#8ecdaa",
              800: "#b8dfc9",
              900: "#e1f2e9",
              foreground: "#000",
              DEFAULT: "#11954b"
            },
            warning: {
              50: "#38260b",
              100: "#593d11",
              200: "#7a5317",
              300: "#9a6a1d",
              400: "#bb8023",
              500: "#c7964a",
              600: "#d3ac70",
              700: "#dfc397",
              800: "#ebd9bd",
              900: "#f7efe4",
              foreground: "#000",
              DEFAULT: "#bb8023"
            },
            danger: {
              50: "#320508",
              100: "#50070c",
              200: "#6d0a10",
              300: "#8b0c15",
              400: "#a80f19",
              500: "#b73941",
              600: "#c6636a",
              700: "#d68d92",
              800: "#e5b7ba",
              900: "#f4e1e2",
              foreground: "#fff",
              DEFAULT: "#a80f19"
            },
            background: "#0a1422",
            foreground: {
              50: "#424446",
              100: "#696b6e",
              200: "#8f9297",
              300: "#b6babf",
              400: "#dce1e8",
              500: "#e2e6ec",
              600: "#e8ecf0",
              700: "#eef1f4",
              800: "#f5f6f8",
              900: "#fbfbfc",
              foreground: "#000",
              DEFAULT: "#dce1e8"
            },
            content1: {
              DEFAULT: "#1c2736",
              foreground: "#fff"
            },
            content2: {
              DEFAULT: "#303f56",
              foreground: "#fff"
            },
            content3: {
              DEFAULT: "#485b76",
              foreground: "#fff"
            },
            content4: {
              DEFAULT: "#566f94",
              foreground: "#fff"
            },
            focus: "#006FEE",
            overlay: "#ffffff",
            divider: "#ffffff"
          }
        }
      },
      layout: {
        fontSize: {
          tiny: "0.75rem",
          small: "0.875rem",
          medium: "1rem",
          large: "1.25rem"
        },
        lineHeight: {
          tiny: "1rem",
          small: "1.25rem",
          medium: "1.5rem",
          large: "1.75rem"
        },
        radius: {
          small: "0.5rem",
          medium: "0.75rem",
          large: "0.875rem"
        },
        borderWidth: {
          small: "1px",
          medium: "2px",
          large: "3px"
        },
        disabledOpacity: "0.5",
        dividerWeight: "1px",
        hoverOpacity: "0.9"
      }
    })
  ]
};
