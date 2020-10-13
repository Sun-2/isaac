import styled from "styled-components";

export const ItemName = styled.h1<{ itemId: number }>`
  text-align: center;
  font-size: 5rem;
  letter-spacing: 0.3rem;
  font-family: ${({ theme }) => theme.typography.families.isaac};

  color: #ffefe5;
  position: relative;
  margin-top: 0.8rem;
  line-height: 4rem;

  &::after {
    position: absolute;
    display: block;
    color: #a04325;
    content: "ID${({ itemId }) => itemId}";
    top: -3rem;
    right: 3rem;
    font-size: 40%;
  }
`;
