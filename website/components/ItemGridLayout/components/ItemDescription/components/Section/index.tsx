import styled from "styled-components";

export const Section = styled.div`
  & ul {
    margin-top: 32px;
  }

  & li {
    margin-top: 16px;
  }

  & ul ul {
    margin-top: 16px;
  }

  & li li {
    margin-top: 8px;
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
    color: purple;
  }
`;
