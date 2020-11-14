export interface ItemData {
  wikiHref: string;
  displayName: string;
  description: string;
  sections: {[sectionName:string]:string};
  imageLink: string;
  imageBase64:string;
  quote: string;
  id: number;
  href: string;
}