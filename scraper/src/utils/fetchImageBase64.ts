import sharp from "sharp";
import { fetchRetry } from "./fetchRetry";

export const fetchImageBase64 = async (
  ...args: Parameters<typeof fetchRetry>
) => {
  const resp = await fetchRetry(...args);

  // @ts-ignore
  const buffer = await sharp(await resp.buffer())
    .webp()
    .toBuffer();

  const encoded = `data:image/webp;base64,${buffer.toString(
    "base64"
  )}`;

  return encoded;
};