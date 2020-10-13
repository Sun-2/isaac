import styled from "styled-components";
import React, { FunctionComponent, memo } from "react";
import { SearchBox } from "./components/SearchBox";
import { GithubLink } from "./components/GithubLink";

export type TopBarProps = {};

export const Topbar: FunctionComponent<TopBarProps> = memo((props) => {
  const { ...rest } = props;
  return (
    <Root>
      <GithubLink target="_blank" href={"https://github.com/Sun-2/isaac"}>
        View on GitHub
      </GithubLink>
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
  position: relative;
`;
