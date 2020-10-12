import React, { FunctionComponent, memo, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getSingleItemData } from "../../../../../../store/slices/itemView/selectors";
import { animated } from "react-spring";
import Link from "next/link";

export type ItemIconProps = {
  item: string;
  visible?: boolean;
};

export const ItemIcon: FunctionComponent<ItemIconProps> = memo((props) => {
  const { visible, item, ...rest } = props;

  const itemData = useSelector(getSingleItemData(item));

  return (
    <Root visible={visible} {...rest}>
      <Link href={itemData.href}>
        <Img referrerPolicy={"no-referrer"} src={itemData.imageLink} />
      </Link>
    </Root>
  );
});

const Root = styled(animated.div)<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "block" : "none")};
`;
Root.defaultProps = {
  visible: true,
};

const Img = styled.img`
  image-rendering: pixelated;
  outline: none;
  border: none;
  margin: 0;
  width: 100%;
  height: 100%;
`;
