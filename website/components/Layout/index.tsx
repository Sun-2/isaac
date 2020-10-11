import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { media } from "../../styles/media";
import { Topbar } from "../Topbar";
import { ItemDescription } from "../ItemDescription";
import { ItemGrid } from "../ItemGrid";

export const Layout: FunctionComponent = (props) => {
  const { children, ...rest } = props;

  return (
    <Root {...rest}>
      <Topbar />
      <ItemDescription />
      <ItemGrid />
      <DescriptionWrapper>{children}</DescriptionWrapper>
    </Root>
  );
};

const DescriptionWrapper = styled.div`
  grid-area: item-description;
`;

const Root = styled.div`
  height: 100vh;
  display: grid;

  grid-template-columns: auto 1fr;

  ${media.md} {
    grid-template-columns: 400px 1fr;
    grid-template-rows: auto 1fr;

    grid-template-areas: "item-description topbar" "item-description item-grid";
  }
`;
