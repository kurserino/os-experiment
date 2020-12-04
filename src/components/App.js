import React, { createRef } from "react";
import { createGlobalStyle } from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Windows from "./Windows";
import Desktop from "./Desktop";
import UiHelper from "./UiHelper";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
// import FPSStats from "react-fps-stats";
import "react-tippy/dist/tippy.css";

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  
  body, #root {
    overflow: hidden;
    position: absolute;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    font-weight: 300;
  }
`;

function App() {
  const wallpaperRef = createRef();
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        {/* <title>III</title> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyle />
      <UiHelper wallpaperRef={wallpaperRef} />
      {/* <FPSStats bottom={10} left={10} top={"auto"} /> */}
      <MenuBar />
      <Dock />
      <Windows />
      <Desktop wallpaperRef={wallpaperRef} />
    </HelmetProvider>
  );
}

export default App;
