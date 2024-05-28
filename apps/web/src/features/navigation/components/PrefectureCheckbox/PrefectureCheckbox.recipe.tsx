import { defineSlotRecipe as sva } from '@pandacss/dev';

export const prefectureCheckboxSlotRecipe = sva({
  className: 'prefecture-checkbox',
  description: '都道府県チェックボックスのスタイル',
  jsx: ['PrefectureCheckbox'],
  slots: ['label'],
  base: {
    label: {
      pos: 'relative',
      display: 'flex',
      flexDir: 'row',
      justifyContent: 'start',
      alignItems: 'center',
      p: '1',
      gap: '2.5',
      rounded: 'lg',
      '&:has(input:checked)': {
        bg: 'primary.2',
        color: 'primary.11',
      },
      '&:has(input:disabled)': {
        color: 'keyplate.11',
        cursor: 'not-allowed',
      },
      '&:has(input:checked:disabled)': {
        bg: 'keyplate.2',
        color: 'keyplate.11',
      },
      _hover: {
        bg: 'keyplate.3',
        '&:has(input:checked)': {
          bg: 'primary.3',
        },
        '&:has(input:checked:disabled)': {
          bg: 'keyplate.2',
          color: 'keyplate.11',
        },
      },
    },
  },
});
