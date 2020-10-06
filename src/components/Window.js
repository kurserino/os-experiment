import React, { useRef } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import WindowDraggableBar from "./Window/WindowDraggableBar";
import WindowCloseButton from "./Window/WindowCloseButton";
import WindowContent from "./Window/WindowContent";

const openAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale3d(1.05,1.05,1.05)
  }
  
  to {
    transform: scaleX(1)
    opacity: 1;
  }
`;

let WindowWrapper = styled.div.attrs((props) => ({
  style: {
    transform: `translate3d(${props.pos.x}px, ${props.pos.y}px, 0)`,
    zIndex: props.zIndex,
  },
}))`
  position: absolute;
`;

let StyledWindow = styled.div.attrs((props) => ({
  style: {
    width: props.width,
    height: props.height,
    background: props.bg,
  },
}))`
  animation-name: ${openAnimation};
  animation-duration: 0.333s;
  color: white;
  border: 1px solid #ffffff26;
  border-radius 5px;
`;

let WindowDraggableBarWrapper = styled.div`
  height: 33px;
  width: 100%;
  background: #ffffff0f;
  border-bottom: 1px solid #ffffff0a;
  position: relative;
`;

let StyledWindowTitle = styled.div`
  font-size: 13px;
  color: #fff;
  user-select: none;
  pointer-events: none;
`;

let WindowTitle = ({ title }) => {
  return <StyledWindowTitle>{title}</StyledWindowTitle>;
};

let Window = ({ file, viewport, setWindowTop }) => {
  const isSmallerScreen = viewport.x < 710;
  let contentRef = useRef();
  let mouseDownHandler = (e) => {
    setWindowTop(file.id);
  };
  let mouseUpHandler = (e) => {
    if (file.window && file.window.app === "Iframe") {
      let iframeRef = contentRef;
      iframeRef.current.focus();
    }
  };

  // Initial pos
  if (file.window && !file.window.pos.x) {
    file.window.pos = (function () {
      let height =
        file.window.height > viewport.y - 110
          ? viewport.y - 110
          : file.window.height;
      let width =
        file.window.width > viewport.x - 20
          ? viewport.x - 20
          : file.window.width;
      let x = (viewport.x - width) / 2;
      let y = (viewport.y - height) / 2;
      if (isSmallerScreen) {
        let spacing = viewport.y - height - 110;
        y = spacing < 33 ? 33 : spacing / 2 + 33;
      }
      return { x, y };
    })();
  }

  return (
    <WindowWrapper
      pos={file.window.pos}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      zIndex={file.window.zIndex}
    >
      <StyledWindow
        width={
          file.window.width > viewport.x - 20
            ? viewport.x - 20
            : file.window.width
        }
        height={
          file.window.height > viewport.y - 110
            ? viewport.y - 110
            : file.window.height
        }
        bg={file.window.bg}
      >
        <WindowDraggableBarWrapper>
          <WindowCloseButton file={file} />
          <WindowDraggableBar file={file} pos={file.window.pos}>
            <WindowTitle
              title={file.window.title ? file.window.title : file.name}
            />
          </WindowDraggableBar>
        </WindowDraggableBarWrapper>
        <WindowContent file={file} contentRef={contentRef} />
      </StyledWindow>
    </WindowWrapper>
  );
};

const mapStateToProps = (state) => ({
  cursor: state.cursor,
  viewport: state.viewport,
  windows: state.windows,
});

const mapDispatchToProps = (dispatch) => ({
  setWindowTop: (id, dragging) => {
    dispatch({
      type: "SET_WINDOW_TOP",
      payload: {
        id,
      },
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Window);
