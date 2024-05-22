# RESAS Population Comparison by Prefecture Application

The source code for simple population comparison app, [https://resas.reoiam.dev](https://resas.reoiam.dev).

Made with 💙 using:

- **Next.js<sup>14</sup>** ▲ _with `app` router._
- **Jotai** 👻 _to manage client-side states._
- **Panda CSS** 🐼 _for styling with amazing semantic token and recipe system._
- **Radix UI** 💻 _to provide accesible UI without hassle._
- ~~**Tanstack Query<sup>v5</sup>** 🚦 _to query and mutate endpoints efficiently._~~
- **Storybook** 📕 _to check styles and a11y, and to run visual regression tests._
- **Turborepo** ⚙️ _to manage monorepo with cache pipelines._

> [!WARNING]  
> Still under construction 🚧

### Build

#### Full Build

To build all apps and packages, run the following command:

```sh
pnpm turbo build
```

### Develop

To develop the main web app built with **Next.js**▲ (`apps/web`), run the following command:

```sh
pnpm turbo --filter web dev
```

### Lint and Test

To lint and test all apps and packages, run the following command:

```sh
pnpm turbo lint
pnpm turbo test
pnpm turbo sb:test # For Storybook interaction tests
```
