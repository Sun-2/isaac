import { useEffect, useState } from "react";
import { media } from "../../../../../../../x/fake-notification/website2/styles/media";
import { useTheme } from "styled-components";

export function useMediaQuery(query: typeof media[keyof typeof media]) {
  const theme = useTheme();
  const [match, setMatch] = useState(true);
  useEffect(() => {
    const listener = (mediaObject) => setMatch(mediaObject.matches);
    const media = matchMedia(query({ theme }).replace("@media", ""));
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, []);
  return match;
}
