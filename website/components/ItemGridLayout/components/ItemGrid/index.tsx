import React, { FunctionComponent, memo } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getVisibleItems } from "../../../../store/slices/itemView";
import { ItemIcon } from "./components/ItemIcon";

export type ItemGridProps = {};

export const ItemGrid: FunctionComponent<ItemGridProps> = memo((props) => {
  const { ...rest } = props;

  const visibleItemNames = useSelector(getVisibleItems);

  return (
    <Root>
      {visibleItemNames.map((itemName) => (
        <ItemIcon key={itemName} itemName={itemName} />
      ))}
    </Root>
  );
});

const Root = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
`;
