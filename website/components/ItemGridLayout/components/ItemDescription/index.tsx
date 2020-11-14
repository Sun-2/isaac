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
import { CloseButton } from "./components/CloseButton";
import { media } from "../../../../../../../x/fake-notification/website2/styles/media";
import { useSelector } from "react-redux";
import { getShowItemDescription } from "../../../../store/slices/itemView/selectors";

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

    const showItemDescription = useSelector(getShowItemDescription);

    return (
      <Root {...rest} show={showItemDescription}>
        <MaxWidth>
          <CloseButton />
          <WikiLink target="_blank" href={itemData.wikiHref}>
            View on Wikia
          </WikiLink>
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
        </MaxWidth>
      </Root>
    );
  }
);

const MaxWidth = styled.div`
  max-width: 600px;
  ${media.md} {
    max-width: initial;
  }
  z-index: 2;
`;

const Root = styled.main<{ show: boolean }>`
  direction: ltr;
  padding: 32px;

  color: #efe0d7;
  font-size: 1.9rem;
  line-height: 140%;
  text-shadow: 5px 4px 5px black;

  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  align-items: center;

  background-image: url("background.webp");

  overflow-y: scroll;

  isolation: isolate;

  &::after {
    display: block;
    content: "";
    background: -webkit-radial-gradient(
      50% 52%,
      ellipse cover,
      rgba(255, 255, 255, 0),
      rgba(8, 4, 2, 0.9) 100%
    );
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
    user-select: none;
    pointer-events: none;

    isolation: isolate;
  }

  ${media.md} {
    display: block;
    position: relative;
    background-image: none;
    &::after {
      all: initial;
    }
  }
`;
