import { FunctionComponent, memo } from "react";
import styled from "styled-components";

export type ItemDescriptionProps = { itemName: string };

export const ItemDescription: FunctionComponent<ItemDescriptionProps> = memo(
  (props) => {
    const { ...rest } = props;

    return <Root>{}</Root>;
  }
);

const Root = styled.div`
  height: 100%;
`;