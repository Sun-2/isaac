export interface ItemData {
  /**
   * The link to the wiki page for an item.
   */
  wikiHref: string;
  /**
   *
   */
  href: string;
  displayName: string;
  /**
   * The short description.
   */
  description: string;
  //todo type sections
  /**
   * Wiki sections of an item, provided as sanitized HTML strings.
   */
  sections: { [sectionName: string]: string };
  /**
   * The link to an item's image on wiki.
   */
  imageLink: string;
  /**
   * The item's icon as base64 encoded webp.
   */
  imageBase64: string;
  quote: string;
  /**
   * The in-game ID number
   */
  id: number;
}