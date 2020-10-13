export function tagBinsearch(
  tagsList: any[],
  phrase: string,
  mode: "leftmost" | "rightmost" = "leftmost"
) {
  let l = 0;
  let r = ((tagsList as unknown) as any[]).length - 1;

  while (l < r) {
    const mid = Math.floor((r + l) / 2);

    if (
      (mode === "leftmost" &&
        tagsList[mid].tag.slice(0, phrase.length) < phrase) ||
      (mode === "rightmost" &&
        tagsList[mid].tag.slice(0, phrase.length) <= phrase)
    ) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }

  const returnIndex = mode === "leftmost" ? l : l - 1;

  if (tagsList[returnIndex].tag.slice(0, phrase.length) === phrase) {
    return {index: returnIndex, value: tagsList[returnIndex].tag};
  } else {
    return {index: null, value: null};
  }
}

export function getVisibleItems(tagsList, phrases): {} | "all" {
  if (!phrases.length || (phrases.length === 1 && phrases[0] === ""))
    return "all";

  const allMatches = [] as Set<string>[];

  for (const phrase of phrases) {
    const {index: leftIndex} = tagBinsearch(tagsList, phrase);
    if (!leftIndex) return [];

    const {index: rightIndex} = tagBinsearch(tagsList, phrase, "rightmost");

    const currentPhraseMatches = new Set<string>();
    for (let i = leftIndex; i <= (rightIndex as number); i++) {
      for (const item of tagsList[i].items) {
        currentPhraseMatches.add(item);
      }
    }
    allMatches.push(currentPhraseMatches);
  }

  const allMatchesIntersection = allMatches.reduce((acc, curr) => {
    if (!acc) return curr;
    return new Set<string>([...acc].filter((item) => curr.has(item)));
  });
  return [...allMatchesIntersection.keys()].reduce((acc, curr) => {
    acc[curr] = true;
    return acc;
  }, {} as any);
}