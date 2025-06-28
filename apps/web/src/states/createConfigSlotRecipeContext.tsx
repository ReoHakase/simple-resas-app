'use client';

import type { ComponentPropsWithoutRef, ComponentRef, ElementType } from 'react';
import { createContext, use, useMemo } from 'react';

import { cx } from 'styled-system/css';

/**
 * Reactコンポーネントの表示名を取得します。
 * 実装はPanda CSSの内部ヘルパーの1つに基づいています。
 * @param Component - Reactコンポーネント
 * @returns コンポーネントの表示名
 * @see https://github.com/chakra-ui/panda/blob/main/packages/studio/styled-system/jsx/factory-helper.mjs#L19
 */
function getDisplayName(Component: ElementType) {
  if (typeof Component === 'string')
    return Component;
  return Component?.displayName || Component?.name || 'Component';
}

type ConfigSlotRecipeVariant = Record<string, unknown>;

type ConfigSlotRecipe<S extends string, V extends ConfigSlotRecipeVariant> = {
  (props?: V): Record<S, string>;
  splitVariantProps: <Props extends V>(props: Props) => [V, Record<string, unknown>];
};

/**
 * スロットレシピコンテキストを作成し、バリアントプロバイダーとコンシューマーコンポーネントを作成します。
 * Radix UI、Vaul、SonnerなどのヘッドレスUIライブラリを使用してスタイル付きのUIコンポーネントを簡単に作成できます。
 * ```tsx
 * const drawerSlotRecipe = sva({
 *     slots: ['overlay', 'content', 'scrollarea', 'title', 'description', 'close', 'knob'],
 *     ... // スロットレシピの定義の残り
 * });
 * // スロットレシピコンテキストを作成します。
 * const { withVariantProvider, withVariantConsumer } = createSlotRecipeContext(drawerSlotRecipe);
 * // ヘッドレスUIコンポーネントをスロットレシピコンテキストでラップします。
 * const Drawer = withVariantProvider(VaulDrawer.Root, null); // `null`が指定されているためスタイルは適用されません。
 * const DrawerOverlay = withVariantProvider(VaulDrawer.Overlay, 'overlay');
 * const DrawerContent = withVariantConsumer(VaulDrawer.Content, 'content');
 * const DrawerTitle = withVariantConsumer(VaulDrawer.Title, 'title');
 * const DrawerDescription = withVariantConsumer(VaulDrawer.Description, 'description');
 * const DrawerClose = withVariantConsumer(VaulDrawer.Close, 'close');
 *
 * ```
 * @template S - スロット名のユニオン型。例：`"title" | "content" | "description" | "close"`
 * @template T - スロットレシピのバリアントレコードの型。
 * @param {SlotRecipeRuntimeFn<S, T>} recipe - `sva()`で作成されたスロットレシピランタイム関数、または設定レシピです。
 * @param {string} [recipeDisplayName] - (オプション) デバッグ用のレシピの表示名。
 * @returns {object} - `withVariantProvider()`はスロットバリアントプロップを受け取るラップされたコンポーネントを作成します。`withVariantConsumer`は`withVariantProvider()`で提供されるスロットスタイルを消費するコンポーネントを作成します。そして、`useVariantProps()`フックは必要に応じてバリアントプロップを取得できます。
 */
