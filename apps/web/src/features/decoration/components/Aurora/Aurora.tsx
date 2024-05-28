import React from 'react';
import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { css, cx } from 'styled-system/css';

export type AuroraProps = ComponentPropsWithoutRef<'div'>;

export const Aurora = ({ className, ...props }: AuroraProps): ReactNode => (
  <div
    className={cx(
      css({
        pos: 'absolute',
        top: '0',
        right: '0',
        display: 'flex',
        flexDir: 'column',
        w: '100vw',
        h: '500px',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.5s',
        overflow: 'hidden',
        pointerEvents: 'none',
      }),
      className,
    )}
    {...props}
  >
    <div
      className={css({
        pos: 'absolute',
        inset: '-10px',
        opacity: 0.3,
        pointerEvents: 'none',
        bgImage: {
          _light:
            'repeating-linear-gradient( 100deg, #fff 0%, #fff 7%, transparent 10%, transparent 12%, #fff 16% ), repeating-linear-gradient( 100deg, #60a5fa 10%, #e879f9 16%, #5eead4 22%, #60a5fa 30% )',
          _dark:
            'repeating-linear-gradient( 100deg, #000 0%, #000 7%, transparent 10%, transparent 12%, #000 16% ), repeating-linear-gradient( 100deg, #60a5fa 10%, #e879f9 16%, #5eead4 22%, #60a5fa 30% )',
        },
        bgSize: '300%, 200%',
        bgPosition: '50% 50%, 50% 50%',
        animation: 'aurora 180s ease-in-out -70s infinite alternate',
        _light: {
          filter: 'blur(10px)',
        },
        _dark: {
          filter: 'blur(10px)',
        },
        maskImage: 'radial-gradient(ellipse at 100% 0%, token(colors.keyplate.1) 10%, transparent 70%)',
        '&::after': {
          content: '""',
          pos: 'absolute',
          inset: '-10px',
          bgImage:
            'repeating-linear-gradient( 100deg, #000 0%, #000 7%, transparent 10%, transparent 12%, #000 16% ), repeating-linear-gradient( 100deg, #60a5fa 10%, #e879f9 16%, #5eead4 22%, #60a5fa 30% )',
          bgSize: '200%, 100%',
          bgAttachment: 'fixed',
          mixBlendMode: 'overlay',
        },
      })}
    />
  </div>
);
