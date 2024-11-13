import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *, *::after, *::before{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    min-height: 100vh;
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: var(--font-family-text);
    font-weight: 200;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`

export default GlobalStyles