import { defineSlotRecipe as sva } from '@pandacss/dev';

export const selectSlotRecipe = sva({
  className: 'select',
  description: 'The select component styles.',
  jsx: [
    'Select',
    'SelectGroup',
    'SelectValue',
    'SelectTrigger',
    'SelectIcon',
    'SelectViewport',
    'SelectPortal',
    'SelectContent',
    'SelectItemIndicator',
    'SelectItem',
    'SelectItemText',
    'SelectItemDescription',
    'SelectLabel',
    'SelectSeparator',
  ],
  slots: [
    'root',
    'group',
    'value',
    'trigger',
    'viewport',
    'content',
    'label',
    'item',
    'itemDescription',
    'itemIndicator',
    'separator',
  ],
  base: {
    trigger: {
      display: 'flex',
      h: '10',
      w: 'full',
      alignItems: 'center',
      justifyContent: 'space-between',
      rounded: 'md',
      border: '1px solid',
      borderColor: 'keyplate.6',
      bg: 'keyplate.1',
      px: '3',
      py: '2',
      fontSize: 'sm',
      cursor: 'pointer',

      _placeholder: {
        color: 'keyplate.11',
      },

      _disabled: {
        cursor: 'not-allowed',
        opacity: '0.5',
      },
    },
    viewport: {
      p: '1',
    },
    content: {
      pos: 'relative',
      zIndex: 50,
      minW: 'var(--radix-select-trigger-width)',
      overflow: 'hidden',
      rounded: 'md',
      border: '1px solid',
      borderColor: 'keyplate.6',
      bg: 'keyplate.1',
      color: 'keyplate.12',
      shadow: 'floating',
      animationDuration: '0.2s',

      _radixSelectContentStateOpen: {
        animationName: 'enter',
        animationTimingFunction: 'ease-out',
        keyframeEnterScale: '0.975',
      },

      _radixSelectContentStateClosed: {
        animationName: 'exit',
        animationTimingFunction: 'ease-in',
        keyframeExitScale: '0.975',
      },

      _radixSelectContentSideTop: {
        keyframeEnterY: '2',
        keyframeExitY: '-2',
      },

      _radixSelectContentSideBottom: {
        keyframeEnterY: '-2',
        keyframeExitY: '2',
      },

      _radixSelectContentSideLeft: {
        keyframeEnterX: '2',
        keyframeExitX: '-2',
      },

      _radixSelectContentSideRight: {
        keyframeEnterY: '-2',
        keyframeExitY: '2',
      },

      '&[data-position="popper"]': {
        _radixSelectContentSideTop: {
          y: '-1',
        },

        _radixSelectContentSideBottom: {
          y: '1',
        },

        _radixSelectContentSideLeft: {
          x: '-1',
        },

        _radixSelectContentSideRight: {
          x: '1',
        },
      },
    },
    label: {
      py: '1.5',
      pl: '8',
      pr: '2',
      fontSize: 'sm',
      fontWeight: 'bold',
      color: 'keyplate.11',
    },
    item: {
      pos: 'relative',
      display: 'flex',
      flexDir: 'row',
      justifyContent: 'start',
      cursor: 'default',
      userSelect: 'none',
      alignItems: 'center',
      gap: '2',
      py: '1.5',
      pl: '8',
      pr: '2',
      fontSize: 'sm',
      ring: '2px solid transparent',
      rounded: 'sm',

      _radixSelectItemStateUnchecked: {
        _focus: {
          bg: 'keyplate.3',
        },
      },

      _radixSelectItemStateChecked: {
        bg: 'primary.3',
        color: 'primary.11',
        _focus: {
          ringWidth: '1px',
          ringColor: 'primary.6',
        },
      },

      _radixSelectItemDisabled: {
        pointerEvents: 'none',
        opacity: '0.5',
      },
    },
    itemDescription: {
      ml: '2',
      fontSize: 'xs',
      flexGrow: '1',
      textAlign: 'end',
    },
    itemIndicator: {
      pos: 'absolute',
      left: '2',
      display: 'flex',
      h: '3.5',
      w: '3.5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    separator: {
      my: '1',
      h: '1px',
      bg: 'keyplate.6',
    },
  },
});
