import styled, { useTheme } from "styled-components";
import React, { memo } from "react";
import Select, { Styles } from "react-select";
import { useSelector } from "react-redux";
import { getSortField } from "../../../../../../store/slices/itemView/selectors";
import { useAppDispatch } from "../../../../../../store/useAppDispatch";
import { itemView } from "../../../../../../store/slices/itemView/itemView";
import { useDomQuery } from "../../../../../../utils/useDomQuery";

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
  const selectStyle: Styles = {
    option: (styles) => ({
      ...styles,
      color: "red",
      fontFamily: theme.typography.families.isaac,
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "red",
      fontFamily: theme.typography.families.isaac,
    }),
  };

  return (
    <Root>
      <label htmlFor="sort-field-select">Sort by</label>
      <Select
        classNamePrefix={"r-select"}
        style={selectStyle}
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
  font-family: ${({ theme }) => theme.typography.families.isaac};
  margin-right: 20px;
  width: 200px;
`;
