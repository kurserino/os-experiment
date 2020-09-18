import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
// import { Tooltip } from "react-tippy";

let windowPadding = 30;
let windowTitlHeight = 35;

let Wrapper = styled.div`
  padding: ${windowPadding}px;
  user-select: none;
  float: left;
  width: 100%;
`;

let StyledImage = styled.div`
  width: 100%;
  height: ${(props) =>
    props.file.window.height - windowPadding * 2 - windowTitlHeight}px;
  background-image: url(${(props) => props.file.data.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

let ImageViewer = ({ file }) => {
  return (
    <Wrapper>
      <StyledImage file={file} />
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  files: state.files,
  cursor: state.cursor,
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

export default connect(mapStateToProps, mapDispatchToProps)(ImageViewer);
