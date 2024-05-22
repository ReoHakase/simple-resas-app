import { Preset } from '@pandacss/dev';
import baseRadixColorsPreset from 'pandacss-preset-radix-colors';

/**
 * Array of radix scale names.
 * @see https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette
 */
declare const radixColorScales: readonly [
  'amber',
  'black',
  'blue',
  'bronze',
  'brown',
  'crimson',
  'cyan',
  'gold',
  'grass',
  'gray',
  'green',
  'indigo',
  'iris',
  'jade',
  'lime',
  'mauve',
  'mint',
  'olive',
  'orange',
  'pink',
  'plum',
  'purple',
  'red',
  'ruby',
  'sage',
  'sand',
  'sky',
  'slate',
  'teal',
  'tomato',
  'violet',
  'white',
  'yellow',
];
type RadixColorScale = (typeof radixColorScales)[number];
type RadixColorScales = RadixColorScale[];

type Recursive = {
  [key: string]: string | Recursive;
};

type ColorScaleEntries = [string, Recursive | string][];

type DeleteAlphaColorOption = {
  colorScales: ColorScaleEntries;
};

const deleteAlphaColor = ({ colorScales }: DeleteAlphaColorOption) =>
  Object.fromEntries(
    colorScales.reduce<ColorScaleEntries>((acc, [key, value]) => {
      if (key === 'black' || key === 'white') {
        acc.push([key, value]);
        return acc;
      }
      if (key === 'a') {
        return acc;
      }

      if (typeof value === 'object' && Number.isNaN(Number(key))) {
        acc.push([key, deleteAlphaColor({ colorScales: Object.entries(value) })]);
        return acc;
      }

      acc.push([key, value]);
      return acc;
    }, []),
  );

type ReplaceScaleNameOptions = {
  colorScales: ColorScaleEntries;
  targetScale: string;
  replaceName: string;
};

const replaceScaleName = ({ colorScales, targetScale, replaceName }: ReplaceScaleNameOptions) =>
  Object.fromEntries(
    colorScales.reduce<ColorScaleEntries>((acc, [key, value]) => {
      if (key === 'value') {
        if (typeof value === 'string') {
          const replacedValue = value.replace(targetScale, replaceName);
          acc.push([key, replacedValue]);
          return acc;
        }
        if (typeof value === 'object') {
          const reg = new RegExp(targetScale, 'g');
          acc.push([
            key,
            Object.fromEntries(Object.entries(value).map(([k, v]) => [k, (v as string).replace(reg, replaceName)])),
          ]);
          return acc;
        }
      }

      acc.push([
        key,
        replaceScaleName({
          colorScales: Object.entries(value),
          targetScale,
          replaceName,
        }),
      ]);
      return acc;
    }, []),
  );

type RenameScaleOptions = {
  colorScales: ColorScaleEntries;
  renameScale: [RadixColorScale, string][];
};

const renameScaleColor = ({ colorScales, renameScale }: RenameScaleOptions) =>
  Object.fromEntries(
    colorScales.reduce<ColorScaleEntries>((acc, [key, value]) => {
      const renamedScale = renameScale.find(([scale]) => scale === key);

      if (renamedScale) {
        const renamedValue = replaceScaleName({
          colorScales: Object.entries(value),
          targetScale: key,
          replaceName: renamedScale[1],
        });

        acc.push([renamedScale[1], renamedValue]);

        return acc;
      }
      acc.push([key, value]);
      return acc;
    }, []),
  );

type ReplaceAliasColorOptions = {
  colorScales: ColorScaleEntries;
  referenceColorName: string;
  isAlpha?: boolean;
  isP3?: boolean;
  isDark?: boolean;
  tone?: `${number}`;
};

const replaceAliasColor = ({
  colorScales,
  referenceColorName,
  isAlpha = false,
  isP3 = false,
  isDark = false,
  tone = '0',
}: ReplaceAliasColorOptions) =>
  Object.fromEntries(
    colorScales.reduce<ColorScaleEntries>((acc, [key, value]) => {
      if (!Number.isNaN(Number(key))) {
        acc.push([
          key,
          replaceAliasColor({
            colorScales: Object.entries(value),
            referenceColorName,
            tone: key as `${number}`,
            isAlpha,
            isP3,
            isDark,
          }),
        ]);
        return acc;
      }

      if (key === 'a') {
        acc.push([
          key,
          replaceAliasColor({
            colorScales: Object.entries(value),
            referenceColorName,
            tone,
            isAlpha: true,
            isP3,
            isDark,
          }),
        ]);

        return acc;
      }
      if (key === 'p3') {
        acc.push([
          key,
          replaceAliasColor({
            colorScales: Object.entries(value),
            referenceColorName,
            tone,
            isAlpha,
            isP3: true,
            isDark,
          }),
        ]);

        return acc;
      }
      if (key === 'dark') {
        acc.push([
          key,
          replaceAliasColor({
            colorScales: Object.entries(value),
            referenceColorName,
            tone,
            isAlpha,
            isP3,
            isDark: true,
          }),
        ]);

        return acc;
      }

      if (key === 'value') {
        if (typeof value === 'string') {
          acc.push([
            key,
            `{colors.${referenceColorName}.${isDark ? 'dark' : 'light'}.${
              isP3 ? 'p3.' : ''
            }${isAlpha ? 'a.' : ''}${tone}}`,
          ]);

          return acc;
        }
        if (typeof value === 'object') {
          acc.push([
            key,
            Object.fromEntries(
              Object.entries(value).map(([k, v]) => {
                const colorValue = (() => {
                  switch (k) {
                    case 'base':
                      return `{colors.${referenceColorName}.light.${isP3 ? 'p3.' : ''}${isAlpha ? 'a.' : ''}${tone}}`;
                    case '_dark':
                      return `{colors.${referenceColorName}.dark.${isP3 ? 'p3.' : ''}${isAlpha ? 'a.' : ''}${tone}}`;

                    case '_p3':
                      return `{colors.${referenceColorName}.${
                        isDark ? 'dark' : 'light'
                      }.p3.${isAlpha ? 'a.' : ''}${tone}}`;

                    default:
                      return v;
                  }
                })();
                return [k, colorValue];
              }),
            ),
          ]);
          return acc;
        }
      }

      acc.push([
        key,
        replaceAliasColor({
          colorScales: Object.entries(value),
          referenceColorName,
          tone,
          isAlpha,
          isP3,
          isDark,
        }),
      ]);
      return acc;
    }, []),
  );

