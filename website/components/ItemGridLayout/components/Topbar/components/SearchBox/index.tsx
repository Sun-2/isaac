import React, {FunctionComponent} from "react";
import styled from "styled-components";
import {useAppDispatch} from "../../../../../../store/useAppDispatch";
import {useSelector} from "react-redux";
import {getSearchPhrase, itemView} from "../../../../../../store/slices/itemView";

export type SearchBoxProps = {  };

export const SearchBox: FunctionComponent<SearchBoxProps> = props => {
  const { ...rest } = props;

  const dispatch = useAppDispatch();
  const searchPhrase = useSelector(getSearchPhrase);

  const onChange = e => {
    const value = e.target.value;
    dispatch(itemView.actions.setSearchPhrase(value));
  }
  return <Input onChange={onChange} value={searchPhrase}/>;
};

const Input = styled.input`
  background-image: url("search-bar.webp");
  background-size: 100% 100%;
  background-color: transparent;
  outline: none;
  border: none;
  height: 90px;
  width: 676px;
  padding: 20px 40px;
  text-align: center;
`;