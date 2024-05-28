import { defineSlotRecipe as sva } from '@pandacss/dev';

export const checkboxSlotRecipe = sva({
  className: 'checkbox',
  description: 'チェックボックスのスタイル',
  jsx: ['Checkbox'],
  slots: ['label', 'check', 'input'],
  base: {
    label: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      w: '8',
      h: '8',
      rounded: 'sm',
      border: '1px solid',
      borderColor: 'keyplate.6',
      bg: 'keyplate.2',
      cursor: 'pointer',
      '&:has(+ input:focus-visible)': {
        ringColor: 'cyan.9',
        ringWidth: '2',
        outlineStyle: 'solid',
        ringOffset: '2px',
      },
      '&:has(+ input:checked)': {
        bg: 'primary.3',
        borderColor: 'primary.9',
        color: 'primary.11',
      },
      '&:has(+ input:disabled)': {
        bg: 'keyplate.4',
        color: 'keyplate.11',
        cursor: 'not-allowed',
      },
      '&:has(+ input:checked:disabled)': {
        bg: 'keyplate.4',
        color: 'keyplate.11',
        borderColor: 'keyplate.9',
      },
      _hover: {
        bg: 'keyplate.3',
      },
    },
    check: {
      'label:has(+ input:not(:checked)) &': {
        display: 'none',
      },
    },
    input: {
      appearance: 'none',
      pos: 'absolute',
      top: '0',
      left: '0',
      pointerEvents: 'none',
    },
  },
});
