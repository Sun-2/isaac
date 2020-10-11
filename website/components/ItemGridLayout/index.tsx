import React, {FunctionComponent} from "react";
import styled from "styled-components";
import {media} from "../../styles/media";
import {Topbar} from "./components/Topbar";
import {ItemGrid} from "./components/ItemGrid";
import {GridSlot} from "../../utils/GridSlot";

export const ItemGridLayout: FunctionComponent = (props) => {
  const { children, ...rest } = props;

  return (
    <Root {...rest}>
      <GridSlot gridArea="topbar">
        <Topbar />
      </GridSlot>
      <GridSlot gridArea="item-grid">
        <ItemGrid />
      </GridSlot>
      <DescriptionSlotWrapper gridArea="item-description">
        {children}
      </DescriptionSlotWrapper>
    </Root>
  );
};

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
    grid-template-columns: 400px 1fr;
    grid-template-rows: auto 1fr;

    grid-template-areas: "item-description topbar" "item-description item-grid";
  }
`;
