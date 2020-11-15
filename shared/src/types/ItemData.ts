export type Section =
  | 'Effects'
  | 'Notes'
  | 'Interactions'
  | 'Synergies'
  | 'Trivia'
  | 'Tips';

export interface ItemData {
  /**
   * The link to the wiki page for an item.
   */
  wikiHref: string;

  /**
   * Relative link.
   */
  href: string;

  displayName: string;

  /**
   * The short description.
   */
  description: string;

  /**
   * Wiki sections of an item, provided as sanitized HTML strings.
   */
  sections: { [T in Section]: string };

  /**
   * The link to an item's image on wiki.
   */
  imageLink: string;

  /**
   * The item's icon as base64 encoded webp.
   */
  imageBase64: string;

  /**
   * The on-pickup quote.
   */
  quote: string;

  /**
   * The in-game ID number
   */
  id: number;

  /**
   * The internal, sanitized name.
   */
  internalName: string;
}
