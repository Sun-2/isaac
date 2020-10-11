import { FunctionComponent, memo } from "react";
import styled from "styled-components";

export type ItemGridProps = {};

export const ItemGrid: FunctionComponent<ItemGridProps> = memo((props) => {
  const { ...rest } = props;

  return <Root>Hello!</Root>;
});

const Root = styled.div`
  grid-area: item-grid;
  background-color: pink;
`;
