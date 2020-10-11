import { FunctionComponent } from "react";
import styled from "styled-components";

export type ItemDescriptionProps = { itemName: string };

export const ItemDescription: FunctionComponent<ItemDescriptionProps> = (
  props
) => {
  const { ...rest } = props;

  return <Root>{props.itemName}</Root>;
};

const Root = styled.div`
  background-color: yellow;
  grid-area: item-description;
`;
