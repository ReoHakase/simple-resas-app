import { definePreset } from '@pandacss/dev';
import { getCaseNames } from './case';
import type { PandaPresetRadixCssSelectorOptions } from './type';

export const radixUIPreset = async (options: PandaPresetRadixCssSelectorOptions) => {
  const { prefix, selectorNameCase } = options;
  const getName = getCaseNames[selectorNameCase];
  return definePreset({
    theme: {
      extend: {
        tokens: {
          sizes: {
            //  <Select> https://www.radix-ui.com/primitives/docs/components/select
            [getName([prefix, 'Select', 'Content', 'availableWidth'])]: {
              value: 'var(--radix-select-content-available-width)',
            },
            [getName([prefix, 'Select', 'Content', 'availableHeight'])]: {
              value: 'var(--radix-select-content-available-height)',
            },
            [getName([prefix, 'Select', 'Trigger', 'width'])]: {
              value: 'var(--radix-select-trigger-width)',
            },
            [getName([prefix, 'Select', 'Trigger', 'height'])]: {
              value: 'var(--radix-select-trigger-height)',
            },
          },
        },
      },
    },
    conditions: {
      extend: {
        //  <Select> https://www.radix-ui.com/primitives/docs/components/select
        [getName([prefix, 'Select', 'Trigger', 'state', 'open'])]: '&[data-state="open"]',
        [getName([prefix, 'Select', 'Trigger', 'state', 'closed'])]: '&[data-state="closed"]',
        [getName([prefix, 'Select', 'Trigger', 'disabled'])]: '&[data-disabled]',
        [getName([prefix, 'Select', 'Trigger', 'placeholder'])]: '&[data-placeholder]',
        [getName([prefix, 'Select', 'Content', 'state', 'open'])]: '&[data-state="open"]',
        [getName([prefix, 'Select', 'Content', 'state', 'closed'])]: '&[data-state="closed"]',
        [getName([prefix, 'Select', 'Content', 'side', 'left'])]: '&[data-side="left"]',
        [getName([prefix, 'Select', 'Content', 'side', 'right'])]: '&[data-side="right"]',
        [getName([prefix, 'Select', 'Content', 'side', 'top'])]: '&[data-side="top"]',
        [getName([prefix, 'Select', 'Content', 'side', 'bottom'])]: '&[data-side="bottom"]',
        [getName([prefix, 'Select', 'Content', 'align', 'start'])]: '&[data-align="start"]',
        [getName([prefix, 'Select', 'Content', 'align', 'end'])]: '&[data-align="end"]',
        [getName([prefix, 'Select', 'Content', 'align', 'center'])]: '&[data-align="center"]',
        [getName([prefix, 'Select', 'Item', 'state', 'checked'])]: '&[data-state="checked"]',
        [getName([prefix, 'Select', 'Item', 'state', 'unchecked'])]: '&[data-state="unchecked"]',
        [getName([prefix, 'Select', 'Item', 'highlighted'])]: '&[data-highlighted]',
        [getName([prefix, 'Select', 'Item', 'disabled'])]: '&[data-disabled]',
      },
    },
  });
};
