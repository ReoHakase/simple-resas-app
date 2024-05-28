import { defineConfig } from '@pandacss/dev';
import pandaPreset from '@pandacss/preset-panda';
import { radixColorsPreset } from 'panda-preset-radix-colors';
import { radixUIPreset } from 'panda-preset-radix-ui';
import { checkboxSlotRecipe } from '@/components/Checkbox/Checkbox.recipe';
import { selectSlotRecipe } from '@/components/Select/Select.recipe';
import { prefectureCheckboxSlotRecipe } from '@/features/navigation/components/PrefectureCheckbox/PrefectureCheckbox.recipe';
import { breakpoints } from '@/styles/tokens/breakpoints';

// デフォルトのプリセットから色を削除する
pandaPreset.theme.tokens.colors = {} as typeof pandaPreset.theme.tokens.colors;

export default defineConfig({
  // CSSリセットを適用するかどうか
  preflight: true,

  // CSS定義を探査するパス
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // CSS定義をの探査対象から除外するパス
  exclude: [],

  utilities: {
    extend: {
      keyframeEnterOpacity: {
        className: 'keyframe-exit-opacity',
        values: 'opacity',
        transform: (value: string) => ({
          [`--keyframe-enter-opacity`]: value,
        }),
      },
      keyframeEnterX: {
        className: 'keyframe-enter-x',
        values: 'spacing',
        transform: (value: string) => ({
          [`--keyframe-enter-x`]: value,
        }),
      },
      keyframeEnterY: {
        className: 'keyframe-enter-y',
        values: 'spacing',
        transform: (value: string) => ({
          [`--keyframe-enter-y`]: value,
        }),
      },
      keyframeEnterScale: {
        className: 'keyframe-enter-scale',
        transform: (value: string) => ({
          [`--keyframe-enter-scale`]: value,
        }),
      },
      keyframeEnterRotate: {
        className: 'keyframe-enter-rotate',
        transform: (value: `${number}deg` | `${number}rad` | `${number}grad` | `${number}turn`) => ({
          [`--keyframe-enter-rotate`]: value,
        }),
      },
      keyframeExitOpacity: {
        className: 'keyframe-exit-opacity',
        values: 'opacity',
        transform: (value: string) => ({
          [`--keyframe-exit-opacity`]: value,
        }),
      },
      keyframeExitX: {
        className: 'keyframe-exit-x',
        values: 'spacing',
        transform: (value: string) => ({
          [`--keyframe-exit-x`]: value,
        }),
      },
      keyframeExitY: {
        className: 'keyframe-exit-y',
        values: 'spacing',
        transform: (value: string) => ({
          [`--keyframe-exit-y`]: value,
        }),
      },
      keyframeExitScale: {
        className: 'keyframe-exit-scale',
        values: 'spacing',
        transform: (value: string) => ({
          [`--keyframe-exit-scale`]: value,
        }),
      },
      keyframeExitRotate: {
        className: 'keyframe-exit-rotate',
        values: 'spacing',
        transform: (value: `${number}deg` | `${number}rad` | `${number}grad` | `${number}turn`) => ({
          [`--keyframe-exit-rotate`]: value,
        }),
      },
    },
  },

  // Useful for theme customization
  theme: {
    extend: {
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: '50% 50%, 50% 50%',
          },
          to: {
            backgroundPosition: '350% 50%, 350% 50%',
          },
        },
        enter: {
          from: {
            opacity: 'var(--keyframe-enter-opacity, 1)',
            transform:
              'translate3d(var(--keyframe-enter-x, 0), var(--keyframe-enter-y, 0), 0) scale3d(var(--keyframe-enter-scale, 1), var(--keyframe-enter-scale, 1), var(--keyframe-enter-scale, 1)) rotate(var(--keyframe-enter-rotate, 0))',
          },
        },
        exit: {
          to: {
            opacity: 'var(--keyframe-exit-opacity, 1)',
            transform:
              'translate3d(var(--keyframe-exit-x, 0), var(--keyframe-exit-y, 0), 0) scale3d(var(--keyframe-exit-scale, 1), var(--keyframe-exit-scale, 1), var(--keyframe-exit-scale, 1)) rotate(var(--keyframe-exit-rotate, 0))',
          },
        },
      },
      tokens: {
        fonts: {
          heading: {
            value: 'var(--font-cal-sans), sans-serif', // Make sure that the variable's name matches the one in apps/web/src/styles/fonts/index.ts
          },
        },
        shadows: {
          floating: {
            value: '0 0 16px 4px token(colors.keyplate.a.2)',
          },
        },
      },
      breakpoints: breakpoints,
      recipes: {
        select: selectSlotRecipe,
        checkbox: checkboxSlotRecipe,
        prefectureCheckbox: prefectureCheckboxSlotRecipe,
      },
    },
  },

  conditions: {
    extend: {
      // NOTE: Make sure these selectors match the configurations passed to `next-themes` ThemeProvider
      light: "[data-theme='light'] &",
      dark: "[data-theme='dark'] &",
      descendantIcon: '& .lucide', // See https://lucide.dev/guide/advanced/global-styling
    },
  },

  // Presets
  presets: [
    // Radix Colorsの色トークンを追加するプリセット
    radixColorsPreset({
      darkMode: {
        //  `next-themes`のプロバイダに与えた設定と整合性を保つようにする
        condition: "[data-theme='dark'] &",
      },
      autoP3: true,
      scaleAliases: {
        keyplate: 'slate',
        primary: 'pink',
        info: 'cyan',
      },
      colorScales: [],
      excludeAlpha: false,
    }),
    radixColorsPreset({
      darkMode: {
        //  `next-themes`のプロバイダに与えた設定と整合性を保つようにする
        condition: "[data-theme='dark'] &",
      },
      autoP3: true,
      excludeAlpha: true,
      excludedShades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12], // 11 以外
    }),

    radixUIPreset({
      prefix: 'radix',
      selectorNameCase: 'camelCase',
    }),

    // デフォルトのキーフレーム、ブレークポイント、トークン、テキストスタイルを保持したい場合は、パンダプリセットを再追加してください
    pandaPreset,
  ],

  // CSSシステムの出力先
  outdir: 'styled-system',
  jsxFramework: 'react',
});
