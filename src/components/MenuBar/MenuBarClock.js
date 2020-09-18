import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

let StyledClock = styled.div`
  margin-left: auto;
  user-select: none;
`;

let Clock = ({ clockTime }) => {
  const date = new Date(clockTime);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  var hours = date.getHours();
  var minutes = date.getMinutes();
  minutes = String(minutes).length === 1 ? `0${minutes}` : minutes;

  return (
    <StyledClock>{`${
      weekDays[date.getDay()]
    } ${hours}:${minutes}`}</StyledClock>
  );
};

const mapStateToProps = (state) => ({
  clockTime: state.clockTime,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Clock);
