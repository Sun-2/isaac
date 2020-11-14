import React, { FunctionComponent, memo, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getSingleItemData } from "../../../../../../store/slices/itemView/selectors";
import { animated, config, useSpring } from "react-spring";
import Link from "next/link";
import { useAppDispatch } from "../../../../../../store/useAppDispatch";
import { itemView } from "../../../../../../store/slices/itemView/itemView";

export type ItemIconProps = {
  item: string;
  visible?: boolean;
};

export const ItemIcon: FunctionComponent<ItemIconProps> = memo((props) => {
  const { visible, item, ...rest } = props;

  const itemData = useSelector(getSingleItemData(item));

  const springConfig = {
    mass: 1.2,
    tension: 500,
    friction: 23,
    precision: 0.2,
    velocity: 30,
  };
  const [springProps, setSpring] = useSpring(() => ({
    transform: `scale(1)`,
    config: springConfig,
  }));

  const onMouseEnter = () =>
    setSpring({
      transform: `scale(1.45)`,
      config: springConfig,
    });
  const onMouseLeave = () =>
    setSpring({
      transform: `scale(1)`,
      config: { ...springConfig, mass: 2.137 },
    });

  const dispatch = useAppDispatch();
  const onClick = () => dispatch(itemView.actions.setShowItemDescription(true));
  return (
    <Root
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      visible={visible}
      style={springProps}
      {...rest}
    >
      <Link href={item}>
        <Img
          onClick={onClick}
          alt={itemData.displayName}
          referrerPolicy={"no-referrer"}
          src={itemData.imageBase64}
        />
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

  cursor: pointer;
`;
