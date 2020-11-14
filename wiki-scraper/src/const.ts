/**
 * The base URL of the Isaac wiki.
 */
export const baseUrl = 'https://bindingofisaacrebirth.gamepedia.com';

/**
 * Firebase service key path.
 */
export const serviceKeyPath =
  process.env.SERVICE_KEY_PATH || './nocommit/key.json';

/**
 * Path to the JSON file with custom item tags.
 */
export const tagsPath =
  process.env.SERVICE_KEY_PATH || './data/tags.json';
