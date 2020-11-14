import styled from "styled-components";
import { useDispatch } from "react-redux";
import { itemView } from "../../../../../../store/slices/itemView/itemView";
import { media } from "../../../../../../../../../x/fake-notification/website2/styles/media";
import React from "react";

export const CloseButton = () => {
  const dispatch = useDispatch();
  const onClick = () =>
    dispatch(itemView.actions.setShowItemDescription(false));

  return <Root onClick={onClick}>X</Root>;
};

export const Root = styled.button`
  position: fixed;
  top: 30px;
  right: 30px;
  font-size: 5rem;
  cursor: pointer;
  z-index: 3;
  border: none;
  background-color: transparent;
  outline: none;
  font-family: ${({ theme }) => theme.typography.families.isaac};

  color: ${({ theme }) => theme.typography.color.primary};
  &:active {
    color: ${({ theme }) => theme.typography.color.primary};
  }

  ${media.md} {
    display: none;
  }
`;
