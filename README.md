# 📊 RESAS 都道府県別 人口比較アプリ

https://github.com/ReoHakase/simple-resas-app/assets/16751535/831e492a-7738-433e-85a5-caaa0c98fad8

RESAS(地域経済分析システム)に掲載されている各種人口データを、都道府県別にグラフで比較できます。
株式会社ゆめみの[フロントエンドコーディング試験](https://yumemi.notion.site/0e9ef27b55704d7882aab55cc86c999d)の課題の一環で作成しました。

## 概要

- [x] **📦 React Server Component使用** RESAS APIに対する`fetch`とデータ整形は全てサーバー側で実行し、24時間のキャッシュ有効期限を与えています。
- [x] **🌙 ダークモード対応** [Figma](https://www.figma.com/design/hsWBflpYMAqzRCIabKZYnJ/Yumemi?node-id=402-1692&t=v4Zz5MpKl4nAQQMe-1)のVariablesとCSS変数を使い、効率的にダークモード対応を行えるカラーパレットを用いました。
- [x] **📱 レスポンシブ対応** どのような画面サイズに対しても、読み込み過程でのCLSなく表示できます。
- [x] **♿ アクセシビリティ対応** [Pagespeed Insights](https://pagespeed.web.dev/analysis/https-resas-reoiam-dev-all/w6wyqvlcfx?form_factor=mobile)でスコア100を記録しました。
- [x] **📤 Opengraph対応** URLを送るだけで、選択中の都道府県と統計の種類をわかりやすく共有できます。
- [x] **🤖 GitHub Actions使用** ESLint & Prettierの実行、Vitestのテストの実行、Storybookのインタラクションテストの実行、PlaywrightのE2Eテストの実行をPR毎に自動化しています。

### Pagespeed Insights

| モバイル                                                                                                                               | デスクトップ                                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="479" alt="image" src="https://github.com/ReoHakase/simple-resas-app/assets/16751535/51b22607-7e07-4263-9ca3-5c378e072c3f"> | <img width="467" alt="image" src="https://github.com/ReoHakase/simple-resas-app/assets/16751535/2d2acce1-bd76-412a-9893-1cfd9ca1305d"> |
| https://pagespeed.web.dev/analysis/https-resas-reoiam-dev-all/w6wyqvlcfx?form_factor=mobile                                            | https://pagespeed.web.dev/analysis/https-resas-reoiam-dev-all/w6wyqvlcfx?form_factor=desktop                                           |

### Opengraph

[茨城県、千葉県、東京都の総人口 | RESAS 都道府県別 人口比較アプリケーション](https://resas.reoiam.dev/all?prefCodes=8,12,13)

| X (Twitter)                                                                                                                            | Slack                                                                                                                                  | Facebook                                                                                                                               | LinkedIn                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="577" alt="image" src="https://github.com/ReoHakase/simple-resas-app/assets/16751535/48e7f71b-9ed7-40c8-be33-bb71f30958ad"> | <img width="568" alt="image" src="https://github.com/ReoHakase/simple-resas-app/assets/16751535/013074d8-effa-4e90-a03a-68b05e0c7519"> | <img width="577" alt="image" src="https://github.com/ReoHakase/simple-resas-app/assets/16751535/6a42ce8e-04e4-4cc1-9644-15c6bf4b8edd"> | <img width="576" alt="image" src="https://github.com/ReoHakase/simple-resas-app/assets/16751535/905b2b9a-a021-4280-a47f-80a281213ef3"> |

### Figma

https://www.figma.com/design/hsWBflpYMAqzRCIabKZYnJ/Yumemi?node-id=402-1692&t=v4Zz5MpKl4nAQQMe-1

## 技術スタック

- **Next.js<sup>14</sup>** ▲ `app`ルーター
- **Panda CSS** 🐼 トークンとレシピを用いたデザインシステムの構築
- **Recharts** 📊 グラフ描画
- **Zod** 💎 スキーマとバリデータの定義
- **Storybook** 📕 アクセシビリティやインタラクションテストの実行と見た目の確認
- **Vitest** ⚡ ユニットテストの実行
- **Playwright** 🎭 E2Eテストの実行
- **Turborepo** ⚙️ モノレポのビルドやリントのキャッシュ管理

> [!NOTE]
> 定期試験と大学編入試験に起因する開発者の多忙により、ヘッダー内のテーマセレクタの実装にRadix UIへの依存が残ってしまっています。課題の要件に係る核心的機能ではないので、見逃してくださると幸いです。

## 環境構築の手順

### 依存関係のインストール

Node.jsとpnpmのバージョン管理にprototoolsを使用しています。まずは、以下のコマンドを実行するか、`.prototools`に記述されているバージョンのものを手動でインストールしてください。

```sh
proto use
pnpm i
pnpm lefthook install # コミット時チェックのGitフック管理ツールのインストール (初回のみ)
pnpm playwright install --with-deps # StorybookのインタラクションテストのCLI実行 & E2Eテストの実行に必要
```

### 環境変数の設定

このアプリケーションの実行には、`apps/web/src/env.ts`のスキーマに記述されている通りの環境変数が必要です。
`apps/web/.env.local`にRESAS APIキーを保存してください。

```
RESAS_API_KEY=QwErTy*************
```

#### 各種タスクの実行

このモノレポ内の各パッケージに対して、Turborepo `turbo`を用いてキャッシュを効かせながら効率的にタスクを実行できます。
`pnpm`の`--filter -F`フラグと同じ構文で、実行対象のパッケージを狭めることができます。

```sh
pnpm turbo build # 全てのパッケージをビルド
pnpm turbo -F web build # Next.jsのパッケージのみビルド
pnpm turbo -F web dev # Next.jsの開発サーバーを起動
pnpm turbo lint # 全てのパッケージをリント
pnpm turbo test # 全てのパッケージのテストを実行
pnpm turbo sb:test # Storybookのインタラクションテストを実行
pnpm turbo playwright:test # E2Eテストを実行
```

## 評価

開発にかかった時間: 6日間 (1日あたり平均5時間作業)

> なお、担当者からのレビューは以下の通りです。
よろしければ参考までにご確認をいただけますと幸いです。

### Goodチェック
- 独自にワイヤーフレームを解釈してデザイン・実装している
- API で取得したデータをキャッシュしている
- API のエラーハンドリングができている
- 通信時のローディングの UI を実装している
- 良いインタラクションを与えるアニメーションを実装している
- Lighthouse のスコアで高い評価となっている
- コンポーネント分割の粒度が適切である
- ビジネスロジックをコンポーネントから外だししている
- CSS in JS を利用している
- Unit Test を書いている
- E2E Test を書いている
- StoryBook を導入している
- スナップショットテストが導入されている
- Docker を利用している
- CI を構築している
- Issue や PR の機能などを活用して開発している
- Hooks を使っている
- API-key をアプリケーションコードから秘匿している
- API-key をビルドファイルから秘匿している
- JSDoc を書いている
- コメントの量が適切である
- コミットの粒度が適切である
- コミットのメッセージが適切である
- コミットに prefix がついている
- Turborepo を使用している
- アイコンライブラリを使用している
- Zod を使用している
- Next 14 の App Router を使用している
- Storybook を活用した Interaction Test を実装している
- ダークモード対応をしている
- OGP 対応をしている
- favicon の設定をしている
- .npmrc の設定をしている
- LICENSE の設定をしている
- .prototools で Node.js と pnpm のバージョン指定をしている
- ワークスペースファイルを設定している
- Renovate を導入している
- Figma を活用している
- アクセシビリティ対応をしている
- トップページに人口比較のためのサンプルリンクを設置している
- Server Component を使用して API への fetch をサーバー側で実行している
- 実装の各所で多くの工夫が見られクオリティの高いアプリケーションになっている
  - クエリパラメータによるビューの共有
  - 独自のデザイン
  - 適切なメタデータの設定
  - etc…（書ききれない）
- README.md が詳細にかかれており、アピールポイントや技術スタックが非常にわかりやすい
- CI/CD を実装したうえでしっかりと全て通っている
- テストのクオリティが高い
  - E2E テストでグラフが適切に表示されているか検証されている
  - ユニットテストもしっかりとテストデータを用いて細かく検証されている
- セマンティックな HTML がかけている

### Nextチェック
- チェックボックス横のラベルにホバーした時に cursor: pointer になっていない
- トップページでチェックボックスをクリックしても表示が変わらない


### 総合評価
　Figma での UI デザイン設計に始まり、アプリケーションの設計はもちろん、実装意図を残したコメントや各テストの記述など、全てにおいて細部まで丁寧に実装されており、最善を目指して開発される姿勢がとても素晴らしいと思いました。極めて高レベルな対応を 30 時間という短い時間で成し遂げられており、完成した Web アプリケーションもクオリティの高いものになっており、レビュワー一同大変感心いたしました。チーム開発への意識もしっかりとされており、現時点で業務に加わっても第一線で活躍できる素養をお持ちの方だと確信いたしました。
　Next 項目もほとんどなかったですが、一点、ユーザー視点に立って Next を上げるとすれば、トップページで都道府県を選択するチェックボックスがあるものの、チェックを付けても何も表示が変わらないのはユーザーフレンドリーではないと感じました。ここを改善されるとより良い Web アプリケーションになるかと思います。

> レビュワー一同、非常に好評価でした。
