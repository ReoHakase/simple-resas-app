import type { ReactNode } from 'react';
import { css } from 'styled-system/css';

const NotFoundPage = (): ReactNode => {
  return (
    <main
      className={css({
        w: 'full',
        display: 'flex',
        flexGrow: 1,
        flexDir: 'column',
        justifyContent: 'start',
        alignItems: 'center',
      })}
    >
      <h1
        className={css({
          fontFamily: 'heading',
          fontSize: '6xl',
          fontWeight: 'bold',
        })}
      >
        404
      </h1>
      <p>お探しのページは見つかりませんでした。</p>
    </main>
  );
};

export default NotFoundPage;
