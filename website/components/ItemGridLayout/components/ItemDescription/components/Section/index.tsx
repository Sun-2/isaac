import styled from "styled-components";

export const Section = styled.div`
  font-size: 1.8rem;
  & ul {
    margin-top: 32px;
    cursor: text;
    padding-left: 1.4rem;
  }

  & li {
    margin-top: 12px;
  }

  & ul ul {
    margin-top: 16px;
  }

  & li li {
    margin-top: 8px;
  }

  & .tooltip {
    white-space: nowrap;
  }

  & .tooltip img {
    transform: translateY(30%);
    width: 40px;
    height: auto;
    margin-left: -3px;
    margin-right: -8px;
    margin-top: -40%;
  }

  & a {
    color: rgb(193 185 71);
  }

  & a:active {
    color: rgb(208 133 68);
  }
`;
