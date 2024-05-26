import { defineConfig } from '@pandacss/dev';
import { radixColorsPreset } from 'panda-preset-radix-colors';
import { radixUIPreset } from 'panda-preset-radix-ui';
import { selectSlotRecipe } from '@/components/Select/Select.recipe';
import { breakpoints } from '@/styles/tokens/breakpoints';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
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
          code: {
            value:
              'ui-monospace,"Liga SFMono Nerd Font",SFMono-Regular,"SF Mono",Menlo,Consolas,"Liberation Mono",monospace',
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
    // Radix Scales provider for PandaCSS by milandekruijf
    // Refer: https://github.com/milandekruijf/pandacss-preset-radix-colors
    radixColorsPreset({
      darkMode: {
        // NOTE: Make sure these selectors match the configurations passed to `next-themes` ThemeProvider
        condition: "[data-theme='dark'] &",
      },
      autoP3: true,
      scaleAliases: {
        keyplate: 'slate',
        primary: 'pink',
        info: 'cyan',
        success: 'green',
        warning: 'amber',
        danger: 'crimson',
      },
      colorScales: ['white', 'black'],
      excludeAlpha: false,
    }),
    radixColorsPreset({
      darkMode: {
        // NOTE: Make sure these selectors match the configurations passed to `next-themes` ThemeProvider
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

    // Re-add the panda preset if you want to keep
    // the default keyframes, breakpoints, tokens
    // and textStyles provided by PandaCSS
    '@pandacss/preset-panda',
  ],

  // The output directory for your css system
  outdir: 'styled-system',
  jsxFramework: 'react',
});
