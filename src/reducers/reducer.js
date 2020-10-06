import files from "./files";

const defaultState = {
  cursor: {
    x: 0,
    y: 0,
  },
  viewport: {
    x: 0,
    y: 0,
  },
  clockTime: new Date().getTime(),
  dockFolderId: 5,
  iconWidth: 70,
  dockIconWidth: 60,
  menuBarItemOpened: null,
  windows: [],
  files,
};

const reducer = (state = defaultState, action) => {
  var windows, files, sortingRef;
  switch (action.type) {
    case "SET_CURSOR":
      windows = [...state.windows].map((_file) => {
        if (_file.window.isDragging && action.payload.y > 23) {
          _file.window.pos = {
            x:
              _file.window.pos.x - (_file.window.dragging.x - action.payload.x),
            y:
              _file.window.pos.y - (_file.window.dragging.y - action.payload.y),
          };
          _file.window.dragging = {
            x: action.payload.x,
            y: action.payload.y,
          };
        }
        return _file;
      });

      files = [...state.files].map((_file) => {
        if (_file.isDragging && _file.folder === 0) {
          _file.pos = {
            x:
              _file.folder === 0
                ? _file.pos.x + (_file.dragging.x - action.payload.x)
                : _file.pos.x - (_file.dragging.x - action.payload.x),
            y: _file.pos.y - (_file.dragging.y - action.payload.y),
          };
          _file.dragging = {
            x: action.payload.x,
            y: action.payload.y,
          };
        }
        if (_file.isDragging && _file.folder !== 0) {
          // Calculate folder window offset
          let _folder = state.files.find((f) => f.id === _file.folder);
          let _offset = {
            top: _folder.window.pos.y,
            right:
              state.viewport.x - _folder.window.pos.x - _folder.window.width,
            bottom:
              state.viewport.y - _folder.window.pos.y - _folder.window.height,
            left: _folder.window.pos.x,
          };
          if (
            action.payload.x > _offset.left &&
            action.payload.x < state.viewport.x - _offset.right &&
            action.payload.y > _offset.top &&
            action.payload.y < state.viewport.y - _offset.bottom
          ) {
            _file.pos = {
              x: _file.pos.x - (_file.dragging.x - action.payload.x),
              y: _file.pos.y - (_file.dragging.y - action.payload.y),
            };
            _file.dragging = {
              x: action.payload.x,
              y: action.payload.y,
            };
          }
        }
        return _file;
      });
      return {
        ...state,
        cursor: action.payload,
        files,
        windows,
      };
    case "SET_VIEWPORT":
      return {
        ...state,
        viewport: action.payload,
      };
    case "OPEN_MENUBAR_ITEM":
      return {
        ...state,
        menuBarItemOpened: action.payload,
      };
    case "MOUSE_DOWN":
      // Deselect files
      var isFileIcon = action.payload.path.find((_path) => {
        var className = String(_path.className);
        return className && className.indexOf("fileIcon") > -1;
      });
      files = [...state.files].map((_file) => {
        if (!isFileIcon) {
          _file.isSelected = false;
          _file.isClicked = false;
        } else {
          _file.isSelected = _file.isSelected ? _file.isSelected : false;
        }
        return _file;
      });
      return {
        ...state,
        files,
      };
    case "CLOSE_MENUBAR_ITEM":
      return {
        ...state,
        menuBarItemOpened: null,
      };
    case "MOUSE_UP":
      windows = [...state.windows].map((_file) => {
        _file.window.isDragging = false;
        return _file;
      });
      files = [...state.files].map((_file) => {
        _file.isDragging = false;
        return _file;
      });
      return {
        ...state,
        windows,
        files,
      };
    case "SET_WINDOW_DRAGGING":
      sortingRef = [...state.windows].sort((a, b) => {
        if (a.window.zIndex > b.window.zIndex) return 1;
        if (b.window.zIndex > a.window.zIndex) return -1;
        return 0;
      });
      return {
        ...state,
        windows: [...state.windows]
          .map((_file, i) => {
            _file.window.zIndex =
              sortingRef.findIndex((_ref) => _ref.id === _file.id) + 1;
            _file.window.isDragging = false;
            if (action.payload.isDragging && _file.id === action.payload.id) {
              _file.window.isDragging = true;
              _file.window.zIndex = state.windows.length + 1;
              _file.window.dragging = {
                x: action.payload.dragging.x,
                y: action.payload.dragging.y,
              };
            }
            return _file;
          }),
      };
    case "SET_WINDOW_TOP":
      sortingRef = [...state.windows].sort((a, b) => {
        if (a.window.zIndex > b.window.zIndex) return 1;
        if (b.window.zIndex > a.window.zIndex) return -1;
        return 0;
      });
      windows = [...state.windows].map((_file, i) => {
        _file.window.zIndex =
          sortingRef.findIndex((_ref) => _ref.id === _file.id) + 1;

        if (_file.id === action.payload.id) {
          _file.window.zIndex = state.windows.length + 2;
        }
        return _file;
      });
      return {
        ...state,
        windows,
      };
    case "SELECT_FILE":
      files = [...state.files].map((_file) => {
        _file.isSelected = false;
        if (_file.id === action.payload.id) {
          _file.isSelected = new Date().getTime();
        }
        return _file;
      });
      return {
        ...state,
        files,
      };
    case "CLICK_FILE":
      files = [...state.files].map((_file) => {
        _file.isClicked = false;
        if (_file.id === action.payload.id) {
          _file.isClicked = new Date().getTime();
        }
        return _file;
      });
      return {
        ...state,
        files,
      };
    case "OPEN_FILE":
      files = [...state.files];
      var file = files.find((_file) => _file.id === action.payload.id);
      windows = [...state.windows];
      var isFileOpen = windows.find((_file) => _file.id === file.id);

      if (!isFileOpen && file.window) {
        // file.window.zIndex = windows.length + 1;
        let higherZindex = state.windows.length ? Math.max.apply(
          Math,
          state.windows.map((o) => o.window.zIndex)
        ) : 0;
        file.window.zIndex = higherZindex + 1;
        windows.push(file);
      } else {
        // Move opened window to top
        sortingRef = [...state.windows].sort((a, b) => {
          if (a.window.zIndex > b.window.zIndex) return 1;
          if (b.window.zIndex > a.window.zIndex) return -1;
          return 0;
        });
        windows = windows.map((_file, i) => {
          // _file.window.zIndex = i + 1;
          _file.window.zIndex =
            sortingRef.findIndex((_ref) => _ref.id === _file.id) + 1;
          if (_file.id === file.id) {
            _file.window.zIndex = state.windows.length + 1;
          }
          return _file;
        });
      }

      // Deselect opened file
      files = files.map((_file) => {
        _file.isSelected = false;
        return _file;
      });

      return {
        ...state,
        windows,
        files,
      };
    case "CLOSE_WINDOW":
      // Remove from windows arr
      windows = [...state.windows].filter(
        (_file) => _file.id !== action.payload.file.id
      );

      // Save windows state in file
      files = [...state.files];
      let fileIndex = files.findIndex(
        (_file) => _file.id === action.payload.file.id
      );
      files[fileIndex] = action.payload.file;
      return {
        ...state,
        windows,
      };
    case "SET_FILE_DRAGGING":
      return {
        ...state,
        files: [...state.files]
          .sort((a, b) => {
            if (a.zIndex > b.zIndex) return 1;
            if (b.zIndex > a.zIndex) return -1;
            return 0;
          })
          .map((_file, i) => {
            _file.zIndex = i + 1;
            _file.isDragging = false;
            if (action.payload.isDragging && _file.id === action.payload.id) {
              _file.isDragging = true;
              _file.zIndex = state.files.length + 1;
              _file.dragging = {
                x: action.payload.dragging.x,
                y: action.payload.dragging.y,
              };
            }
            return _file;
          }),
      };
    case "SET_CLOCK_TIME":
      return {
        ...state,
        clockTime: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
