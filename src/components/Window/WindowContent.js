import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Blank from "../Blank";
import Folder from "../Folder";
import About from "../About";
import Resume from "../Resume";
import Gallery from "../Gallery";
import ImageViewer from "../ImageViewer";
import MusicPlayer from "../MusicPlayer";
import TextEdit from "../TextEdit";

let StyledWindowContent = styled.div`
  float: left;
  height: calc(100% - 33px);
  width: 100%;
  overflow: auto;
  position: absolute;
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

let WindowContent = ({ file, files, children }) => {
  useEffect(() => {
    console.log("WindowContent Mounting...");

    return () => {
      console.log("WindowContent UN-Mounting...");
    };
  }, []);

  const apps = {
    Blank: Blank,
    Folder: Folder,
    About: About,
    Resume: Resume,
    Gallery: Gallery,
    ImageViewer: ImageViewer,
    MusicPlayer: MusicPlayer,
    TextEdit: TextEdit,
  };

  const WindowContentApp = apps[file.window.app]
    ? apps[file.window.app]
    : apps["Blank"];

  return (
    <StyledWindowContent>
      <WindowContentApp file={file} />
      {children}
    </StyledWindowContent>
  );
};

const mapStateToProps = (state) => ({
  files: state.files,
});

const mapDispatchToProps = (dispatch) => ({});

// export default WindowContent;
export default connect(mapStateToProps, mapDispatchToProps)(WindowContent);
