// theme.ts
import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    50: "#ffe6f0",
    100: "#ffb3cc",
    200: "#ff80a6",
    300: "#ff4d80",
    400: "#ff1a59",
    500: "#FF0066", // main color
    600: "#e6005c",
    700: "#b30047",
    800: "#800032",
    900: "#4d001f",
  },
};

export const theme = extendTheme({
  colors,
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  semanticTokens: {
    colors: {
      bg: {
        default: "#FBFBFB", // light mode background
        _dark: "gray.900", // dark mode background
      },
      text: {
        default: "gray.900", // light mode text
        _dark: "gray.200", // dark mode text
      },
      muted: {
        default: "gray.600",
        _dark: "gray.400",
      },
      primary: {
        default: colors.brand[500],
        _dark: colors.brand[300],
      },
    },
  },
});
