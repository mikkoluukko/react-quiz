import styled, { createGlobalStyle } from 'styled-components';
import BGImage from './images/background.jpg';

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    background-image: url(${BGImage});
    
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }

  * {
    box-sizing: border-box;
    font-family: 'Catamaran', sans-serif;
  }
  `;

export const Wrapper = styled.div`
 
  display: flex;
  flex-direction: column;
  align-items: center;  

  > p {
    color: #fff;
  }

  & select {
    margin: 5px;
  }

  .score {
    font-family: Orbitron, sans-serif;
    color: #fff;
    font-size: 2.5rem;
    margin: 10px;
    padding: 5px;
  }

  h1 {
    font-family: Fascinate Inline, 'Arial Narrow Bold', sans-serif;
    background-image: linear-gradient(180deg, #fff, #23c6db);
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: clamp(50px, 10vw, 70px);
    font-weight: 400;
    text-align: center;
    margin: 5px;
  }

  .start, .next, .stop { 
    cursor: pointer;
    background: linear-gradient(180deg, #fff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 10px 0;
    padding: 0 40px;
  }

  .start, .stop {
    max-width: 200px;
  }


`