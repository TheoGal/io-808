// External Deps
import React from "react";
import * as stylex from "@stylexjs/stylex";

// Theme
import { tokens } from "theme/variables.stylex";
import { themeStyles } from "theme/styles";

// Sub-layouts
import TopLeftSection from "layouts/topLeftSection";
import TopRightSection from "layouts/topRightSection";
import BottomSection from "layouts/bottomSection";

// Components
import Octicon from "react-octicon";
import {
  ConnectedSaveButton,
  ConnectedLoadButton,
  ConnectedResetButton
} from "./connectedComponents";

const HelpLink = () => (
  <a
    {...stylex.props(styles.sideButton, styles.sideLink)}
    href="tutorial.html"
    target="_blank"
    rel="noopener noreferrer"
    title="Tutorial"
  >
    <Octicon
      {...stylex.props(styles.sideIcon)}
      name="question"
      mega
    />
  </a>
);

const GithubLink = () => (
  <a
    {...stylex.props(styles.sideButton, styles.sideLink)}
    href="https://github.com/TheoGal/io-808"
    target="_blank"
    rel="noopener noreferrer"
    title="GitHub repo - based on iO-808 by Vincent Riemer"
  >
    <Octicon
      {...stylex.props(styles.sideIcon)}
      name="mark-github"
      mega
    />
  </a>
);

// layout constants
const APP_WIDTH = 1400;
const APP_HEIGHT = 800;
const APP_PADDING = 40;

// Vertical button column to the left of the machine
const SIDEBAR_WIDTH = 50;
const SIDEBAR_GAP = 15;
const SIDE_BUTTON_HEIGHT = 35;

const TOP_BOTTOM_DIVIDER_HEIGHT = 3;
const TOP_HEIGHT = Math.ceil(APP_HEIGHT * 0.64) - TOP_BOTTOM_DIVIDER_HEIGHT * 2;
const BOTTOM_HEIGHT = APP_HEIGHT - TOP_HEIGHT - TOP_BOTTOM_DIVIDER_HEIGHT * 2;

const INSTRUMENT_SEPERATOR_WIDTH = 1;

const TOP_LEFT_WIDTH = Math.ceil(APP_WIDTH * 0.23) - INSTRUMENT_SEPERATOR_WIDTH;
const TOP_RIGHT_WIDTH = APP_WIDTH - TOP_LEFT_WIDTH;

const TOP_HORIZONTAL_SEPERATOR_HEIGHT = TOP_HEIGHT - 10;

// Scale the whole machine down to fit the browser window (never above 1x)
const WRAPPER_WIDTH = SIDEBAR_WIDTH + SIDEBAR_GAP + APP_WIDTH;
const FULL_WIDTH = WRAPPER_WIDTH + APP_PADDING;
const FULL_HEIGHT = APP_HEIGHT + APP_PADDING;

const getFitScale = () =>
  Math.min(1, window.innerWidth / FULL_WIDTH, window.innerHeight / FULL_HEIGHT);

const useFitScale = () => {
  const [scale, setScale] = React.useState(getFitScale);
  React.useEffect(() => {
    const onResize = () => setScale(getFitScale());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return scale;
};

const styles = stylex.create({
  pageWrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
    minWidth: FULL_WIDTH,
    minHeight: FULL_HEIGHT
  },

  wrapper: {
    position: "absolute",
    width: WRAPPER_WIDTH,
    height: APP_HEIGHT,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SIDEBAR_GAP
  },

  sidebar: {
    width: SIDEBAR_WIDTH,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: 10,
    paddingTop: TOP_BOTTOM_DIVIDER_HEIGHT
  },
  sideButton: {
    width: SIDEBAR_WIDTH,
    height: SIDE_BUTTON_HEIGHT,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 4,
    backgroundColor: tokens.buttonColor,
    color: tokens.darkGrey,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  sideLink: {
    boxShadow: tokens.buttonShadow,
    cursor: "pointer",
    textDecoration: "none",
    transition: "transform cubic-bezier(0.4, 0.0, 0.2, 1) .1s",
    transform: "scale(1.0)",
    ":hover": {
      boxShadow: tokens.buttonHoverShadow,
      transform: "scale(1.04)"
    }
  },
  sideIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: tokens.darkGrey,
    transform: "scale(0.8)"
  },
  resetButton: {
    paddingLeft: 0,
    paddingRight: 0
  },

  appWrapper: {
    width: APP_WIDTH,
    height: APP_HEIGHT,
    display: "flex",
    flexDirection: "column"
  },

  topBottomDivider: {
    width: APP_WIDTH,
    height: TOP_BOTTOM_DIVIDER_HEIGHT,
    backgroundColor: tokens.grey
  },

  topHorizontalDivider: {
    width: INSTRUMENT_SEPERATOR_WIDTH,
    height: TOP_HORIZONTAL_SEPERATOR_HEIGHT,
    backgroundColor: tokens.grey
  },

  topWrapper: {
    width: APP_WIDTH,
    height: TOP_HEIGHT,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },

  topLeftSection: {
    width: TOP_LEFT_WIDTH,
    height: TOP_HEIGHT
  },

  topRightSection: {
    width: TOP_RIGHT_WIDTH,
    height: TOP_HEIGHT
  },

  bottomWrapper: {
    width: APP_WIDTH,
    height: BOTTOM_HEIGHT
  },

  bottomSection: {
    width: APP_WIDTH,
    height: BOTTOM_HEIGHT
  }
});

const AppLayout = React.memo(
  () => {
    const scale = useFitScale();
    return (
      <div
        {...stylex.props(styles.pageWrapper)}
        style={{
          minWidth: FULL_WIDTH * scale,
          minHeight: FULL_HEIGHT * scale
        }}
      >
        <div
          {...stylex.props(styles.wrapper)}
          style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
        >
          <div {...stylex.props(styles.sidebar)}>
            <ConnectedLoadButton
              xstyle={styles.sideButton}
              iconXstyle={styles.sideIcon}
            />
            <ConnectedSaveButton
              xstyle={styles.sideButton}
              iconXstyle={styles.sideIcon}
            />
            <ConnectedResetButton
              xstyle={[styles.sideButton, styles.resetButton]}
            />
            <HelpLink />
            <GithubLink />
          </div>
          <div {...stylex.props(styles.appWrapper)}>
            <div {...stylex.props(styles.topBottomDivider)} />
            <div {...stylex.props(styles.topWrapper)}>
              <TopLeftSection xstyle={styles.topLeftSection} />
              <div {...stylex.props(styles.topHorizontalDivider)} />
              <TopRightSection xstyle={styles.topRightSection} />
              <div {...stylex.props(styles.topHorizontalDivider)} />
            </div>
            <div {...stylex.props(styles.topBottomDivider)} />
            <div {...stylex.props(styles.bottomWrapper)}>
              <BottomSection xstyle={styles.bottomSection} />
            </div>
          </div>
        </div>
      </div>
    );
  },
  () => true
);

export default AppLayout;