export function createConfigSlotRecipeContext<S extends string, V extends ConfigSlotRecipeVariant>(
  recipe: ConfigSlotRecipe<S, V>,
  recipeDisplayName?: string,
) {
  const SlotRecipeResultContext = createContext<ReturnType<typeof recipe> | null>(null);
  const VariantPropsContext = createContext<V | null>(null);

  /**
   * VariantPropsContextからバリアントプロップを取得します。
   * バリアントプロップが見つからない場合はエラーがスローされます。
   * @params keys - 取得するバリアントプロップのキー。`null`が指定された場合、すべてのバリアントプロップが取得されます。
   * @returns 対応する`withVariantProvider()`で提供される最も近い親のバリアントプロップ。
   * @throws {Error} バリアントプロップが見つからない場合。
   */
  const useVariantProps = (keys: Array<keyof V> | null = null) => {
    const variantProps = use(VariantPropsContext);
    if (!variantProps) {
      throw new Error(
        `useVariantProps: バリアントプロップが見つかりません。コンポーネントを対応する\`withVariantProvider()\`でラップすることを確認してください。`,
      );
    }
    const memoizedVariantProps = useMemo(() => {
      if (keys === null)
        return variantProps;
      return keys.reduce((acc, key) => ({ ...acc, [key]: variantProps[key] }), {} as V);
    }, [variantProps, keys]);
    return memoizedVariantProps;
  };

  /**
   * 特定のスロットのスタイルを取得します。
   * @param slot - スタイルを取得するスロット。
   * @returns 指定されたスロットのスタイル。
   * @throws {Error} スロットスタイルが見つからない場合。対応する`withVariantProvider()`でコンポーネントをラップすることを確認してください。
   */
  const useSlotRecipeResult = (slot: S) => {
    const slotStyles = use(SlotRecipeResultContext);
    if (!slotStyles) {
      throw new Error(
        `useSlotRecipeResult: スロットスタイルが見つかりません。コンポーネントを対応する\`withVariantProvider()\`でラップすることを確認してください。`,
      );
    }
    const memoizedSlotStyles = useMemo(() => slotStyles[slot], [slotStyles, slot]);
    return memoizedSlotStyles;
  };

  /**
   * コンポーネントをバリアントコンテキストプロバイダーでラップし、指定されたコンポーネントにスタイルを適用する高階関数です。
   * @param Component - 適用するHTML要素またはコンポーネント。例：`MyComponent`、`"span"`
   * @param {S | null} slot - `Component`に適用されるスロット名。`null`が指定された場合、`Component`には追加のクラス名がありません。
   * @returns ラップされたコンポーネント。
   */
  const withVariantProvider = <C extends ElementType, TNewProps extends V & ComponentPropsWithoutRef<C>>(
    Component: C,
    slot: S | null,
  ) => {
    const StyledComponent = ({ ref, ...props }: TNewProps & { ref?: React.RefObject<ComponentRef<C> | null> }) => {
      const [variantProps] = recipe.splitVariantProps(props as unknown as V);
      const slotStyles = useMemo(() => recipe(variantProps), [variantProps]);
      const styleClassName = slot === null ? undefined : slotStyles[slot];
      const originalClassName: string | undefined = useMemo(() => {
        const cn = props?.className as unknown;
        return typeof cn === 'string' ? cn : undefined;
      }, [props]);

      const newProps = {
        ...props,
        className: cx(styleClassName, originalClassName),
      } as unknown as TNewProps;

      return (
        <VariantPropsContext value={variantProps}>
          <SlotRecipeResultContext value={slotStyles}>
            {/* Type '{ ref: ForwardedRef<ComponentRef<C>>; } & TNewProps' is not assignable to type 'LibraryManagedAttributes<C, any>'.ts(2322) */}
            {/* @ts-expect-error: `LibraryManagedAttributes` の型エラーに関する有用な解決策が見つかりませんでした。型定義が深すぎることが原因かもしれません。 */}
            <Component ref={ref} {...newProps} />
          </SlotRecipeResultContext>
        </VariantPropsContext>
      );
    };

    // デバッグ時のDXを向上させるために表示名を設定します。
    // 表示名は次のようになります：`Dialog 🎨(container in dialogSlotRecipe)`.
    StyledComponent.displayName = `${getDisplayName(Component)} 🎨(${slot} in ${recipeDisplayName || recipe.name})`;
    return StyledComponent;
  };

  /**
   * コンポーネントをバリアントコンテキストコンシューマーでラップし、指定されたコンポーネントにスタイルを適用する高階関数です。
   * @param Component - 適用するHTML要素またはコンポーネント。例：`MyComponent`、`"span"`
   * @param {S} slot - `Component`に適用されるスロット名。`null`が指定された場合、`Component`には追加のクラス名がありません。
   * @returns ラップされたコンポーネント。
   */
  const withVariantConsumer = <C extends ElementType, TNewProps extends ComponentPropsWithoutRef<C>>(
    Component: C,
    slot: S,
  ) => {
    const StyledComponent = ({ ref, ...props }: TNewProps & { ref?: React.RefObject<ComponentRef<C> | null> }) => {
      const slotStyles = use(SlotRecipeResultContext);
      const styleClassName: string | undefined = useMemo(() => slotStyles?.[slot], [slotStyles]);
      const originalClassName: string | undefined = useMemo(() => {
        const cn = props?.className as unknown;
        return typeof cn === 'string' ? cn : undefined;
      }, [props]);

      const newProps = {
        ...props,
        className: cx(styleClassName, originalClassName),
      } as unknown as TNewProps;

      return (
        // Type '{ ref: ForwardedRef<ComponentRef<C>>; } & TNewProps' is not assignable to type 'LibraryManagedAttributes<C, any>'.ts(2322)
        // @ts-expect-error: `LibraryManagedAttributes` の型エラーに関する有用な解決策が見つかりませんでした。型定義が深すぎることが原因かもしれません。
        <Component ref={ref} {...newProps} />
      );
    };

    // デバッグ時のDXを向上させるために表示名を設定します。
    // 表示名は次のようになります：`DialogTrigger ↪️🎨(trigger in dialogSlotRecipe)`.
    StyledComponent.displayName = `${getDisplayName(Component)} ↪️🎨(${slot} in ${recipeDisplayName || recipe.name})`;
    return StyledComponent;
  };

  return { withVariantProvider, withVariantConsumer, useVariantProps, useSlotRecipeResult };
}
