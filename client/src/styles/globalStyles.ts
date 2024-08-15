import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #000; /* Define a cor de fundo como preto */
    color: #fff; /* Define a cor do texto como branco */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    height: 100vh;
    width: 100vw;
  }

  #root {
    height: 100%;
  }
`;

export default GlobalStyle;
