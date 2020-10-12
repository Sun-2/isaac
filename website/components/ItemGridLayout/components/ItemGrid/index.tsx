import React, { FunctionComponent, memo } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { ItemIcon } from "./components/ItemIcon";
import { getItemsWithVisility } from "../../../../store/slices/itemView/selectors";

export type ItemGridProps = {};

export const ItemGrid: FunctionComponent<ItemGridProps> = memo((props) => {
  const { ...rest } = props;

  const itemsWithVisibility = useSelector(getItemsWithVisility);

  return (
    <Root>
      {itemsWithVisibility.map(({ visible, name }, i) => (
        <ItemIcon item={name} visible={visible} />
      ))}
    </Root>
  );
});

const Root = styled.div`
  max-height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  overflow-y: scroll;
`;
