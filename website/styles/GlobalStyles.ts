import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  html {
    font-size: 62.5%; 
  }
  
  body {
    font-size: calc( 16 / 10 * 100%);
    background: url("background.webp");
    font-family: "${({ theme }) => theme.typography.families.body}";
    cursor: url("images/cursor.png"), auto;
    position:relative;
  }
  
    html, body {
    margin: 0;
  }
  
  html, body, #__next {
    height: 100%
  }
  
  body::after {
    display: block;
    content: "";
    background: -webkit-radial-gradient(50% 52%,ellipse cover,rgba(255,255,255,0),rgba(8,4,2,.9) 100%);
    position:fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
    user-select: none;
    pointer-events: none;
    
    isolation: isolate;
  }
  
  #__next {
    position:relative;
    z-index: 2;
  }
  
  *, ::after, ::before {
    box-sizing: border-box;
  }

    
    *::-webkit-scrollbar-track {
      background-color: transparent;
    }

    *::-webkit-scrollbar {
      width: 10px;
      background-color: transparent;
    }

    *::-webkit-scrollbar-thumb {
      background: #683f2f;
    }



  @font-face {
    font-family: 'Silom';
    src: url('/fonts/Silom.ttf');
  }
  
  @font-face {
    font-family: 'Upheaval';
    src: url('/fonts/Upheaval.ttf');
  }

`;
