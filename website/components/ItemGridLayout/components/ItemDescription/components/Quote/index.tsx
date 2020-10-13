import styled from "styled-components";
import { FunctionComponent } from "react";

export const Quote: FunctionComponent = (props) => (
  <Text>
    <Quotemark>-</Quotemark>
    {props.children}
    <Quotemark>-</Quotemark>
  </Text>
);

const Quotemark = styled.span`
  color: #94705e;
  font-size: 75%;
  margin: 0 4px;
`;

const Text = styled.h2`
  color: #a59b96;
  text-align: center;
  margin-top: -1.6rem;
  font-size: 2.5rem;
  letter-spacing: 2px;
  font-family: ${({ theme }) => theme.typography.families.isaac};
`;
