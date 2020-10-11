import styled from "styled-components";

export const GridSlot = styled.div<{ gridArea: string }>`
  height: 100%;
  width: 100%;
  grid-area: ${(props) => props.gridArea};
`;