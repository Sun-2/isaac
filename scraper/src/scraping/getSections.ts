import cheerio from "cheerio";
import fetch from "node-fetch";
import { prepare } from "./prepare";
import { fetchRetry } from "../utils/fetchRetry";

const extractSection = ($: cheerio.Root, sectionName: string) => {
  const sectionChildren = $(`#${sectionName}`)
    .first()
    .parent()
    .nextUntil("h2, table");

  if (!sectionChildren.length) return null;

  return $.html(sectionChildren);
};

export const getSections = async (href) => {
  const resp = await fetchRetry(href);
  const text = await resp.text();

  const $ = cheerio.load(text);
  prepare($);

  $("img").each((i, node) => {
    const match = node.attribs.src.match(/^.*latest/);
    if (match) node.attribs.src = match[0];
    node.attribs.referrerPolicy = "no-referrer";
  });

  $("a").each((i, node) => {
    node.attribs.target = "_blank";
  });

  const result = {};

  const sections = {
    Effects: "Effects",
    Effect: "Effects",
    Notes: "Notes",
    Interactions: "Interactions",
    Synergies: "Synergies",
    Trivia: "Trivia",
    Tips: "Tips",
  } as const;

  for (const [wikiSectionName, displaySectionName] of Object.entries(
    sections
  )) {
    const html = await extractSection($, wikiSectionName);

    if (!html) continue;
    result[displaySectionName] = html;
  }
  return result;
};

(async () => {})();
