import { promises as fsp } from "fs";
import fetch from "node-fetch";
import cheerio from "cheerio";
import { getSections } from "./getSections";
import { baseUrl, serviceKeyPath } from "./const";
import { prepare } from "./prepare";
import admin from "firebase-admin";
import stringHash from "string-hash";

(async () => {
  const key = JSON.parse(
    await fsp.readFile(serviceKeyPath, { encoding: "utf8" })
  );
  admin.initializeApp({
    credential: admin.credential.cert(key),
    databaseURL: "https://isaac-item-browser.firebaseio.com",
  });

  const resp = await fetch(`${baseUrl}/Items`);
  const txt = await resp.text();

  const $ = cheerio.load(txt);
  prepare($);


  //todo save image as base64

  const itemsData = $(".row-collectible")
    .map((i, rowNode) => {
      const row$ = $(rowNode);

      const wikiLink = row$.find("td:nth-child(1) a") || "";

      const wikiHref = wikiLink.attr("href") || "";
      const href =
        wikiLink.attr("href")?.match(/(?<=com)(\/.*?)(?=\/|$)/)?.[0] || "";
      const displayName = wikiLink.attr("title")?.trim() || "";
      const id = parseInt(row$.find("td:nth-child(2)").text().trim()) || 0;
      const quote = row$.find("td:nth-child(4)").text().trim() || "";
      const imageLink =
        row$
          .find("td:nth-child(3) img")
          .attr("src")
          ?.match(/^.*latest/)?.[0] || "";
      const description = row$.find("td:nth-child(5)").text().trim() || "";

      return { wikiHref, id, quote, imageLink, description, displayName, href };
    })
    .toArray()
    .filter((obj) => Object.values(obj).every((x) => !!x));

  let itemsUploaded = 0;
  for (const singleItemData of itemsData as any) {
    if (singleItemData.wikiHref) {
      console.log(`Fetching sections for item ID ${singleItemData.id}`);

      const sections = await getSections(singleItemData.wikiHref);
      singleItemData["sections"] = sections;
    } else {
      console.log(`No wikiHref for item ID ${singleItemData.id}`);
    }

    const hashBase = singleItemData.displayName.replace(/[\/ ]/g, "_");

    admin
      .firestore()
      .collection("items-batch")
      .doc(Math.abs(stringHash(hashBase) % 10).toString())
      .set({ [hashBase]: singleItemData }, { merge: true })
      .then(() => {
        console.log(
          `Item ID ${
            singleItemData.id
          } was uploaded to Firebase. ${++itemsUploaded}/${itemsData.length}`
        );
      });
    admin.firestore().collection("items").doc(hashBase).set(singleItemData);
    await new Promise((res) => setTimeout(res, 200));
  }

  console.log(`Finished fetching wiki articles.`);
})();
