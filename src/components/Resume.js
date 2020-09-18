import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Tooltip } from "react-tippy";

import { ReactComponent as ReactLogo } from "./Resume/svg/react.svg";
import { ReactComponent as ReduxLogo } from "./Resume/svg/redux.svg";
import { ReactComponent as NodeJsLogo } from "./Resume/svg/nodejs.svg";
import { ReactComponent as SassLogo } from "./Resume/svg/sass.svg";
import { ReactComponent as GulpLogo } from "./Resume/svg/gulp.svg";
import { ReactComponent as KnockoutJsLogo } from "./Resume/svg/knockoutjs.svg";
import { ReactComponent as MagentoLogo } from "./Resume/svg/magento.svg";
import { ReactComponent as GitLogo } from "./Resume/svg/git.svg";
import { ReactComponent as NginxLogo } from "./Resume/svg/nginx.svg";
import { ReactComponent as PhpLogo } from "./Resume/svg/php.svg";
import { ReactComponent as MongoDbLogo } from "./Resume/svg/mongodb.svg";
import { ReactComponent as ExpressLogo } from "./Resume/svg/express.svg";

import { ReactComponent as PhotoshopLogo } from "./Resume/svg/photoshop.svg";
import { ReactComponent as IllustratorLogo } from "./Resume/svg/illustrator.svg";
import { ReactComponent as ProcreateLogo } from "./Resume/svg/procreate.svg";
import { ReactComponent as FigmaLogo } from "./Resume/svg/figma.svg";
import { ReactComponent as GodotLogo } from "./Resume/svg/godot.svg";

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
  ) =>
    props.fontSize ? `font-size: ${props.fontSize}px;` : ""}

    float: left;
  width: 100%;
  ${(props) => (props.textSelect ? "" : " user-select: none;")}
  strong {
    font-weight: 500;
  }
`;

let Skill = styled.div`
  float: left;
  margin-right: 18px;
  margin-bottom: 14px;

  ${(props) => (props.marginTop ? `margin-top: ${props.marginTop}px;` : "")}
  ${(props) =>
    props.translateY ? `transform: translateY(${props.translateY}px);` : ""}
