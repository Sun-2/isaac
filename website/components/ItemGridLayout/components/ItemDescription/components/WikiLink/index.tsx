import styled from "styled-components";

export const WikiLink = styled.a`
  display: block;
  text-align: center;
  color: #6b5757;
  z-index: 2;
  position: relative;

  font-family: ${({ theme }) => theme.typography.families.isaac};

  &:active {
    color: #3e3535;
  }
`;
