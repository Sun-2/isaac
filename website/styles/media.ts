import {DefaultTheme} from "styled-components";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export const media = {} as { [T in typeof sizes[number]]: (...args) => string };

for (const size of sizes) {

  media[size] = ({ theme }: {theme:DefaultTheme}) =>
    `@media only screen and (min-width: ${theme.breakpoints[size]}px)`;
}
