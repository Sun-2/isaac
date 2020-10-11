import React, { FunctionComponent } from "react";
import styled from "styled-components";

export type ItemIconProps = {
  itemName: string;
};

export const ItemIcon: FunctionComponent<ItemIconProps> = (props) => {
  const { ...rest } = props;

  return <Root></Root>;
};

const Root = styled.div`
  width: 50px;
  height: 50px;
  
  background-color: red;
  &:nth-child(odd) {
    background-color: green;
  }
`;
