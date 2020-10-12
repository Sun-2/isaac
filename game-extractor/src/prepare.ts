import cheerio from "cheerio";
import {baseUrl} from "./const";

export const prepare = ($: cheerio.Root) => {
  $("script").remove();

  const keepAttribs = [
    "href",
    "alt",
    "src",
    "class",
    "title",
    "width",
    "height",
    "decoding",
    "id",
  ];
  $("*").each((i, node) => {
    for (const attribKey of Object.keys(node.attribs)) {
      if (!keepAttribs.includes(attribKey)) delete node.attribs[attribKey];
    }
  });

  $("a").each(function (this: any) {
    $(this).attr("href", baseUrl + $(this).attr("href"));
  });
};