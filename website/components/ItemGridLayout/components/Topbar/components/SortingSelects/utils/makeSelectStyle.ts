import { DefaultTheme } from "styled-components";
import { Styles } from "react-select";

export function makeSelectStyle(theme: DefaultTheme): Styles {
  return {
    option: (styles, state) => ({
      ...styles,
      color: state.isDisabled ? "gray" : "#efefef",
      textDecoration: state.isDisabled ? "line-through" : undefined,
      fontFamily: theme.typography.families.isaac,
      ":hover": {
        backgroundColor: "hsl(0deg 0% 13%)",
      },
      backgroundColor: state.isFocused ? "hsl(0deg 0% 31%)" : undefined,
      cursor: "pointer",
    }),
    singleValue: (styles) => ({
      fontFamily: theme.typography.families.isaac,
      color: "#a04325",
      cursor: "pointer",
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: "#190202eb",
      borderRadius: "8px",
      marginTop: "-5px",
      cursor: "pointer",
    }),
    menuList: (styles, state) => ({
      ...styles,
    }),
    control: (style) => ({
      ...style,
      backgroundColor: "transparent",
      outline: "none",
      boxShadow: "none",
      border: "none",
      flexWrap: "nowrap",
      minHeight: "0",
      cursor: "pointer",
    }),
    valueContainer: (style) => ({
      ...style,
      flexWrap: "nowrap",
      paddingRight: 0,
    }),
    container: (style) => ({
      ...style,
      outline: "none",
      boxShadow: "none",
      border: "none",
      display: "inline-block",
      fontFamily: theme.typography.families.isaac,
      color: "#efefef",
      cursor: "pointer",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (styles) => ({
      ...styles,
      marginLeft: 0,
      padding: 0,
      paddingRight: "0.8rem",
      cursor: "pointer",
    }),
    indicatorsContainer: (styles) => ({
      margin: 0,
      padding: 0,
      cursor: "pointer",
    }),
  };
}
