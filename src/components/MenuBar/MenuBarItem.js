import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import MenuBarItemOption from "./MenuBarItemOption";
import { ReactComponent as SystemIcon } from "./svg/system.svg";

let StyledTitle = styled.div`
  // font-size: 12px;
  padding: 0 10px;
  background-color: ${(props) => (props.isOpen ? "#3333335e" : "transparent")};
  height: 100%;
  display: flex;
  align-items: center;
  line-height: 13px;
`;
let StyledMenuBarItem = styled.div`
  position: relative;
  height: 100%;
  user-select: none;
`;

let StyledOptions = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  width: ${(props) => (props.width ? props.width : 400)}px;
  padding: 5px 0;
  background: #3333335c;
  border-radius: 0 0 5px 5px;
`;

let MenuBarItem = ({ item, index, openItem, isOpen, isSystem }) => {
  const toggleOptions = (e) => {
    openItem(isOpen ? null : index);
    // console.log(e.target);
    // console.log(e.target.closest(".MenuBarItemTitle"));
  };
  return (
    <StyledMenuBarItem isSystem={isSystem} isOpen={isOpen}>
      <StyledTitle
        onClick={toggleOptions}
        isOpen={isOpen}
        className={`MenuBarItemTitle ${isOpen && "isOpen"}`}
      >
        {isSystem ? <SystemIcon width={12} /> : item.name}
      </StyledTitle>
      <StyledOptions isOpen={isOpen} width={item.width}>
        {/* Loop item options */}
        {item.options &&
          item.options.map((_option, _index) => (
            <MenuBarItemOption
              option={_option}
              last={_index === item.options.length - 1}
              key={_index}
            />
          ))}
      </StyledOptions>
    </StyledMenuBarItem>
  );
};

const mapStateToProps = (state) => ({
  clockTime: state.clockTime,
});

const mapDispatchToProps = (dispatch) => ({
  openItem: (id) =>
    dispatch({
      type: "OPEN_MENUBAR_ITEM",
      payload: id,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuBarItem);
