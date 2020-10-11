import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  html {
    font-size: 62.5%; 
  }
  
  body {
    font-size: calc( 16 / 10 * 100%);
    background: url("background.webp");
    
  }
  
    html, body {
    margin: 0;
  }
  
  html, body, #__next {
    height: 100%
  }
  
  *, ::after, ::before {
    box-sizing: border-box;
  }

`
