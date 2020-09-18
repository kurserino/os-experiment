import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import FileIcon from "./FileIcon";

let Wrapper = styled.div`
  padding: 30px;
`;

let Folder = ({ file, files }) => {
  files = files.filter((_file) => _file.folder === file.id && !_file.hidden);
  return (
    <Wrapper>
      {files.map((_file, _index) => (
        <FileIcon key={_index} file={_file} isFolder/>
      ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Folder);
