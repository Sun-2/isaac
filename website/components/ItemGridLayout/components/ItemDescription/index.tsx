import React, { Fragment, FunctionComponent, memo, useMemo } from "react";
import styled from "styled-components";
import { Section } from "./components/Section";
import { SectionHeader } from "./components/SectionHeader";
import { ItemIcon } from "./components/ItemIcon";
import { ItemName } from "./components/ItemName";
import { Quote } from "./components/Quote";
import { useRouter } from "next/router";
import { WikiLink } from "./components/WikiLink";
import { Description } from "./components/Description";

export type ItemDescriptionProps = {
  itemData: any;
};

const sectionsWeight = {
  Effects: 6,
  Notes: 5,
  Synergies: 4,
  Interactions: 3,
  Tips: 2,
  Trivia: 1,
};

export const ItemDescription: FunctionComponent<ItemDescriptionProps> = memo(
  (props) => {
    const { itemData, ...rest } = props as any;

    const sortedSections = useMemo(
      () =>
        Object.entries(itemData.sections).sort(([a], [b]) => {
          const aWeight = sectionsWeight[a as any] || 0;
          const bWeight = sectionsWeight[b as any] || 0;
          return aWeight < bWeight ? 1 : -1;
        }),
      [itemData.sections]
    );

    return (
      <Root {...rest}>
        <WikiLink target="_blank" href={itemData.wikiHref}>View on Wikia</WikiLink>
        <ItemIcon
          alt={itemData.displayName}
          referrerPolicy={"no-referrer"}
          src={itemData.imageBase64}
        />
        <ItemName itemId={itemData.id}>{itemData.displayName}</ItemName>
        <Quote>{itemData.quote}</Quote>
        <Description>{itemData.description}</Description>
        {sortedSections.map(([sectionName, sectionHtml]) => (
          <Fragment key={sectionName}>
            <SectionHeader>{sectionName}</SectionHeader>
            <Section
              dangerouslySetInnerHTML={{
                __html: sectionHtml as string,
              }}
            />
          </Fragment>
        ))}
      </Root>
    );
  }
);

const Root = styled.div`
  direction: ltr;
  padding: 32px;

  color: #efe0d7;
  font-size: 1.9rem;
  line-height: 140%;
  text-shadow: 5px 4px 5px black;
`;
