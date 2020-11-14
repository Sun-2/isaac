import fetch, { Response } from 'node-fetch';
import { sleep } from '@isaac-item-browser/shared';

/**
 * Infinitely-retrying fetch. Wiki loves to lag out, but eventually it always works.
 * @param args Args passed to fetch
 */
export const fetchRetry = async (
  ...args: Parameters<typeof fetch>
) => {
  let resp: Response | undefined;

  let retryCount = 0;
  while (!resp) {
    try {
      resp = (await Promise.race([
        fetch(...args),
        new Promise((res, rej) => setTimeout(rej, 10000)),
      ])) as Response;
    } catch (e) {
      console.log(e);
      retryCount++;
      if (retryCount >= 5) {
        throw new Error(`fetch timed out ${args[0]}`);
      }
      await sleep(60000);
    }
  }

  return resp;
};