import styled from "styled-components";
import React, { FunctionComponent, memo } from "react";
import { SearchBox } from "./components/SearchBox";

export type TopBarProps = {};

export const Topbar: FunctionComponent<TopBarProps> = memo((props) => {
  const { ...rest } = props;
  return (
    <Root>
      <SearchBox />
    </Root>
  );
});

const Root = styled.div`
  grid-area: topbar;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
