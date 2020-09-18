import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

let StyledBlank = styled.div`
  // font-size: 12px;
`;

let Blank = (props) => {
return <StyledBlank></StyledBlank>;
};

const mapStateToProps = (state) => ({
  files: state.files,
  cursor: state.cursor,
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

export default connect(mapStateToProps, mapDispatchToProps)(Blank);
