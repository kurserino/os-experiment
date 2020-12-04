import { useEffect } from "react";
import { connect } from "react-redux";
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
  wallpaperRef,
  startDragSelect,
  isDragSelect,
  dragSelect,
  viewport,
  files,
  selectFile,
  deselectFile,
  iconWidth,
}) => {
  // Cursor position
  useEffect(() => {
    console.log("UI HELPER MOUNTED");

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
  }, []);

  // Detect overlaping when drag selecting
  useEffect(() => {
    if (isDragSelect) {
      var detectOverlapOnMoveHandler = (e) => {
        var desktopFiles = [...files].filter((_file) => {
          return _file.folder == 0 && !_file.hidden;
        });
        desktopFiles.map((_file) => {
          // Detect if file pos overlap drag select box
          let posX = viewport.x - _file.pos.x - iconWidth / 2;
          let posY = _file.pos.y + iconWidth / 2;

          var isOverlapX = () => {
            // Moving cursor to right
            if(e.clientX > dragSelect.x){
              return posX > dragSelect.x - iconWidth &&
                posX < e.clientX
            }else{
              return posX < dragSelect.x - iconWidth &&
                posX > e.clientX
            }
          }

          var isOverlapY = () => {
            if(e.clientY > dragSelect.y){
              return posY > dragSelect.y - iconWidth &&
                posY < e.clientY
            }else{
              return posY < dragSelect.y - iconWidth &&
                posY > e.clientY
            }
          }

          if (
            isOverlapX() 
            && isOverlapY()
          )
            selectFile(_file.id);
          else deselectFile(_file.id);
        });
      };
      document.body.addEventListener("mousemove", detectOverlapOnMoveHandler);

      return () =>
        document.body.removeEventListener(
          "mousemove",
          detectOverlapOnMoveHandler
        );
    }
  }, [isDragSelect]);

  // Background mouse select drag
  useEffect(() => {
    var mouseDownHandler = (e) => {
      setCursor({
        x: e.clientX,
        y: e.clientY,
      });
      startDragSelect({ x: e.clientX, y: e.clientY });
    };
    wallpaperRef.current.addEventListener("mousedown", mouseDownHandler);
    return () => {
      wallpaperRef.current.removeEventListener("mousedown", mouseDownHandler);
    };
  }, [wallpaperRef]);

  return null;
};

const mapStateToProps = (state) => ({
  viewport: state.viewport,
  files: state.files,
  isDragSelect: state.isDragSelect,
  dragSelect: state.dragSelect,
  iconWidth: state.iconWidth,
});

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
  startDragSelect: (pos) => {
    dispatch({
      type: "START_DRAG_SELECT",
      payload: pos,
    });
  },
  selectFile: (id) => {
    dispatch({
      type: "SELECT_FILE",
      payload: {
        id,
      },
    });
  },
  deselectFile: (id) => {
    dispatch({
      type: "DESELECT_FILE",
      payload: {
        id,
      },
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UiHelper);