type CreateAliasColorOptions = {
  referenceColorScales: ColorScaleEntries;
  scaleAliases: [string, string][];
};

const createAliasColors = ({ referenceColorScales, scaleAliases }: CreateAliasColorOptions) =>
  Object.fromEntries(
    referenceColorScales.reduce<ColorScaleEntries>((acc, [key, value]) => {
      const alias = scaleAliases.find(([, alias_]) => alias_ === key);

      if (alias) {
        const replacedValue = replaceAliasColor({
          colorScales: Object.entries(value),
          referenceColorName: key,
        });
        acc.push([alias[0], replacedValue]);
        return acc;
      }
      return acc;
    }, []),
  );

type CustomRadixColorsPresetOptions = {
  scaleAliases?: Record<string, RadixColorScale>;
  renameScale?: Partial<Record<RadixColorScale, string>>;
  withoutAlpha?: boolean;
} & Parameters<typeof baseRadixColorsPreset>[0];

/**
 * Generates a Custom Radix colors preset
 * @param options - The options for generating the preset.
 * @param options.scaleAliases - The scale alias map.
 * @param options.renameScale - The scale rename map. If the scale is renamed, the alias will be renamed as well.
 * @param options.withoutAlpha - Whether to remove the alpha channel from the color scales.
 * @param options.includedRadixScales - The included radix scales.
 *  @example
 * ```ts
 * const preset = customRadixColorsPreset({
 *    // The cement alias is mapped to foo renamed gray scale.
 *    scaleAliases: { keyplate: "slate", primary: "pink", info: "cyan", success: "green", warning: "orange", danger: "red"},
 *    renameScale: { gray: "foo" },
 *    colorScales: ["red", "cyan", "green"],
 *    withoutAlpha: true,
 * });
 *
 * ```
 * @returns The generated preset.
 */
const radixColorsPreset = ({
  scaleAliases = {},
  renameScale = {},
  withoutAlpha = false,
  ...baseOptions
}: CustomRadixColorsPresetOptions) => {
  const explicitlyIncludedScales: RadixColorScale[] = baseOptions.colorScales || [];

  const referencedAliasScales: RadixColorScale[] = Object.values(scaleAliases);

  const renameScaleEntries = Object.entries(renameScale) as [RadixColorScale, string][];

  const referencedRenameScales: RadixColorScale[] = renameScaleEntries.map(([scale]) => scale);

  const dependentScales: RadixColorScale[] = [
    ...new Set([...explicitlyIncludedScales, ...referencedAliasScales, ...referencedRenameScales]),
  ];

  const renamedScaleAliases = Object.entries(scaleAliases).reduce<[string, string][]>((acc, [alias, scale]) => {
    const renamedScaleName = renameScale[scale];

    if (renamedScaleName) {
      acc.push([alias, renamedScaleName]);
      return acc;
    }
    acc.push([alias, scale]);
    return acc;
  }, []);

  const basePreset = baseRadixColorsPreset({
    ...baseOptions,
    colorScales: dependentScales,
  });

  const baseColor = withoutAlpha
    ? deleteAlphaColor({
        colorScales: Object.entries({
          ...basePreset.theme?.extend?.semanticTokens?.colors,
        }) as ColorScaleEntries,
      })
    : { ...basePreset.theme?.extend?.semanticTokens?.colors };

  const renamedScaleColor = renameScaleColor({
    colorScales: Object.entries(baseColor) as ColorScaleEntries,
    renameScale: renameScaleEntries,
  });

  const aliasColors = createAliasColors({
    referenceColorScales: Object.entries(renamedScaleColor) as ColorScaleEntries,
    scaleAliases: renamedScaleAliases,
  });

  const preset: Preset = { ...basePreset };
  if (preset.theme?.extend?.semanticTokens?.colors) {
    preset.theme.extend.semanticTokens.colors = {
      ...renamedScaleColor,
      ...aliasColors,
    } as typeof preset.theme.extend.semanticTokens.colors;
  }
  return preset;
};

export type { Recursive, ColorScaleEntries, DeleteAlphaColorOption };
export { deleteAlphaColor, renameScaleColor, createAliasColors };
export type { RadixColorScales, RadixColorScale };
export { radixColorsPreset };
