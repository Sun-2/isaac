import styled, { useTheme } from "styled-components";
import React, { memo, useMemo } from "react";
import Select, { Styles } from "react-select";
import { useSelector } from "react-redux";
import { getSortField } from "../../../../../../../store/slices/itemView/selectors";
import { useAppDispatch } from "../../../../../../../store/useAppDispatch";
import { itemView } from "../../../../../../../store/slices/itemView/itemView";
import { useDomQuery } from "../../../../../../../utils/useDomQuery";
import { makeSelectStyle } from "../utils/makeSelectStyle";

const sortOptions = [
  {
    value: "id",
    label: "ID",
  },
  { value: "displayName", label: "Name" },
  { value: "color", label: "Color", isDisabled: true },
  { value: "type", label: "Type", isDisabled: true },
];

export const SortFieldSelect = memo(() => {
  const menuPortalTarget = useDomQuery<HTMLDivElement>([
    "#popup-container",
    "body",
  ]);

  const sortField = useSelector(getSortField);
  const dispatch = useAppDispatch();
  const onChange = ({ value }) => dispatch(itemView.actions.setSortMode(value));

  const theme = useTheme();
  const selectStyle: Styles = useMemo(() => makeSelectStyle(theme), [theme]);

  return (
    <Root>
      <Label htmlFor="sort-field-select">by</Label>
      <Select
        classNamePrefix={"r-select"}
        styles={selectStyle}
        id="sort-field-select"
        value={sortOptions.find((x) => x.value === sortField)}
        onChange={onChange}
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
