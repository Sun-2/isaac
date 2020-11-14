import { baseUrl } from "../const";
import cheerio from "cheerio";
import { prepare } from "./prepare";
import { getSections } from "./getSections";
import { fetchRetry } from "../utils/fetchRetry";
import { fetchImageBase64 } from "../utils/fetchImageBase64";

export const getItemData = async () => {
  const resp = await fetchRetry(`${baseUrl}/Items`);
  const txt = await resp.text();

  const $ = cheerio.load(txt);
  prepare($);

  const itemData = $(".row-collectible")
    .map((i, rowNode) => {
      const row$ = $(rowNode);

      /* Extract a single item's data. */
      const wikiLink = row$.find("td:nth-child(1) a") || "";
      const wikiHref = wikiLink.attr("href") || "";
      const href =
        wikiLink
          .attr("href")
          ?.match(/(?<=com)(\/.*?)(?=\/|$)/)?.[0] || "";
      const displayName = wikiLink.attr("title")?.trim() || "";
      const id =
        parseInt(row$.find("td:nth-child(2)").text().trim()) || 0;
      const quote = row$.find("td:nth-child(4)").text().trim() || "";
      const imageLink =
        row$
          .find("td:nth-child(3) img")
          .attr("src")
          ?.match(/^.*latest/)?.[0] || "";
      const description =
        row$.find("td:nth-child(5)").text().trim() || "";

      return {
        wikiHref,
        id,
        quote,
        imageLink,
        description,
        displayName,
        href,
      };
    })
    .toArray()
    .filter((obj) => Object.values(obj).every(Boolean))
    .reduce((acc, curr: any) => {
      const internalItemName = curr.displayName.replace(
        /[\/ ?.,&]/g,
        "_"
      );
      acc[internalItemName] = curr;
      return acc;
    }, {});

  for (const [name, { imageLink }] of Object.entries(
    itemData
  ) as any) {
    console.log(`Getting the image for ${name}`);
    itemData[name]["imageBase64"] = await fetchImageBase64(imageLink);
  }

  let i = 0;
  const itemAmount = Object.keys(itemData).length;
  for (const [itemName, singleItemData] of Object.entries(
    itemData
  ) as any) {
    if (singleItemData.wikiHref) {
      console.log(
        `Fetching sections for item ID ${
          singleItemData.id
        }. ${++i}/${itemAmount}`
      );

      itemData[itemName]["sections"] = await getSections(
        singleItemData.wikiHref
      );
    } else {
      console.log(
        `No wikiHref for item ID ${
          singleItemData.id
        } ${++i}/${itemAmount}`
      );
    }

    await new Promise((res) => setTimeout(res, 200));
  }

  return itemData;
};