`;

let Resume = (props) => {
  return (
    <Wrapper>
      <Text marginBottom={6} fontSize={22}>
        <strong>Kuurse</strong>
      </Text>
      <Text>Lucas Ruivo Maturo</Text>
      <Text>Curitiba, PR - Brazil</Text>
      <Text>Illustrator / developer / designer</Text>
      <Text marginBottom={30} textSelect>lucas.kurse@hotmail.com</Text>
      <Text marginBottom={10}>
        <strong>WORK EXPERIENCE</strong>
      </Text>
      <Text marginBottom={3}>
        <strong>JUL 2018 ~ SEP 2020</strong> - Frontend Developer - Octo
        Commerce
      </Text>
      <Text marginBottom={3}>
        <strong>AUG 2017 ~ JUN 2018</strong> - Frontend Developer - Global Full
        Commerce
      </Text>
      <Text marginBottom={3}>
        <strong>SEP 2014 ~ JUL 2017</strong> - Web Designer - Agência Magento
      </Text>
      <Text marginBottom={3}>
        <strong>OCT 2013 ~ AUG 2014</strong> - Designer - Agência Saru
      </Text>
      <Text marginBottom={3}>
        <strong>JUL 2012 ~ SEP 2013</strong> - Designer - AWIN, Animal Welfare
        Indicators
      </Text>
      <Text marginBottom={30}>
        <strong>JAN 2012 ~ JUN 2012</strong> - Designer - Duo Design
      </Text>
      <Text marginBottom={10}>
        <strong>EDUCATION</strong>
      </Text>
      <Text marginBottom={30}>
        Graphic design bachelor degree @ Universidade Positivo (Curitiba Brazil)
      </Text>
      <Text marginBottom={18}>
        <strong>DEVELOPMENT SKILLS</strong>
      </Text>
      <Skill>
        <Tooltip
          title="React"
          animation="none"
          position="bottom"
          followCursor={true}
          trigger="mouseenter"
          delay={0}
        >
          <ReactLogo height={45} />
        </Tooltip>
      </Skill>

      <Skill>
        <Tooltip
          title="Redux"
          animation="none"
          position="bottom"
          followCursor={true}
          trigger="mouseenter"
          delay={0}
        >
          <ReduxLogo height={45} />
        </Tooltip>
      </Skill>

      <Skill marginTop={-4} translateY={3}>
        <Tooltip
          title="NodeJS"
          animation="none"
          position="bottom"
          followCursor={true}
          trigger="mouseenter"
          delay={0}
        >
          <NodeJsLogo height={49} />
        </Tooltip>
      </Skill>

      <Skill>
        <Tooltip
          title="Sass"
          animation="none"
          position="bottom"
          followCursor={true}
          trigger="mouseenter"
          delay={0}
        >
          <SassLogo height={45} />
        </Tooltip>
      </Skill>

      <Skill translateY={4} marginTop={-11}>
        <Tooltip
          title="Gulp"
          animation="none"
          position="bottom"
          followCursor={true}
          trigger="mouseenter"
          delay={0}
        >
          <GulpLogo height={56} />
        </Tooltip>
      </Skill>

      <Skill>
        <Tooltip
          title="KnockoutJS"
          animation="none"
          position="bottom"
          followCursor={true}
          trigger="mouseenter"
          delay={0}
        >
          <KnockoutJsLogo height={45} />
        </Tooltip>
      </Skill>

      <Skill translateY={3}>
        <Tooltip
          title="Magento 1"
          animation="none"
          position="bottom"
          followCursor={true}
          trigger="mouseenter"
          delay={0}
        >
          <MagentoLogo height={45} />
        </Tooltip>
      </Skill>

      <Skill>
        <Tooltip
          title="Git"
          animation="none"
          position="bottom"
          followCursor={true}
          trigger="mouseenter"
          delay={0}
        >
          <GitLogo height={45} />
        </Tooltip>
      </Skill>

      <Skill>
        <Tooltip
          title="Nginx"
          animation="none"
          position="bottom"
          followCursor={true}
          trigger="mouseenter"
          delay={0}
        >
          <NginxLogo height={45} />
        </Tooltip>
      </Skill>

      <Skill>
        <Tooltip
          title="Php"
          animation="none"
          position="bottom"
          followCursor={true}
          trigger="mouseenter"
          delay={0}
        >
          <PhpLogo height={45} />
        </Tooltip>
      </Skill>

      <Skill translateY={-2}>
        <Tooltip
          title="MongoDb"
          animation="none"
          position="bottom"
          followCursor={true}
          trigger="mouseenter"
          delay={0}
        >
          <MongoDbLogo height={45} />
        </Tooltip>
      </Skill>

      <Skill>
        <Tooltip
          title="Express"
          animation="none"
          position="bottom"
          followCursor={true}
          trigger="mouseenter"
          delay={0}
        >
          <ExpressLogo height={45} />
        </Tooltip>
      </Skill>

      <Text marginBottom={15} marginTop={10}>
        <strong>SOFTWARE SKILLS</strong>
      </Text>

      <Skill>
        <Tooltip
          title="Photoshop"
          animation="none"
          position="bottom"
          followCursor={true}
          trigger="mouseenter"
          delay={0}
        >
          <PhotoshopLogo height={45} />
        </Tooltip>
      </Skill>
      <Skill>
        <Tooltip
          title="Illustrator"
          animation="none"
          position="bottom"
          followCursor={true}
          trigger="mouseenter"
          delay={0}
        >
          <IllustratorLogo height={45} />
        </Tooltip>
      </Skill>
      <Skill>
        <Tooltip
          title="Procreate"
          animation="none"
          position="bottom"
          followCursor={true}
          trigger="mouseenter"
          delay={0}
        >
          <ProcreateLogo height={45} />
        </Tooltip>
      </Skill>
      <Skill>
        <Tooltip
          title="Figma"
          animation="none"
          position="bottom"
          followCursor={true}
          trigger="mouseenter"
          delay={0}
        >
          <FigmaLogo height={45} />
        </Tooltip>
      </Skill>
      <Skill>
        <Tooltip
          title="Godot"
          animation="none"
          position="bottom"
          followCursor={true}
          trigger="mouseenter"
          delay={0}
        >
          <GodotLogo height={45} />
        </Tooltip>
      </Skill>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  files: state.files,
  cursor: state.cursor,
});

const mapDispatchToProps = (dispatch) => ({
  setWindowTop: (id, dragging) => {
    dispatch({
      type: "SET_WINDOW_TOP",
      payload: {
        id,
      },
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Resume);
