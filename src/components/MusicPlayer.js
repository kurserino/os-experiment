import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
// import { Tooltip } from "react-tippy";

let windowPadding = 30;
let windowTitlHeight = 35;

let Wrapper = styled.div`
  // padding: ${windowPadding}px;
  user-select: none;
  float: left;
  width: 100%;
`;

let MusicPlayer = ({ file }) => {
  let width = file.window.width - 3
  let height = file.window.height - windowTitlHeight - 4
  return (
    <Wrapper>
      <iframe title="Spotify" src="https://open.spotify.com/embed/album/5yWkLVHsSDjYZgBDxDQ5wu" width={width} height={height} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
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

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
