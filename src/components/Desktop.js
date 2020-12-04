import React, {useEffect} from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import FileIcon from "./FileIcon";

let StyledDesktop = styled.div`
  height: 100%;
  width: 100%;
  z-index: 0;
  position: relative;
`;

let StyledWallpaper = styled.div.attrs((props) => ({
  style: {
    backgroundImage: `url(${props.wallpaperUrl})`,
  },
}))`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #eee;
  background-repeat: no-repeat;
  background-position: ${(props) =>
    props.isSmallerScreen ? "center center" : "right center"};
  background-size: cover;
  z-index: -1;
`;

let StyledSelectionArea = styled.div.attrs(
  ({ cursor, viewport, dragSelect, isDragSelect }) => ({
    style: {
      top: (() => {
        return cursor.y < dragSelect.y ? `initial` : `${dragSelect.y}px`;
      })(),
      bottom: (() => {
        return cursor.y < dragSelect.y
          ? `${viewport.y - dragSelect.y}px`
          : `initial`;
      })(),
      left: (() => {
        return cursor.x < dragSelect.x ? `initial` : `${dragSelect.x}px`;
      })(),
      right: (() => {
        return cursor.x < dragSelect.x
          ? `${viewport.x - dragSelect.x}px`
          : `initial`;
      })(),
      width: (() => {
        return `${Math.abs(cursor.x - dragSelect.x)}px`;
      })(),
      height: (() => {
        return `${Math.abs(cursor.y - dragSelect.y)}px`;
      })(),
    },
  })
)`
  display: ${props => props.isDragSelect ? `block` : `none`};
  position: absolute;
  background: rgba(250, 250, 250, 0.4);
  border: 1px solid #fff;
  right: 100px;
`;

let Desktop = ({
  cursor,
  files,
  viewport,
  wallpaperRef,
  dragSelect,
  isDragSelect,
}) => {
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
    <StyledDesktop>
      {files
        .filter((_file) => _file.folder === 0 && !_file.hidden)
        .map((_file, _index) => (
          <FileIcon key={_index} file={_file} />
        ))}
      <StyledSelectionArea
        isDragSelect={isDragSelect}
        dragSelect={dragSelect}
        cursor={cursor}
        viewport={viewport}
      />
      <StyledWallpaper
        ref={wallpaperRef}
        isSmallerScreen={isSmallerScreen}
        wallpaperUrl={`${process.env.PUBLIC_URL}/images/wallpapers/${
          isSmallerScreen ? "goddess_mobile.svg" : "goddess.svg"
        }`}
      />
    </StyledDesktop>
  );
};

const mapStateToProps = (state) => ({
  files: state.files,
  cursor: state.cursor,
  viewport: state.viewport,
  isDragSelect: state.isDragSelect,
  dragSelect: state.dragSelect,
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
