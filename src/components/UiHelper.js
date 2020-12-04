import { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { createAction } from "redux-actions";
import { fetchGalleryFromAPI } from "../reducers/reducer";

let UiHelper = ({
  setCursor,
  setViewport,
  mouseUp,
  mouseDown,
  openFile,
  setClockTime,
  closeMenuBarItem,
  fetchGallery,
}) => {
  // Cursor position
  useEffect(() => {
    console.log("UI HELPER MOUNTED");
    // Mounted
    let mouseDownHandler = (e) => {
      document.body.addEventListener("mousemove", mouseMoveHandler);
      // Deselect files
      mouseDown(e);
    };
    let mouseUpHandler = (e) => {
      document.body.removeEventListener("mousemove", mouseMoveHandler);
      mouseUp();
      let isOpenedMenuBarItem = e.target.closest(".MenuBarItemTitle.isOpen");
      if (!isOpenedMenuBarItem) closeMenuBarItem();
    };
    let mouseMoveHandler = (e) => {
      setCursor({
        x: e.clientX,
        y: e.clientY,
      });
    };
    let mouseLeaveHandler = (e) => {};

    let windowResizeHandler = (e) => {
      setViewport({ x: window.innerWidth, y: window.innerHeight });
    };

    document.body.addEventListener("mouseleave", mouseLeaveHandler);
    document.body.addEventListener("mousedown", mouseDownHandler);
    document.body.addEventListener("mouseup", mouseUpHandler);
    window.addEventListener("mouseup", mouseUpHandler);
    window.addEventListener("resize", windowResizeHandler);

    // Clock ticker
    var clockTicker = setInterval(() => {
      setClockTime(new Date().getTime());
    }, 1000);

    // Fetch gallery
    fetchGallery();

    return () => {
      // Unmounting
      document.body.removeEventListener("mousemove", mouseMoveHandler);
      document.body.removeEventListener("mouseleave", mouseLeaveHandler);
      document.body.removeEventListener("mousedown", mouseDownHandler);
      document.body.removeEventListener("mouseup", mouseUpHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      window.removeEventListener("resize", windowResizeHandler);
      clearInterval(clockTicker);
    };
  });

  // Initial set viewport
  setViewport({ x: window.innerWidth, y: window.innerHeight });

  // Initial opened windows
  switch (window.location.pathname) {
    case "/resume": {
      // Resume
      openFile(18);
      break;
    }
    default: {
      // About
      openFile(4);
      break;
    }
  }

  return null;
};

const mapDispatchToProps = (dispatch) => ({
  setCursor: (pos) => {
    dispatch({ type: "SET_CURSOR", payload: pos });
  },
  mouseDown: (e) => {
    dispatch({
      type: "MOUSE_DOWN",
      payload: e,
    });
  },
  closeMenuBarItem: () => {
    dispatch({
      type: "CLOSE_MENUBAR_ITEM",
    });
  },
  mouseUp: () => {
    dispatch({
      type: "MOUSE_UP",
    });
  },
  setViewport: (size) => {
    dispatch({ type: "SET_VIEWPORT", payload: size });
  },
  openFile: (id) => {
    dispatch({
      type: "OPEN_FILE",
      payload: {
        id,
      },
    });
  },
  setClockTime: (ts) => {
    dispatch({
      type: "SET_CLOCK_TIME",
      payload: ts,
    });
  },
  fetchGallery: () => {
    dispatch(fetchGalleryFromAPI());
  },
});

export default connect(null, mapDispatchToProps)(UiHelper);
