import { Building2, ArrowRight, HomeIcon, MapPin } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from '@/components/Link';
import { css } from 'styled-system/css';

const Home = (): ReactNode => {
  return (
    <main
      className={css({
        w: 'full',
        display: 'flex',
        flexGrow: 1,
        flexDir: 'column',
        justifyContent: 'center',
        gap: '8',
        alignItems: 'center',
        lg: {
          minH: '80svh',
        },
      })}
    >
      <p
        className={css({
          fontSize: 'lg',
        })}
      >
        <Link href="https://resas.go.jp/#/13/13101" external referrerPolicy="no-referrer">
          RESAS(地域経済分析システム)
        </Link>
        に掲載されている各種人口データを、都道府県別にグラフで比較できます。
      </p>
      <nav
        className={css({
          pos: 'relative',
          zIndex: '5',
          w: 'full',
          maxW: '600px',
          display: 'flex',
          flexDir: 'column',
          justifyContent: 'start',
          alignItems: 'stretch',
          gap: '4',
        })}
      >
        <Link
          href="/all?prefCodes=13,23,27,40"
          className={css({
            px: '6',
            py: '4',
            gap: '2',
            display: 'flex',
            flexDir: 'column',
            bg: 'keyplate.a.1',
            border: '1px solid',
            borderColor: 'keyplate.6',
            rounded: '3xl',
            transition: 'background-color 0.2s',
            _hover: {
              bg: 'keyplate.a.3',
            },
          })}
        >
          <span
            className={css({
              display: 'flex',
              gap: '2',
              flexDir: 'row',
              alignItems: 'center',
              fontWeight: 'bold',
            })}
          >
            <Building2
              className={css({
                color: 'amber.11',
              })}
            />
            四大都市圏の総人口はどのくらい？
          </span>
          <span
            className={css({
              display: 'flex',
              gap: '2',
              flexDir: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: 'keyplate.11',
            })}
          >
            東京都、愛知県、大阪府、福岡県の総人口
            <ArrowRight />
          </span>
        </Link>
        <Link
          href="/young?prefCodes=8,12,13"
          className={css({
            px: '6',
            py: '4',
            gap: '2',
            display: 'flex',
            flexDir: 'column',
            bg: 'keyplate.a.1',
            border: '1px solid',
            borderColor: 'keyplate.6',
            rounded: '3xl',
            transition: 'background-color 0.2s',
            _hover: {
              bg: 'keyplate.a.3',
            },
          })}
        >
          <span
            className={css({
              display: 'flex',
              gap: '2',
              flexDir: 'row',
              alignItems: 'center',
              fontWeight: 'bold',
            })}
          >
            <HomeIcon
              className={css({
                color: 'green.11',
              })}
            />
            都市部と近郊の子供の数の違いは？
          </span>
          <span
            className={css({
              display: 'flex',
              gap: '2',
              flexDir: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: 'keyplate.11',
            })}
          >
            東京都、茨城県、千葉県の年少人口
            <ArrowRight />
          </span>
        </Link>
        <Link
          href="/all?prefCodes=1,47"
          className={css({
            px: '6',
            py: '4',
            gap: '2',
            display: 'flex',
            flexDir: 'column',
            bg: 'keyplate.a.1',
            border: '1px solid',
            borderColor: 'keyplate.6',
            rounded: '3xl',
            transition: 'background-color 0.2s',
            _hover: {
              bg: 'keyplate.a.3',
            },
          })}
        >
          <span
            className={css({
              display: 'flex',
              gap: '2',
              flexDir: 'row',
              alignItems: 'center',
              fontWeight: 'bold',
            })}
          >
            <MapPin
              className={css({
                color: 'crimson.11',
              })}
            />
            北と南で総人口が多いのは？
          </span>
          <span
            className={css({
              display: 'flex',
              gap: '2',
              flexDir: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: 'keyplate.11',
            })}
          >
            北海道、沖縄県の総人口
            <ArrowRight />
          </span>
        </Link>
      </nav>
      <small
        className={css({
          fontSize: 'sm',
          color: 'keyplate.11',
        })}
      >
        <Link external href="https://www.yumemi.co.jp/" referrerPolicy="no-referrer">
          株式会社ゆめみ
        </Link>
        のフロントエンド課題の一環で
        <Link href="https://github.com/ReoHakase" external referrerPolicy="no-referrer">
          白田連大 @ReoHakase
        </Link>
        により作成されました。
      </small>
    </main>
  );
};

export default Home;
