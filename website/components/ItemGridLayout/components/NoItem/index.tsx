import { FunctionComponent } from "react";
import styled from "styled-components";

export const NoItem: FunctionComponent = (props) => {
  const { ...rest } = props;

  return (
    <Root {...rest}>
      ¯\_(ツ)_/¯
      <br />
      <Subtitle>No such item</Subtitle>
    </Root>
  );
};

const Subtitle = styled.span`
  font-size: 1.5rem;
`;

const Root = styled.div`
  font-family: ;
  font-size: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  color: white;
`;
