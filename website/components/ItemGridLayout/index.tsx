import React, { FunctionComponent, useEffect } from "react";
import styled from "styled-components";
import { media } from "../../styles/media";
import { Topbar } from "./components/Topbar";
import { ItemGrid } from "./components/ItemGrid";
import { GridSlot } from "../../utils/GridSlot";
import { ItemDataLoader } from "./components/ItemDataLoader";
import { animated, config, useTransition } from "react-spring";
import { useRouter } from "next/router";


export const ItemGridLayout: FunctionComponent = (props) => {
  const { children, ...rest } = props;

  const router = useRouter();

  const transition = useTransition(children, (item) => router.asPath, {
    from: { opacity: 0, position: "static", height: "100%" },
    enter: { opacity: 1, position: "static", height: "100%" },
    leave: { opacity: 0, position: "absolute", height: "0%" },
    unique: true,
    immediate: (key) => key === "height",
    config: config.gentle,
  });

  return (
    <Root {...rest}>
      <GridSlot gridArea="topbar">
        <Topbar />
      </GridSlot>
      <GridSlot gridArea="item-grid">
        <ItemGrid />
        <ItemDataLoader />
      </GridSlot>
      <DescriptionSlotWrapper gridArea="item-description">
        {transition.map(({ item, key, props }) => (
          <Wrapper key={key} style={props}>
            {item}
          </Wrapper>
        ))}
      </DescriptionSlotWrapper>

    </Root>
  );
};

const Wrapper = styled(animated.div)`
  direction: rtl;
  height: 100%;

  overflow-y: scroll;
`;

const DescriptionSlotWrapper = styled(GridSlot)`
  display: none;
  ${media.md} {
    display: unset;
  }
`;

const Root = styled.div`
  height: 100vh;
  display: grid;

  grid-template-rows: auto 1fr;
  grid-template-areas: "topbar" "item-grid";

  ${media.md} {
    grid-template-columns: 500px 1fr;
    grid-template-rows: auto 1fr;

    grid-template-areas: "item-description topbar" "item-description item-grid";
  }
`;
