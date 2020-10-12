import styled from "styled-components";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useAppDispatch } from "../../../../store/useAppDispatch";
import { fetchItems } from "../../../../store/slices/itemView/thunks";
import { animated, useTransition } from "react-spring";

export const ItemDataLoader: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const [loaderState, setLoaderState] = useState("loading");

  useEffect(() => {
    (async () => {
      const minimumLoadingTime = 1500;
      try {
        await Promise.all([
          dispatch(fetchItems()),
          new Promise((res) => setTimeout(res, minimumLoadingTime)),
        ]);
        setLoaderState("done");
      } catch (e) {
        setLoaderState("error");
      }
    })();
  }, []);

  const transition = useTransition(
    loaderState,
    (loaderState) =>
      (loaderState === "loading" || loaderState === "error").toString(),
    {
      from: { opacity: 1 },
      enter: { opacity: 1, transform: `translate(-50%, -50%) scale(1)` },
      leave: {
        opacity: 0,
        transform: `translate(-50%, -50%) scale(0)`,
      },
      unique: true,
    }
  );

  return (
    <>
      {transition.map(
        ({ item, key, props }) =>
          key === "true" && (
            <Root key={key} style={props}>
              Downloading item definitions
            </Root>
          )
      )}
    </>
  );
};

export const Root = styled(animated.div)`
  position: absolute;
  top: 50%;

  left: 50%;

  height: 20px;
  max-width: 200px;
  width: 200px;
  text-align: center;
`;
