import type { ReactNode } from 'react';
import { css } from 'styled-system/css';

const Home = (): ReactNode => {
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
      <h1>Simple RESAS App</h1>
    </main>
  );
};

export default Home;
