import { GithubIcon, Sigma, Baby, PersonStanding, Accessibility } from 'lucide-react';
import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { ThemeSelect } from '../ThemeSelect/ThemeSelect';
import { TopNavigationLink } from '../TopNavigation/TopNavigationLink';
import { Image } from '@/components/Image/Image';
import { Link } from '@/components/Link/Link';
import HeaderIconImage from '@public/icon.webp';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

export type HeaderProps = ComponentPropsWithoutRef<'header'>;

/**
 * Renders a header.
 */
export const Header = ({ ...props }: HeaderProps): ReactNode => {
  return (
    <header
      className={flex({
        pos: 'sticky',
        w: '100%',
        h: 'fit-content',
        top: '0',
        left: '0',
        zIndex: '100',
        direction: 'row',
        justify: 'space-between',
        align: 'center',
        p: '4',
        gap: '6',
        lgDown: {
          mb: '16', // Add margin bottom for top navigation bar.
        },
      })}
      {...props}
    >
      <div
        className={flex({
          direction: 'row',
          justify: 'start',
          align: 'center',
          gap: '6',
        })}
      >
        <Link
          href="/"
          className={css({
            rounded: 'full',
            flexShrink: '0',
          })}
        >
          <Image
            src={HeaderIconImage}
            css={[
              {
                rounded: 'full',
                w: '12',
                h: '12',
                outlineColor: 'cyan.9',
                outlineWidth: '2',
                outlineStyle: 'solid',
                outlineOffset: '2px',

                flexShrink: '0',
              },
            ]}
            alt="An Icon of ReoHakase"
            sizes="48px"
            placeholder="blur"
          />
        </Link>
        <p
          className={css({
            fontFamily: 'heading',
            fontWeight: 'bold',
            lineHeight: '1.25',
          })}
        >
          RESAS 都道府県別
          <br />
          人口比較アプリ
        </p>
      </div>
      <nav
        className={css({
          pos: 'absolute',
          w: 'fit-content',
          h: '12',
          top: '4',
          left: '0',
          right: '0',
          mx: 'auto',
          display: 'flex',
          rounded: 'xl',
          flexDir: 'row',
          bg: 'keyplate.a.3',
          p: '1',
          backdropFilter: 'blur(8px) saturate(130%)',
          lgDown: {
            maxW: 'calc(100% - 24px)',
            top: '20',
          },
        })}
      >
        <TopNavigationLink href="/all">
          <Sigma /> 総人口
        </TopNavigationLink>
        <TopNavigationLink href="/young">
          <Baby />{' '}
          <span>
            年少
            <span
              className={css({
                smDown: {
                  srOnly: true,
                },
              })}
            >
              人口
            </span>
          </span>
        </TopNavigationLink>
        <TopNavigationLink href="/productive">
          <PersonStanding />{' '}
          <span>
            生産年齢
            <span
              className={css({
                smDown: {
                  srOnly: true,
                },
              })}
            >
              人口
            </span>
          </span>
        </TopNavigationLink>
        <TopNavigationLink href="/elderly">
          <Accessibility />{' '}
          <span>
            老年
            <span
              className={css({
                smDown: {
                  srOnly: true,
                },
              })}
            >
              人口
            </span>
          </span>
        </TopNavigationLink>
      </nav>
      <div
        className={flex({
          direction: 'row',
          justify: 'end',
          align: 'center',
          grow: '1',
          gap: '2',
        })}
      >
        <ThemeSelect />
        <Link
          href="https://github.com/ReoHakase"
          external
          referrerPolicy="no-referrer"
          className={flex({
            fontFamily: 'heading',
            fontWeight: 'bold',
            px: '4',
            py: '2',
            smDown: {
              p: '3',
            },
            gap: '1',
            direction: 'row',
            align: 'center',
            bg: 'keyplate.12',
            color: 'keyplate.1',
            rounded: 'full',
          })}
        >
          <GithubIcon
            className={css({
              display: 'inline',
              w: '4',
              h: '4',
            })}
          />
          <span className={css({ smDown: { srOnly: true } })}>リポジトリを開く</span>
        </Link>
      </div>
    </header>
  );
};
