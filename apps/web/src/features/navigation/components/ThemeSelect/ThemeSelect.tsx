'use client';

import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { Check, Moon, Sun, SwatchBook } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCallback } from 'react';
import { css, cx } from 'styled-system/css';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from '@/components/Select';
import { Skeleton } from '@/components/Skeleton';

type ThemeValue = 'system' | 'light' | 'dark';

export type ThemeSelectProps = ComponentPropsWithoutRef<typeof Select>
  & Pick<ComponentPropsWithoutRef<typeof SelectTrigger>, 'className'>
  & Pick<ComponentPropsWithoutRef<typeof SelectPortal>, 'container'>;

export function ThemeSelect({
  ref,
  className,
  container,
  onValueChange,
  ...props
}: ThemeSelectProps & { ref?: React.RefObject<ElementRef<typeof Select> | null> }) {
  const { theme, setTheme, systemTheme } = useTheme();

  const onValueChangeHandler = useCallback(
    (value: ThemeValue) => {
      setTheme(value);
      if (onValueChange) {
        onValueChange(value);
      }
    },
    [setTheme, onValueChange],
  );

  if (typeof window === 'undefined') {
    return (
      <Select ref={ref} {...props}>
        <SelectTrigger
          aria-label="色テーマの選択"
          className={cx(
            css({
              w: 'fit-content',
              aspectRatio: 'square',
              rounded: 'full',
              textAlign: 'center',
              p: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: '1',
            }),
            className,
          )}
        >
          <SelectValue placeholder={<Skeleton inline className={css({ w: '4' })} />} />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select value={theme} onValueChange={onValueChangeHandler} ref={ref} {...props}>
      <SelectTrigger
        aria-label="色テーマを選ぶ"
        className={cx(
          css({
            w: 'fit-content',
            aspectRatio: 'square',
            rounded: 'full',
            textAlign: 'center',
            p: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: '1',
          }),
          className,
        )}
      >
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectPortal container={container}>
        <SelectContent position="popper" side="bottom" sideOffset={4}>
          <SelectViewport>
            <SelectGroup>
              <SelectLabel>
                <SwatchBook className={css({ display: 'inline', w: '4', h: '4' })} />
                {' '}
                色テーマ
              </SelectLabel>
              <SelectItem value="system">
                <SelectItemText>
                  {systemTheme === 'light' && <Sun className={css({ display: 'inline', w: '4', h: '4' })} />}
                  {systemTheme === 'dark' && <Moon className={css({ display: 'inline', w: '4', h: '4' })} />}
                </SelectItemText>
                システム
                <SelectItemIndicator>
                  <Check />
                </SelectItemIndicator>
              </SelectItem>
              <SelectItem value="light">
                <SelectItemText>
                  <Sun className={css({ display: 'inline', w: '4', h: '4' })} />
                </SelectItemText>
                ライト
                <SelectItemIndicator>
                  <Check />
                </SelectItemIndicator>
              </SelectItem>
              <SelectItem value="dark">
                <SelectItemText>
                  <Moon className={css({ display: 'inline', w: '4', h: '4' })} />
                </SelectItemText>
                ダーク
                <SelectItemIndicator>
                  <Check />
                </SelectItemIndicator>
              </SelectItem>
            </SelectGroup>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}

ThemeSelect.displayName = 'ThemeSelect';
