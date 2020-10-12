import { DefaultTheme } from "styled-components";

type MyTheme = typeof theme;

export const theme = {
  typography: {
    families: {
      isaac: "Upheaval",
      body: "Silom"
    },
  },
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
  spacing: (spacing: number) => 8 * spacing,
};

declare module "styled-components" {
  export interface DefaultTheme extends MyTheme {}
}
