import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import MenuBarClock from "./MenuBar/MenuBarClock";
import MenuBarItem from "./MenuBar/MenuBarItem";

let StyledMenuBar = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  height: 23px;
  z-index: 10000;
  color: #fff;
  font-size: 12px;
  display: flex;
  align-items: center;
  // justify-content: space-between;
  padding: 0 15px;
  background: #3333335c;
  border-radius: 0 0 2px 2px;
`;

let MenuBar = ({ menuBarItemOpened, openFile }) => {
  const systemItem = {
    name: null,
    width: 230,
    options: [
      {
        name: "About",
        click: (e) => {
          openFile(4);
        },
      },
      // {
      //   name: "System preferences",
      //   click: (e) => {
      //     alert("clicked 1");
      //   },
      // },
    ],
  };
  const items = [
    // {
    //   name: "Item 1",
    //   width: 300,
    //   options: [
    //     {
    //       name: "Option 1",
    //       click: (e) => {
    //         alert("clicked 1");
    //       },
    //     },
    //   ],
    // },
  ];
  return (
    <StyledMenuBar>
      <MenuBarItem
        isSystem
        item={systemItem}
        index={-1}
        isOpen={-1 === menuBarItemOpened}
      />
      {items.map((_item, _index) => (
        <MenuBarItem
          item={_item}
          isOpen={_index === menuBarItemOpened}
          index={_index}
          key={_index}
        />
      ))}
      <MenuBarClock />
    </StyledMenuBar>
  );
};

const mapStateToProps = (state) => ({
  menuBarItemOpened: state.menuBarItemOpened,
});

const mapDispatchToProps = (dispatch) => ({
  openFile: (id) => {
    dispatch({
      type: "OPEN_FILE",
      payload: {
        id,
      },
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
