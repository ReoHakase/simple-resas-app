import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { Fragment } from 'react';
import { cva, cx } from 'styled-system/css';
import type { RecipeVariantProps } from 'styled-system/css';

const skeletonRecipe = cva({
  base: {
    animation: 'pulse',
    bg: 'keyplate.3',
    rounded: 'md',
    ring: 'none',
    userSelect: 'none',
  },
  variants: {
    inline: {
      true: {
        display: 'inline-block',
        h: '1em',
      },
      false: {},
    },
    level: {
      title: {
        lineHeight: '1',
        fontSize: {
          base: '5xl',
          md: '6xl',
        },
      },
      h1: {
        lineHeight: '1.5',
        fontSize: '5xl',
      },
      h2: {
        lineHeight: '1.5',
        fontSize: '4xl',
      },
      h3: {
        lineHeight: '1.5',
        fontSize: '2xl',
      },
      h4: {
        lineHeight: '1.5',
        fontSize: 'xl',
      },
      h5: {
        lineHeight: '1.5',
        fontSize: 'lg',
      },
      h6: {
        lineHeight: '1.5',
        fontSize: 'md',
      },
      normal: {},
    },
  },
  defaultVariants: {
    inline: true,
    level: 'normal',
  },
});

export type SkeletonProps = ComponentPropsWithoutRef<'span'> &
  RecipeVariantProps<typeof skeletonRecipe> & {
    lines?: number;
  };

export const Skeleton = ({ className, inline, level, lines = 1, ...props }: SkeletonProps): ReactNode => {
  return inline ? (
    <>
      {Array.from({ length: lines }).map((_, i) => (
        <Fragment key={i}>
          <span className={cx(skeletonRecipe({ inline, level }), className)} {...props} />
          <br />
        </Fragment>
      ))}
    </>
  ) : (
    <span key={0} className={cx(skeletonRecipe({ inline }), className)} {...props} />
  );
};
