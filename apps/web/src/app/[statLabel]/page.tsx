import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { extractDataPointsByStatLabel } from '@/libs/extractDataPointsByStatLabel';
import { getPopulationCompositionAll } from '@/libs/getPopulationCompositionAll';
import { prefCodesSchema } from '@/models/prefCode';
import { statLabelSchema } from '@/models/statLabel';
import { getGraphPageTitleLocaleJa } from '@/utils/locale/getGraphPageTitleLocale';
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
  );
  const record = await getPopulationCompositionAll(prefCodes);
  const dataPoints = extractDataPointsByStatLabel(record, statLabel);
  const title = getGraphPageTitleLocaleJa(prefCodes, statLabel);
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
        p: '6',
        gap: '4',
      })}
    >
      <h1
        className={css({
          fontFamily: 'heading',
          fontWeight: 'bold',
          fontSize: '2xl',
          md: {
            fontSize: '4xl',
          },
        })}
      >
        {title}
      </h1>
      <p
        className={css({
          fontFamily: 'monospace',
          fontSize: 'sm',
          color: 'keyplate.11',
        })}
      >
        {JSON.stringify(dataPoints, null, 2)}
      </p>
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
  );
  const title = getGraphPageTitleLocaleJa(prefCodes, statLabel);
  return { title };
};

/**
 * ルートが再生成されるまでの時間を秒単位で指定します。
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
 */
export const revalidate = 3600 * 24; // 24時間
