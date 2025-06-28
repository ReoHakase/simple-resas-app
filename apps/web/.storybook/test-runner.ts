import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext } from '@storybook/test-runner';

import { checkA11y, injectAxe } from 'axe-playwright';

/*
 * See https://storybook.js.org/docs/writing-tests/test-runner#test-hook-api
 * to learn more about the test-runner hooks API.
 */
const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
    // Get the entire context of a story, including parameters, args, argTypes, etc.
    const storyContext = await getStoryContext(page, context);

    // Do not run a11y tests on disabled stories.
    // eslint-disable-next-line ts/no-unsafe-member-access
    if (storyContext.parameters?.a11y?.['test-runner']?.disable) {
      // eslint-disable-next-line no-console
      console.info(
        `Skipping a11y tests for ${storyContext.title} / ${storyContext.name}. To enable it, remove \`parameters.a11y.disable = true\` from your desired story.`,
      );
      return;
    }

    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  },
};

export default config;
