import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
// import { Tooltip } from "react-tippy";

import { ReactComponent as Signature } from "./About/svg/III_signature.svg";
import { ReactComponent as ResumeIcon } from "./About/svg/briefcase.svg";
import { ReactComponent as InstagramLogo } from "./About/svg/instagram.svg";
import { ReactComponent as GithubLogo } from "./About/svg/github.svg";

let Wrapper = styled.div`
  padding: 30px 40px 30px 40px;
  float: left;
  width: 100%;
`;
let Text = styled.div`
  ${(props) => (props.marginTop ? `margin-top: ${props.marginTop}px;` : "")}
  ${(props) =>
    props.marginBottom ? `margin-bottom: ${props.marginBottom}px;` : ""}
  ${(
    props
  ) => (props.fontSize ? `font-size: ${props.fontSize}px;` : "")}
  ${(props) =>
    props.center ? `text-align: center;` : ""}
    ${(props) =>
    props.lineHeight
      ? `line-height: ${props.lineHeight}px;`
      : ""}
    float: left;
  width: 100%;
  ${(props) => (props.textSelect ? "" : " user-select: none;")}

  strong {
    font-weight: 500;
  }
`;
let SignatureWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 17px 0 25px;
`;
let LinksWrapper = styled.div`
  display: flex;
  justify-content: center;
  float: left;
  width: 100%;
  margin: 17px 0 0;
  flex-wrap: wrap;
`;
let Link = styled.div`
  display: flex;
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 5px 9px 4px 9px;
  margin: 6px;
  cursor: pointer;
  ${(props) =>
    props.isSmallerScreen
      ? `
  // flex-direction: column;
  // align-items: center;
  // text-align: center;
  `
      : ""}
`;
let Icon = styled.div`
  margin-right: 7px;
  // margin-right: ${(props) => (props.isSmallerScreen ? "0" : "7px")};
`;

let Resume = ({ openFile, viewport }) => {
  const isSmallerScreen = viewport.x < 710;
  let openResume = (e) => {
    openFile(18);
  };
  let openInstagram = (e) => {
    window.open("https://www.instagram.com/kuurse/", "_blank");
  };
  let openGithub = (e) => {
    window.open("https://github.com/iamkrs", "_blank");
  };
  return (
    <Wrapper>
      <SignatureWrapper>
        <Signature width={270} />
      </SignatureWrapper>
      <Text marginBottom={1} fontSize={27} center>
        <strong>Kuurse</strong>
      </Text>
      <Text marginBottom={1} center textSelect>
        lucas.kurse@hotmail.com
      </Text>
      <Text marginBottom={15} center>
        Illustrator / developer / designer
      </Text>
      <Text marginBottom={18} center>
        Welcome to my operating system, project that I am coding with a mission
        to merge all kind of stuff that i want just in one place.
      </Text>
      <Text marginBottom={15} center>
        <strong>Please be free to explore everything.</strong>
      </Text>
      <LinksWrapper>
        <Link onClick={openInstagram} isSmallerScreen={isSmallerScreen}>
          <Icon isSmallerScreen={isSmallerScreen}>
            <InstagramLogo width={15} />
          </Icon>
          <Text fontSize={13} lineHeight={18}>
            <strong>Follow me on Instagram</strong>
          </Text>
        </Link>
        <Link onClick={openGithub} isSmallerScreen={isSmallerScreen}>
          <Icon isSmallerScreen={isSmallerScreen}>
            <GithubLogo width={15} />
          </Icon>
          <Text fontSize={13} lineHeight={18}>
            <strong>Github</strong>
          </Text>
        </Link>
        <Link last onClick={openResume} isSmallerScreen={isSmallerScreen}>
          <Icon isSmallerScreen={isSmallerScreen}>
            <ResumeIcon width={15} />
          </Icon>
          <Text fontSize={13} lineHeight={18}>
            <strong>My resume</strong>
          </Text>
        </Link>
      </LinksWrapper>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  files: state.files,
  cursor: state.cursor,
  viewport: state.viewport,
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

export default connect(mapStateToProps, mapDispatchToProps)(Resume);
