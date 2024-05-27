# 📊 RESAS 都道府県別 人口比較アプリ

https://github.com/ReoHakase/simple-resas-app/assets/16751535/831e492a-7738-433e-85a5-caaa0c98fad8

RESAS(地域経済分析システム)に掲載されている各種人口データを、都道府県別にグラフで比較できます。

## 概要

- [x] **📦 React Server Component使用** RESAS APIに対する`fetch`とデータ整形は全てサーバー側で実行し、24時間のキャッシュ有効期限を与えています。
- [x] **🌙 ダークモード対応** [Figma](https://www.figma.com/design/hsWBflpYMAqzRCIabKZYnJ/Yumemi?node-id=402-1692&t=v4Zz5MpKl4nAQQMe-1)のVariablesとCSS変数を使い、効率的にダークモード対応を行えるカラーパレットを用いました。
- [x] **📱 レスポンシブ対応** どのような画面サイズに対しても、読み込み過程でのCLSなく表示できます。
- [x] **♿ アクセシビリティ対応** [Pagespeed Insights](https://pagespeed.web.dev/analysis/https-resas-reoiam-dev-all/w6wyqvlcfx?form_factor=mobile)でスコア100を記録しました。
- [x] **📤 Opengraph対応** URLを送るだけで、選択中の都道府県と統計の種類をわかりやすく共有できます。

### Pagespeed Insights

| モバイル | デスクトップ |
| ---- | ---- |
| <img width="479" alt="image" src="https://github.com/ReoHakase/simple-resas-app/assets/16751535/51b22607-7e07-4263-9ca3-5c378e072c3f">| <img width="467" alt="image" src="https://github.com/ReoHakase/simple-resas-app/assets/16751535/2d2acce1-bd76-412a-9893-1cfd9ca1305d"> |
| https://pagespeed.web.dev/analysis/https-resas-reoiam-dev-all/w6wyqvlcfx?form_factor=mobile | https://pagespeed.web.dev/analysis/https-resas-reoiam-dev-all/w6wyqvlcfx?form_factor=desktop |

### Opengraph

[茨城県、千葉県、東京都の総人口 | RESAS 都道府県別 人口比較アプリケーション](https://resas.reoiam.dev/all?prefCodes=8,12,13)

| X (Twitter) | Slack | Facebook | LinkedIn |
| --- | --- | --- | --- |
| <img width="577" alt="image" src="https://github.com/ReoHakase/simple-resas-app/assets/16751535/48e7f71b-9ed7-40c8-be33-bb71f30958ad"> | <img width="568" alt="image" src="https://github.com/ReoHakase/simple-resas-app/assets/16751535/013074d8-effa-4e90-a03a-68b05e0c7519"> | <img width="577" alt="image" src="https://github.com/ReoHakase/simple-resas-app/assets/16751535/6a42ce8e-04e4-4cc1-9644-15c6bf4b8edd"> | <img width="576" alt="image" src="https://github.com/ReoHakase/simple-resas-app/assets/16751535/905b2b9a-a021-4280-a47f-80a281213ef3"> |

### Figma

https://www.figma.com/design/hsWBflpYMAqzRCIabKZYnJ/Yumemi?node-id=402-1692&t=v4Zz5MpKl4nAQQMe-1





## 技術スタック

- **Next.js<sup>14</sup>** ▲ `app`ルーター
- **Panda CSS** 🐼 トークンとレシピを用いたデザインシステムの構築
- **Recharts** 📊 グラフ描画
- **Zod** 💎 スキーマとバリデータの定義
- **Storybook** 📕 アクセシビリティやインタラクションテストの実行と見た目の確認
- **Vitest** ⚡ テストの実行
- **Turborepo** ⚙️ モノレポのビルドやリントのキャッシュ管理

## 環境構築の手順

### 依存関係のインストール

Node.jsとpnpmのバージョン管理にprototoolsを使用しています。まずは、以下のコマンドを実行するか、`.prototools`に記述されているバージョンのものを手動でインストールしてください。
```sh
proto use
pnpm i
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
```

## その他情報

開発にかかった時間: 5日間 (1日あたり平均5時間作業)
