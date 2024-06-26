import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { Suspense } from 'react';
import { metadata as layoutMetadata, defaultTitle } from '../layout';
import { PopulationChart, PopulationChartSkeleton } from '@/features/population/components/PopulationChart';
import { fetchPrefectures } from '@/infra/resas/fetchPrefectures';
import { getGraphPageTitleLocaleJa } from '@/libs/getGraphPageTitleLocale';
import type { PrefCode } from '@/models/prefCode';
import { prefCodesSchema } from '@/models/prefCode';
import { statLabelSchema } from '@/models/statLabel';
import { css } from 'styled-system/css';

type GraphPageProps = {
  params: { statLabel: string };
  searchParams: Record<'prefCodes', string | string[] | undefined>;
};

const GraphPage = async ({ params, searchParams }: GraphPageProps): Promise<ReactElement> => {
  const statLabel = statLabelSchema.parse(params.statLabel);
  const prefCodes = prefCodesSchema.parse(
    searchParams.prefCodes
      ? [searchParams.prefCodes]
          .flat()
          .map((str) => str.split(','))
          .flat()
      : [],
  ) as PrefCode[];

  const { prefLocaleJa } = await fetchPrefectures();
  const title = getGraphPageTitleLocaleJa(prefLocaleJa, prefCodes, statLabel);

  return (
    <main
      className={css({
        w: 'full',
        display: 'flex',
        flexGrow: 1,
        flexDir: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        overflowX: 'hidden',
        gap: '4',
      })}
    >
      <h1
        className={css({
          fontFamily: 'heading',
          fontWeight: 'bold',
          fontSize: '2xl',
          lineClamp: 3,
          md: {
            fontSize: '4xl',
          },
        })}
      >
        {title}
      </h1>
      <Suspense key={title} fallback={<PopulationChartSkeleton className={css({ flexGrow: '1' })} />}>
        <PopulationChart className={css({ flexGrow: '1' })} statLabel={statLabel} prefCodes={prefCodes} />
      </Suspense>
    </main>
  );
};

export default GraphPage;

export const generateMetadata = async ({ params, searchParams }: GraphPageProps): Promise<Metadata> => {
  const statLabel = statLabelSchema.parse(params.statLabel);
  const prefCodes = prefCodesSchema.parse(
    searchParams.prefCodes
      ? [searchParams.prefCodes]
          .flat()
          .map((str) => str.split(','))
          .flat()
      : [],
  ) as PrefCode[];
  const { prefLocaleJa } = await fetchPrefectures();
  const title = getGraphPageTitleLocaleJa(prefLocaleJa, prefCodes, statLabel);
  return {
    title,
    openGraph: {
      ...layoutMetadata.openGraph,
      title: `${title} | ${defaultTitle}`,
    },
    twitter: layoutMetadata.twitter,
  };
};

/**
 * ルートが再生成されるまでの時間を秒単位で指定します。
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
 */
export const revalidate = 3600 * 24; // 24時間
