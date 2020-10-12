import React, { FunctionComponent, memo } from "react";
import styled from "styled-components";
import { Section } from "./components/Section";
import { SectionHeader } from "./components/SectionHeader";
import { ItemIcon } from "./components/ItemIcon";
import { ItemName } from "./components/ItemName";
import { Quote } from "./components/Quote";

export type ItemDescriptionProps = {
  itemData: null | any;
};

export const ItemDescription: FunctionComponent<ItemDescriptionProps> = memo(
  (props) => {
    const { itemData, ...rest } = props as any;
    return (
      <Root {...rest}>
        <ItemIcon referrerPolicy={"no-referrer"} src={itemData.imageLink} />
        <ItemName>{itemData.displayName}</ItemName>
        <Quote>{itemData.quote}</Quote>
        {Object.entries(itemData.sections).map(([sectionName, sectionHtml]) => (
          <>
            <SectionHeader>{sectionName}</SectionHeader>
            <Section
              dangerouslySetInnerHTML={{
                __html: sectionHtml,
              }}
            />
          </>
        ))}
      </Root>
    );
  }
);

const Root = styled.div`
  direction: ltr;
  padding: 32px;

  color: #dac1b4;
  font-size: 1.9rem;
  line-height: 140%;
  text-shadow: 5px 4px 5px black;
`;
