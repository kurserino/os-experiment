import React, { useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
// import { Tooltip } from "react-tippy";

let Wrapper = styled.div`
  // padding: 30px 40px 30px 40px;
  user-select: none;
  float: left;
  width: 100%;
  height: 100%;
`;
let Text = styled.textarea`
  ${(props) => (props.marginTop ? `margin-top: ${props.marginTop}px;` : "")}
  ${(props) =>
    props.marginBottom ? `margin-bottom: ${props.marginBottom}px;` : ""}
  ${(
    props
  ) =>
    props.fontSize ? `font-size: ${props.fontSize}px;` : ""}

    float: left;
  width: 100%;
  height: 100%;
  white-space: pre;
  resize: none;
  background: #2a2926;
  border: #2a2926;
  padding: 12px;
  color: #fff;

  &:focus {
    outline: none;
  }

  ::-webkit-scrollbar {
    width: 10px;
    padding: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: 0;
    border-radius: 0;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #ffffff2e;
    border-radius: 0;
  }
  // the bottom corner of the scrollbar, where both horizontal and vertical scrollbars meet.
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
`;

let TextEdit = ({ file, viewport }) => {
  let textRef = useRef();
  const isSmallerScreen = viewport.x < 710;

  // useEffect(() => {
  //   textRef.current.focus();
  // }, []);

  return (
    <Wrapper>
      <Text
        ref={textRef}
        onFocus={(e) => {
          let self = textRef.current;
          self.selectionStart = self.selectionEnd = self.value.length;
        }}
        readOnly={isSmallerScreen}
        defaultValue={file.data.text}
      ></Text>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  files: state.files,
  cursor: state.cursor,
  viewport: state.viewport,
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

export default connect(mapStateToProps, mapDispatchToProps)(TextEdit);
