import React, { useEffect } from "react";
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
  position: relative;
`;

let IframeBlocker = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

let Iframe = ({ file, contentRef }) => {
  let width = file.window.width - 3;
  let height = file.window.height - windowTitlHeight - 4;
  let iframeRef = contentRef;

  useEffect(() => {
    iframeRef.current.focus();
  }, []);

  return (
    <Wrapper>
      <IframeBlocker/>
      <iframe
        ref={iframeRef}
        title={file.name}
        src={file.data.src}
        width={width}
        height={height}
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
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

function iframePropsAreEqual(prevProps, nextProps) {
  return prevProps.file.id === nextProps.file.id
    && prevProps.file.name === nextProps.file.name;
}

const MemoizedIframe = React.memo(Iframe, iframePropsAreEqual);

export default connect(mapStateToProps, mapDispatchToProps)(MemoizedIframe);
