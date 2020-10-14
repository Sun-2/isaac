import styled from "styled-components";
import React, { memo } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";
import {
  getSortDirection,
  getSortField,
} from "../../../../../../store/slices/itemView/selectors";
import { useAppDispatch } from "../../../../../../store/useAppDispatch";
import { itemView } from "../../../../../../store/slices/itemView/itemView";
import { useDomQuery } from "../../../../../../utils/useDomQuery";

const sortOptions = [
  {
    value: "asc",
    label: "Ascending",
  },
  { value: "desc", label: "Descending" },
];

export const SortDirectionSelect = memo(() => {
  const menuPortalTarget = useDomQuery<HTMLDivElement>([
    "#popup-container",
    "body",
  ]);

  const sortField = useSelector(getSortDirection);
  const dispatch = useAppDispatch();
  const onChange = ({ value }) =>
    dispatch(itemView.actions.setSortDirection(value));

  return (
    <Root>
      <label htmlFor="sort-direction-select">Sort direction</label>
      <Select
        id="sort-direction-select"
        value={sortOptions.find((x) => x.value === sortField)}
        onChange={onChange}
        options={sortOptions}
        menuPortalTarget={menuPortalTarget}
      />
    </Root>
  );
});


const Root = styled.div`
  margin-right: 20px;
  width: 200px;
  font-family: ${({theme}) => theme.typography.families.isaac};
`;
