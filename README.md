# RESAS 都道府県別 人口比較アプリ

https://github.com/ReoHakase/simple-resas-app/assets/16751535/831e492a-7738-433e-85a5-caaa0c98fad8

RESAS(地域経済分析システム)に掲載されている各種人口データを、都道府県別にグラフで比較できます。

- [x] 🌙 ダークモード対応
- [x] 📱 レスポンシブ対応
- [x] ♿ アクセシビリティ対応 [Pagespeed Insights](https://pagespeed.web.dev/analysis/https-resas-reoiam-dev-all/w6wyqvlcfx?form_factor=mobile)

| モバイル | デスクトップ |
| ---- | ---- |
| <img width="479" alt="image" src="https://github.com/ReoHakase/simple-resas-app/assets/16751535/51b22607-7e07-4263-9ca3-5c378e072c3f">| <img width="467" alt="image" src="https://github.com/ReoHakase/simple-resas-app/assets/16751535/2d2acce1-bd76-412a-9893-1cfd9ca1305d"> |

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
