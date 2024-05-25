import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';
import type { FC, ReactNode } from 'react';
import { Aurora } from '@/features/landingPage/components/Aurora/Aurora';
import { Header } from '@/features/navigation/components/Header/Header';
import { PrefectureForm } from '@/features/navigation/components/PrefectureForm/PrefectureForm';
import { AppProvider } from '@/providers';
import { fontVariables } from '@/styles/fonts';
import { baseUrl } from '@/utils/routes/baseUrl';
import { css } from 'styled-system/css';
import '@/styles/globals.css';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  // `next-themes`プロバイダによるHydration差分を無視するため`suppressHydrationWarning`を付加する
  // 参照: https://github.com/pacocoursey/next-themes/issues/152
  // 参照: https://github.com/khinshankhan/next-themes-app-dir-example
  <html lang="ja" suppressHydrationWarning className={fontVariables}>
    <head />
    <body
      className={css({
        display: 'flex',
        minH: '100svh',
        flexDir: 'column',
        bg: 'keyplate.1',
        color: 'keyplate.12',
        overflowX: 'hidden',
      })}
    >
      {/* Refer: https://vercel.com/docs/concepts/analytics/quickstart */}
      <Analytics />
      <AppProvider>
        <Aurora />
        <Header />
        <div
          className={css({
            w: 'full',
            display: 'flex',
            flexDir: 'column',
            lg: {
              flexDir: 'row-reverse',
            },
            justifyContent: 'start',
            alignItems: 'start',
          })}
        >
          <div
            className={css({
              w: 'full',
              display: 'flex',
              flexDir: 'column',
              p: '6',
              flexGrow: '3',
              lgDown: {
                h: '440px', // CLS防止
              },
            })}
          >
            {children}
          </div>
          <PrefectureForm
            className={css({
              w: 'full',
              md: {
                p: '6',
              },
              flexGrow: '1',
              flexShrink: '0',
              lg: {
                maxW: '440px',
              },
            })}
          />
        </div>
      </AppProvider>
    </body>
  </html>
);

export default RootLayout;

const defaultTitle = 'RESAS 都道府県別 人口比較アプリケーション' as const;
const defaultDescription =
  'RESAS(地域経済分析システム)に掲載されている各種人口データを、都道府県別にグラフで比較できます。' as const;

export const metadata: Metadata = {
  metadataBase: baseUrl,

  title: {
    default: defaultTitle,
    template: '%s | RESAS',
  },
  description: defaultDescription,
  openGraph: {
    // Open graph image will be provided via file-based configuration.
    // Refer: https://beta.nextjs.org/docs/api-reference/metadata#static-images
    type: 'website',
    locale: 'ja-JP',
    title: defaultTitle,
    description: defaultDescription,
    siteName: defaultTitle,
    url: baseUrl,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

/**
 * ルートが再生成されるまでの時間を秒単位で指定します。
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
 */
export const revalidate = false; // 再生成なし
