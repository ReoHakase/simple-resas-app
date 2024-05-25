import { Check } from 'lucide-react';
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import { css, cx } from 'styled-system/css';

export type CheckboxProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'> & {
  id: string; // <label>で擬似的なチェックボックスを作るために必要
  'aria-labelledby': string; // 実際にラベルテキストを含む<label>のidを必ず指定する
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ id, className, ...props }, ref): ReactNode => {
  return (
    <>
      <label
        htmlFor={id}
        // a11yテストで、labelが複数存在するエラーを防ぐためにaria-hiddenを指定する。実際のlabelのidをaria-labelledbyで指定する
        // @see https://dequeuniversity.com/rules/axe/4.9/form-field-multiple-labels
        aria-hidden="true"
        className={cx(
          css({
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
          }),
          className,
        )}
      >
        <Check
          className={css({
            'label:has(+ input:not(:checked)) &': {
              display: 'none',
            },
          })}
        />
      </label>
      <input
        id={id}
        type="checkbox"
        ref={ref}
        className={css({
          appearance: 'none',
          pos: 'absolute',
          top: '0',
          left: '0',
          pointerEvents: 'none',
        })}
        {...props}
      />
    </>
  );
});
Checkbox.displayName = 'Checkbox';
