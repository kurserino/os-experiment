import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import FileIcon from "./FileIcon";

let StyledDesktop = styled.div.attrs((props) => ({
  style: {
    backgroundImage: `url(${props.wallpaperUrl})`,
  },
}))`
  height: 100%;
  width: 100%;
  background: #eee;
  background-repeat: no-repeat;
  background-position: ${(props) =>
    props.isSmallerScreen ? "center center" : "right center"};
  background-size: cover;
  z-index: 0;
  position: relative;
`;

let Desktop = ({ files, viewport }) => {
  const isSmallerScreen = viewport.x < 710;
  // Get files array
  window.files = () =>
    files
      .sort((a, b) => a.id - b.id)
      .map((_file, _index) => {
        if (_file.window) {
          _file.window.pos.x = null;
          _file.window.pos.y = null;
        }
        return _file;
      });
  return (
    <StyledDesktop
      isSmallerScreen={isSmallerScreen}
      wallpaperUrl={`${process.env.PUBLIC_URL}/images/wallpapers/${
        isSmallerScreen ? "goddess_mobile.svg" : "goddess.svg"
      }`}
    >
      {files
        .filter((_file) => _file.folder === 0 && !_file.hidden)
        .map((_file, _index) => (
          <FileIcon key={_index} file={_file} />
        ))}
    </StyledDesktop>
  );
};

const mapStateToProps = (state) => ({
  files: state.files,
  cursor: state.cursor,
  viewport: state.viewport,
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

export default connect(mapStateToProps, mapDispatchToProps)(Desktop);
