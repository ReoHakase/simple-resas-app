import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import HeaderIconImage from '@public/icon.webp';
import { Accessibility, Baby, GithubIcon, PersonStanding, Sigma } from 'lucide-react';
import { Suspense } from 'react';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';
import { Image } from '@/components/Image';
import { Link } from '@/components/Link';
import { ThemeSelect } from '../ThemeSelect';
import { TopNavigationLink, TopNavigationLinkFallback } from '../TopNavigation';

/**
 * リンクのテキストを表示するコンポーネントです。
 *
 * @param props - リンクテキストのプロパティ
 * @param props.omittableSuffix - 省略可能な接尾辞の文字列
 * @param props.children - 必ず表示する文字列
 * @returns span 要素
 */
function LinkText({ omittableSuffix, children }: { omittableSuffix?: string; children: string }): ReactNode {
  return (
    <span>
      {children}
      {omittableSuffix ? <span className={css({ smDown: { srOnly: true } })}>{omittableSuffix}</span> : null}
    </span>
  );
}

export type HeaderProps = ComponentPropsWithoutRef<'header'>;

/**
 * ヘッダーを表すコンポーネントです。
 */
export function Header({ ...props }: HeaderProps): ReactNode {
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
          mb: '16', // 下に突き出るナビゲーションバーの分だけ余白を取る
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
            className={css({
              rounded: 'full',
              w: '12',
              h: '12',
              outlineColor: 'cyan.9',
              outlineWidth: '2',
              outlineStyle: 'solid',
              outlineOffset: '2px',

              flexShrink: '0',
            })}
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
        <Suspense
          fallback={(
            <>
              <TopNavigationLinkFallback href="/all">
                <Sigma />
                {' '}
                <LinkText>総人口</LinkText>
              </TopNavigationLinkFallback>
              <TopNavigationLinkFallback href="/young">
                <Baby />
                {' '}
                <LinkText omittableSuffix="人口">年少</LinkText>
              </TopNavigationLinkFallback>
              <TopNavigationLinkFallback href="/productive">
                <PersonStanding />
                {' '}
                <LinkText omittableSuffix="人口">生産年齢</LinkText>
              </TopNavigationLinkFallback>
              <TopNavigationLinkFallback href="/elderly">
                <Accessibility />
                {' '}
                <LinkText omittableSuffix="人口">老年</LinkText>
              </TopNavigationLinkFallback>
            </>
          )}
        >
          <TopNavigationLink href="/all">
            <Sigma />
            {' '}
            <LinkText>総人口</LinkText>
          </TopNavigationLink>
          <TopNavigationLink href="/young">
            <Baby />
            {' '}
            <LinkText omittableSuffix="人口">年少</LinkText>
          </TopNavigationLink>
          <TopNavigationLink href="/productive">
            <PersonStanding />
            {' '}
            <LinkText omittableSuffix="人口">生産年齢</LinkText>
          </TopNavigationLink>
          <TopNavigationLink href="/elderly">
            <Accessibility />
            {' '}
            <LinkText omittableSuffix="人口">老年</LinkText>
          </TopNavigationLink>
        </Suspense>
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
          href="https://github.com/ReoHakase/simple-resas-app"
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
}
