import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Tooltip } from "react-tippy";

let StyledIconWrapper = styled.div`
  background: ${(props) =>
    props.isSelected && !props.isDock
      ? props.isFolder
        ? "#333333cc"
        : "#3333335c"
      : "transparent"};
  width: ${(props) => props.width}px;
  height: ${(props) => props.width}px;
  border-radius: 5px;
`;
let StyledIcon = styled.div.attrs((props) => ({
  style: {
    backgroundImage: `url(${props.iconUrl})`,
  },
}))`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

let StyledFileIconWrapper = styled.div.attrs((props) => ({
  style: {
    transform: !props.isDock
      ? `translate3d(${props.pos.x}px, ${props.pos.y}px, 0)`
      : ``,
  },
}))`
  position: ${(props) => (props.isDock ? "initial" : "absolute")};
  width: ${(props) => props.width}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

let StyledFileName = styled.div`
  width: auto;
  float: left;
  color: ${(props) => (props.isSelected ? "#fff" : "#fff")};
  text-shadow: 0 0.02rem 2px #000000a8;
  letter-spacing: 0.02rem;
  background: ${(props) =>
    props.isSelected
      ? props.isFolder
        ? "#333333cc"
        : "#3333335c"
      : "transparent"};
  margin: 2px -10px 0 -10px;
  padding: 4px;
  text-align: center;
  line-height: 13px;
  font-size: 13px;
  font-weight: 500;
  user-select: none;
  word-break: break-all;
  border-radius: 3px;
`;

let FileIcon = ({
  files,
  file,
  viewport,
  iconWidth,
  dockIconWidth,
  selectSingleFile,
  selectFile,
  deselectFile,
  clickFile,
  openFile,
  setDragging,
  isDock,
  isFolder,
}) => {
  let mouseDownHandler = (e) => {
    let isLeftButton = e.button === 0;
    if (isLeftButton && !isDock) {
      if (!file.isSelected) {
        e.shiftKey ? selectFile(file.id) : selectSingleFile(file.id);
      } else if(e.shiftKey){
        deselectFile(file.id)
      }
      var selectedFiles = [...files].filter((_file) => {
        return _file.isSelected && !_file.hidden && _file.folder == file.folder;
      });
      setDragging(
        selectedFiles.map((_file) => _file.id),
        {
          x: e.clientX,
          y: e.clientY,
        }
      );
    }
  };

  let mouseUpHandler = (e) => {
    // First click select
    let isLeftButton = e.button === 0;
    if (isLeftButton && !isDock) {
      if (file.isClicked) {
        // Second click open if selected
        var ts = new Date().getTime();
        if (ts - file.isClicked < 400) {
          openFile(file.id);
          return;
        }
      }
      clickFile(file.id);
    }

    if (isLeftButton && isDock) {
      openFile(file.id);
    }
  };

  const pos = {
    x: isFolder ? file.pos.x : viewport.x - file.pos.x - iconWidth,
    y: file.pos.y,
  };

  const isSmallerScreen = viewport.x < 710;

  const FileIcon = (
    <StyledFileIconWrapper
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      pos={pos}
      className={"fileIcon"}
      width={!isDock ? iconWidth : dockIconWidth}
      isDock={isDock}
      isFolder={isFolder}
    >
      <StyledIconWrapper
        width={!isDock ? iconWidth : dockIconWidth}
        isSelected={file.isSelected}
        isDock={isDock}
        isFolder={isFolder}
      >
        <StyledIcon isSelected={file.isSelected} iconUrl={file.icon} />
      </StyledIconWrapper>

      {!isDock && (
        <StyledFileName isFolder={isFolder} isSelected={file.isSelected}>
          {file.name}
        </StyledFileName>
      )}
    </StyledFileIconWrapper>
  );

  if (isDock && !isSmallerScreen) {
    return (
      <Tooltip
        title={file.name}
        animation="none"
        position="right"
        trigger="mouseenter"
        delay={0}
        distance={20}
      >
        {FileIcon}
      </Tooltip>
    );
  }

  return FileIcon;
};

const mapStateToProps = (state) => ({
  viewport: state.viewport,
  iconWidth: state.iconWidth,
  dockIconWidth: state.dockIconWidth,
  files: state.files,
});

const mapDispatchToProps = (dispatch) => ({
  selectSingleFile: (id) => {
    dispatch({
      type: "SELECT_SINGLE_FILE",
      payload: {
        id,
      },
    });
  },
  selectFile: (id) => {
    dispatch({
      type: "SELECT_FILE",
      payload: {
        id,
      },
    });
  },
  deselectFile: (id) => {
    dispatch({
      type: "DESELECT_FILE",
      payload: {
        id,
      },
    });
  },
  clickFile: (id) => {
    dispatch({
      type: "CLICK_FILE",
      payload: {
        id,
      },
    });
  },
  openFile: (id) => {
    dispatch({
      type: "OPEN_FILE",
      payload: {
        id,
      },
    });
  },
  setDragging: (ids, dragging) => {
    dispatch({
      type: "SET_FILE_DRAGGING",
      payload: { ids, dragging, isDragging: true },
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FileIcon);
