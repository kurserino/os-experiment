import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import FileIcon from "./FileIcon";

let StyledDockWrapper = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  left: 0;
  display: flex;
  align-items: center;
  // justify-content: center;

  ${(props) =>
    props.isSmallerScreen &&
    `
    top: initial;
    bottom: 0;
    height: initial;
    width: 100%;
    justify-content: center;
  `}
`;

let StyledDock = styled.div`
  width: 66px;
  top: 50%;
  background: #3333335c;
  border-width: 1px 1px 1px 0;
  z-index: 10000;
  color: #fff;
  font-size: 12px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 7px;
  margin-top: 23px;
  border-radius: 0 5px 5px 0;

  ${(props) =>
    props.isSmallerScreen &&
    `
    width: initial;
    top: initial;
    left: 50%;
    flex-direction: row;
    height: 66px;
    border-width: 1px 1px 0 1px;
    border-radius:  5px 5px 0 0;
`}
`;

let Dock = ({ files, viewport, dockFolderId }) => {
  const isSmallerScreen = viewport.x < 710;
  return (
    <StyledDockWrapper isSmallerScreen={isSmallerScreen}>
      <StyledDock isSmallerScreen={isSmallerScreen}>
        {files
          .filter((_file) => _file.folder === dockFolderId && !_file.hidden)
          .sort((a, b) => a.id - b.id)
          .map((_file, _index) => (
            <FileIcon key={_index} file={_file} isDock />
          ))}
      </StyledDock>
    </StyledDockWrapper>
  );
};

const mapStateToProps = (state) => ({
  files: state.files,
  cursor: state.cursor,
  viewport: state.viewport,
  dockFolderId: state.dockFolderId,
});

const mapDispatchToProps = (dispatch) => ({
  setWindowTop: (id) => {
    dispatch({
      type: "SET_WINDOW_TOP",
      payload: {
        id,
      },
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dock);
