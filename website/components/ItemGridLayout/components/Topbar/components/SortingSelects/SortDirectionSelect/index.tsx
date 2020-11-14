import styled, { useTheme } from "styled-components";
import React, { memo, useMemo } from "react";
import Select, { Styles } from "react-select";
import { useSelector } from "react-redux";
import {
  getSortDirection,
  getSortField,
} from "../../../../../../../store/slices/itemView/selectors";
import { useAppDispatch } from "../../../../../../../store/useAppDispatch";
import { itemView } from "../../../../../../../store/slices/itemView/itemView";
import { useDomQuery } from "../../../../../../../utils/useDomQuery";
import { makeSelectStyle } from "../utils/makeSelectStyle";

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

  const theme = useTheme();
  const selectStyle: Styles = useMemo(() => makeSelectStyle(theme), [theme]);

  return (
    <Root>
      <Label htmlFor="sort-direction-select">Sort</Label>
      <Select
        id="sort-direction-select"
        value={sortOptions.find((x) => x.value === sortField)}
        onChange={onChange}
        styles={selectStyle}
        options={sortOptions}
        menuPortalTarget={menuPortalTarget}
      />
    </Root>
  );
});

const Root = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.typography.families.isaac};
`;
