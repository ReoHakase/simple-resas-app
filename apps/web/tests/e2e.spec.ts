import { test, expect } from '@playwright/test';

test('/', async ({ page }) => {
  // `/` ページにアクセス
  await page.goto('/');

  const suggestionLinks = await page.locator('main nav a').all(); // 使用例の提案リンク
  const headerLinks = await page.locator('header *:not(nav) a').all(); // トップページへのアイコン型リンクとGitHubリンク
  const headerNavigationLinks = await page.locator('header nav a').all(); // 各人口統計ページへのリンク

  expect(suggestionLinks).toHaveLength(3);
  expect(headerLinks).toHaveLength(2);
  expect(headerNavigationLinks).toHaveLength(4);

  const suggestions = [
    {
      name: '四大都市圏の総人口はどのくらい？',
      title: '東京都、愛知県、大阪府、福岡県の総人口',
    },
    {
      name: '都市部と近郊の子供の数の違いは？',
      title: '茨城県、千葉県、東京都の年少人口',
    },
    {
      name: '北と南で総人口が多いのは？',
      title: '北海道、沖縄県の総人口',
    },
  ];

  for (const { name, title } of suggestions) {
    const link = await page.locator(`main nav a`, { hasText: name });
    await link.click();
    await expect(page.locator('h1')).toHaveText(title);
    await page.goBack();
  }

  const prefectures = {
    '1': '北海道',
    '8': '茨城県',
    '47': '沖縄県',
  };

  for (const [prefCode] of Object.entries(prefectures)) {
    const checkbox = await page.locator(`input[type="checkbox"]#prefecture-${prefCode}`);
    await expect(checkbox).toBeTruthy();
    const label = await page.locator(`label#prefecture-${prefCode}-label`);
    await label.click();
    await expect(checkbox).toBeChecked();
    await expect(page).toHaveURL(`/?prefCodes=${prefCode}`);
    await label.click();
    await expect(checkbox).not.toBeChecked();
    await expect(page).toHaveURL('/');
  }
});

test('/[statLabel]', async ({ page }) => {
  // `/all?prefCodes=13,23,27,40` ページにアクセス
  await page.goto('/all?prefCodes=13,23,27,40');

  // 選択している都道府県の数を確認
  const selectionStateLabel = await page.locator('h2#selection-state-label');
  await expect(selectionStateLabel).toHaveText('4つの都道府県を選択中');

  // グラフが表示されていることを確認
  const chart = await page.locator('main div .recharts-wrapper');
  await expect(chart).toBeVisible();

  // グラフの線(都道府県)の数を確認
  await page.waitForSelector('main div .recharts-surface .recharts-line-dots');
  const lines = await page.locator('main div .recharts-surface .recharts-line-dots').all();
  await expect(lines).toHaveLength(4);

  // グラフの線一つについて、データポイントの数を確認
  await page.waitForSelector('main div .recharts-surface .recharts-line-dots circle');
  const firstLineDots = await page.locator('main div .recharts-surface .recharts-line-dots circle').all();
  await expect(firstLineDots.length).toBeGreaterThanOrEqual(18); // 1960年から2045年まで5年刻み

  // クリアボタンを押すと `/all` に遷移することを確認
  const clearButton = await page.locator('#selection-state-label a', { hasText: 'クリア' });
  await clearButton.click();
  await expect(page).toHaveURL('/all');
});
