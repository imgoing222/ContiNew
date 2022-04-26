import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  
  *, *::before, *::after {
    box-sizing: border-box;
    margin:0;
    padding:0.2rem;
  }
  html{
    font-size: 62.5%;
    line-height: 1.5;
    
  }
  ul{
    list-style: none;
    padding: 0;
  }
  a{
    text-decoration: none;
    color: black;
  }
`;

export default GlobalStyle;
