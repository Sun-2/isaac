import React, {
  FunctionComponent,
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { ItemIcon } from "./components/ItemIcon";
import { getItemsWithVisibility } from "../../../../store/slices/itemView/selectors";

export type ItemGridProps = {};

export const ItemGrid: FunctionComponent<ItemGridProps> = memo((props) => {
  const { ...rest } = props;

  const itemsWithVisibility = useSelector(getItemsWithVisibility);

  return (
    <Root>
      {itemsWithVisibility.map(({ visible, name }, i) => (
        <ItemIcon item={name} visible={visible} key={name}/>
      ))}
    </Root>
  );
});

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  overflow-x: hidden;
  overflow-y: scroll;
`;
