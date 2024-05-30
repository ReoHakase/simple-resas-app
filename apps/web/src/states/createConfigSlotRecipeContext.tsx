'use client';

import { createContext, forwardRef, useContext, useMemo } from 'react';
import type { ElementRef, ElementType, ComponentPropsWithoutRef } from 'react';

import { cx } from 'styled-system/css';

/**
 * Reactコンポーネントの表示名を取得します。
 * 実装はPanda CSSの内部ヘルパーの1つに基づいています。
 * @param Component - Reactコンポーネント
 * @returns コンポーネントの表示名
 * @see https://github.com/chakra-ui/panda/blob/main/packages/studio/styled-system/jsx/factory-helper.mjs#L19
 */
const getDisplayName = (Component: ElementType) => {
  if (typeof Component === 'string') return Component;
  return Component?.displayName || Component?.name || 'Component';
};

type ConfigSlotRecipeVariant = Record<string, unknown>;

type ConfigSlotRecipe<S extends string, V extends ConfigSlotRecipeVariant> = {
  (props?: V): Record<S, string>;
  splitVariantProps<Props extends V>(props: Props): [V, Record<string, unknown>];
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
 * @returns {Object} - `withVariantProvider()`はスロットバリアントプロップを受け取るラップされたコンポーネントを作成します。`withVariantConsumer`は`withVariantProvider()`で提供されるスロットスタイルを消費するコンポーネントを作成します。そして、`useVariantProps()`フックは必要に応じてバリアントプロップを取得できます。
 */
export const createConfigSlotRecipeContext = <S extends string, V extends ConfigSlotRecipeVariant>(
  recipe: ConfigSlotRecipe<S, V>,
  recipeDisplayName?: string,
) => {
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
    const variantProps = useContext(VariantPropsContext);
    if (!variantProps) {
      throw new Error(
        `useVariantProps: バリアントプロップが見つかりません。コンポーネントを対応する\`withVariantProvider()\`でラップすることを確認してください。`,
      );
    }
    const memoizedVariantProps = useMemo(() => {
      if (keys === null) return variantProps;
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
    const slotStyles = useContext(SlotRecipeResultContext);
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
    const StyledComponent = forwardRef<ElementRef<C>, TNewProps>((props, ref) => {
      const [variantProps] = recipe.splitVariantProps(props);
      const slotStyles = useMemo(() => recipe(variantProps), [variantProps]);
      const styleClassName = slot === null ? undefined : slotStyles[slot];
      const originalClassName = useMemo(
        () => (typeof props?.className === 'string' ? props?.className : undefined),
        [props?.className],
      );

      const newProps: TNewProps = {
        ...props,
        className: cx(styleClassName, originalClassName),
      };

      return (
        <VariantPropsContext.Provider value={variantProps}>
          <SlotRecipeResultContext.Provider value={slotStyles}>
            {/* Type '{ ref: ForwardedRef<ElementRef<C>>; } & TNewProps' is not assignable to type 'LibraryManagedAttributes<C, any>'.ts(2322) */}
            {/* @ts-expect-error: `LibraryManagedAttributes` の型エラーに関する有用な解決策が見つかりませんでした。型定義が深すぎることが原因かもしれません。 */}
            <Component ref={ref} {...newProps} />
          </SlotRecipeResultContext.Provider>
        </VariantPropsContext.Provider>
      );
    });

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
    const StyledComponent = forwardRef<ElementRef<C>, TNewProps>((props, ref) => {
      const slotStyles = useContext(SlotRecipeResultContext);
      const styleClassName: string | undefined = useMemo(() => slotStyles?.[slot], [slotStyles]);
      const originalClassName: string | undefined = useMemo(
        () => (typeof props?.className === 'string' ? props?.className : undefined),
        [props?.className],
      );

      const newProps: TNewProps = {
        ...props,
        className: cx(styleClassName, originalClassName),
      };

      return (
        // Type '{ ref: ForwardedRef<ElementRef<C>>; } & TNewProps' is not assignable to type 'LibraryManagedAttributes<C, any>'.ts(2322)
        // @ts-expect-error: `LibraryManagedAttributes` の型エラーに関する有用な解決策が見つかりませんでした。型定義が深すぎることが原因かもしれません。
        <Component ref={ref} {...newProps} />
      );
    });

    // デバッグ時のDXを向上させるために表示名を設定します。
    // 表示名は次のようになります：`DialogTrigger ↪️🎨(trigger in dialogSlotRecipe)`.
    StyledComponent.displayName = `${getDisplayName(Component)} ↪️🎨(${slot} in ${recipeDisplayName || recipe.name})`;
    return StyledComponent;
  };

  return { withVariantProvider, withVariantConsumer, useVariantProps, useSlotRecipeResult };
};
