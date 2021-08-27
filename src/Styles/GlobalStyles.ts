import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyles = createGlobalStyle` 
    ${reset}
    *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Barlow', sans-serif;
    }
    input, button {
      background-color: transparent;
      border: none;
      outline: none;
    }
    button {
      font-family: 'Barlow', sans-serif;
      cursor: pointer;
    }
    ol,
    ul {
      list-style: none;
    }
    a{
      text-decoration: none;
      color: inherit;
    }
     img {
      max-width: 100%;
      height: auto;
   }
    [tabindex]:focus-visible,
    label:focus-visible,
    button:focus-visible,
    input:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(255,255,255, 0.65);
    }
    .a11y {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    
`;
