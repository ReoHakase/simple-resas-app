import { Check } from 'lucide-react';
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import { cx } from 'styled-system/css';
import { checkbox } from 'styled-system/recipes';

export type CheckboxProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'> & {
  id: string; // <label>で擬似的なチェックボックスを作るために必要
  'aria-labelledby': string; // 実際にラベルテキストを含む<label>のidを必ず指定する
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ id, className, ...props }, ref): ReactNode => {
  const { label, check, input } = checkbox();
  return (
    <>
      <label
        htmlFor={id}
        // a11yテストで、labelが複数存在するエラーを防ぐためにaria-hiddenを指定する。実際のlabelのidをaria-labelledbyで指定する
        // @see https://dequeuniversity.com/rules/axe/4.9/form-field-multiple-labels
        aria-hidden="true"
        className={cx(label, className)}
      >
        <Check className={check} />
      </label>
      <input id={id} type="checkbox" ref={ref} className={input} {...props} />
    </>
  );
});
Checkbox.displayName = 'Checkbox';
