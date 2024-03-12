import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['yellow-dark']}
  }

  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme['base-text']};
    --webkit-font-smoothing: antialiased;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 10rem 2rem;

    @media (max-width:1280px) {
      padding: 0 2rem;
      max-width: 100%;
    }
  }

  body, input, textarea, button {
    font: 400 1rem Roboto, sans-serif;
  }
 
`
