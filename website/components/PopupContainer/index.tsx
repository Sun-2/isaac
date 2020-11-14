import styled from "styled-components";
import React from "react";

export const PopupContainer = () => <Root id="popup-container" />;

export const Root = styled.div`
  z-index: 1000;
  position: fixed;
`;
