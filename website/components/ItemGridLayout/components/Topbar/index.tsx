import styled from "styled-components";
import React, { FunctionComponent, memo } from "react";
import { SearchBox } from "./components/SearchBox";
import { GithubLink } from "./components/GithubLink";
import { SortFieldSelect } from "./components/SortingSelects/SortFieldSelect";
import { SortDirectionSelect } from "./components/SortingSelects/SortDirectionSelect";

export type TopBarProps = {};

export const Topbar: FunctionComponent<TopBarProps> = memo((props) => {
  const { ...rest } = props;
  return (
    <Root>
      <GithubLink target="_blank" href={"https://github.com/Sun-2/isaac"}>
        View on GitHub
      </GithubLink>
      <Container>
        <SortDirectionSelect />
        <SortFieldSelect />
      </Container>
      <Container>
        <SearchBox />
      </Container>
      <Container></Container>
    </Root>
  );
});

const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Root = styled.div`
  grid-area: topbar;
  height: 120px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  position: relative;
`;
