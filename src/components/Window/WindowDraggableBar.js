import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

let StyledWindowDraggableBar = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

let WindowDraggableBar = ({ file, setDragging, children }) => {
  useEffect(() => {
    console.log("DraggableBar Mounting...");

    return () => {
      console.log("DraggableBar UN-Mounting...");
    };
  }, []);

  let mouseDownHandler = (e) => {
    let isLeftButton = e.button === 0;
    if (isLeftButton) {
      setDragging(file.id, {
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  return (
    <StyledWindowDraggableBar onMouseDown={mouseDownHandler}>
      {children}
    </StyledWindowDraggableBar>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setDragging: (id, dragging) => {
    dispatch({
      type: "SET_WINDOW_DRAGGING",
      payload: { id, dragging, isDragging: true },
    });
  },
  // setViewport: (size) => {
  //   dispatch({ type: "SET_VIEWPORT", payload: size });
  // },
});

// export default WindowDraggableBar;
export default connect(null, mapDispatchToProps)(WindowDraggableBar);
