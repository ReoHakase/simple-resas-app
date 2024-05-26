import { token } from 'styled-system/tokens';

/**
 * ラインの色の定義。
 * アプリのカラーパレットにも採用しているRadix Colorsのスケール11を使用しています。
 * @see https://www.radix-ui.com/colors
 * @see https://recharts.org/en-US/api/Line#stroke
 */
export const lineColorsRecord = {
  tomato: token('colors.tomato.11'),
  red: token('colors.red.11'),
  ruby: token('colors.ruby.11'),
  crimson: token('colors.crimson.11'),
  pink: token('colors.pink.11'),
  plum: token('colors.plum.11'),
  purple: token('colors.purple.11'),
  violet: token('colors.violet.11'),
  iris: token('colors.iris.11'),
  indigo: token('colors.indigo.11'),
  blue: token('colors.blue.11'),
  cyan: token('colors.cyan.11'),
  teal: token('colors.teal.11'),
  jade: token('colors.jade.11'),
  green: token('colors.green.11'),
  grass: token('colors.grass.11'),
  bronze: token('colors.bronze.11'),
  gold: token('colors.gold.11'),
  brown: token('colors.brown.11'),
  orange: token('colors.orange.11'),
  amber: token('colors.amber.11'),
  yellow: token('colors.yellow.11'),
  lime: token('colors.lime.11'),
  mint: token('colors.mint.11'),
  sky: token('colors.sky.11'),
} as const satisfies Record<string, string>;

export type LineColor = keyof typeof lineColorsRecord;

export const getUniqueLineColor = (key: string): LineColor => {
  // Create an array of the keys (colors) from lineColorsRecord
  const colorKeys: LineColor[] = Object.keys(lineColorsRecord) as LineColor[];

  // Basic hash function to convert the key string into an index
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) % colorKeys.length;
  }

  // Return the color at the index determined by the hash
  return colorKeys[hash];
};
