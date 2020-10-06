import React from "react";
import { connect } from "react-redux";
import Window from "./Window";

let Windows = ({ windows }) => {
  return (
    <>
      {windows.map((_file, _index) => (
        <Window key={_file.id} file={_file} />
      ))}
    </>
  );
};

const mapStateToProps = (state) => ({
  windows: state.windows,
});

export default connect(mapStateToProps, null)(Windows);
