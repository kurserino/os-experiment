import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Masonry from "react-masonry-css";

let Wrapper = styled.div`
  padding: 20px 20px;
  user-select: none;
  float: left;
  width: 100%;
`;

const MasonryWrapper = styled.div`
  .my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    width: auto;
  }
  .my-masonry-grid_column {
    padding: 7px; /* gutter size */
    background-clip: padding-box;
  }

  /* Style your items */
  .my-masonry-grid_column > img {
    /* change div to reference your elements you put in <Masonry> */
    margin-bottom: 12px;
  }
`;

let StyledIllustration = styled.img`
  width: 100%;
  cursor: pointer;
`;

const breakpointColumnsObj = {
  default: 4,
  710: 3,
};

let Illustration = ({ file, openFile }) => {
  let clickHandler = (e) => {
    let isLeftButton = e.button === 0;

    if (isLeftButton) {
      openFile(file.id);
    }
  };
  return <StyledIllustration src={file.data.src} onClick={clickHandler} />;
};

let Gallery = ({ illustrations, openFile }) => {
  return (
    <Wrapper>
      <MasonryWrapper>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {illustrations.map((_file, _index) => (
            <Illustration file={_file} key={_index} openFile={openFile} />
          ))}
        </Masonry>
      </MasonryWrapper>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  illustrations: state.files
    .filter((_file) => _file.folder === 7)
    .sort((a, b) => a.id - b.id),
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

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
