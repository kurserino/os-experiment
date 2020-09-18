import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

let StyledOption = styled.div`
  padding: 5px 15px;
  height: 100%;

  &:hover {
    background: #3333335e;
  }

  // ${(props) => (props.last ? "border-radius: 0 0 5px 5px;" : "")}
`;

let MenuBarItemOption = ({ option, last }) => {
  return (
    <StyledOption onClick={option.click ? option.click : null} last={last}>
      {option.name}
    </StyledOption>
  );
};

const mapStateToProps = (state) => ({
  // clockTime: state.clockTime,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MenuBarItemOption);
