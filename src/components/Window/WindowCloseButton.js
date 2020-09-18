import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

let StyledCloseButton = styled.div`
  height: 11px;
  width: 11px;
  margin: 11px;
  z-index: 2;
  position: absolute;
  cursor: pointer;

  background-repeat: no-repeat;
  background-image: url(${(props) => props.closeButtonUrl});
`;

let WindowCloseButton = ({ file, closeWindow }) => {
  let clickHandler = () => {
    closeWindow(file);
  };
  return (
    <StyledCloseButton
      onClick={clickHandler}
      closeButtonUrl={`${process.env.PUBLIC_URL}/images/ui/${"windowCloseButton.svg"}`}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  closeWindow: (file) => {
    dispatch({
      type: "CLOSE_WINDOW",
      payload: {
        file,
      },
    });
  },
});

export default connect(null, mapDispatchToProps)(WindowCloseButton);
