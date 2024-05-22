'use client';

import { createContext, forwardRef, useContext, useMemo } from 'react';
import type { ElementRef, ElementType, ComponentPropsWithoutRef } from 'react';

import { cx } from 'styled-system/css';
import type { SlotRecipeRuntimeFn, SlotRecipeVariantRecord, RecipeSelection } from 'styled-system/types';

/**
 * Retrieves the display name of a React component.
 * Its implementation is based on one of internal helpers of Panda CSS.
 * @param Component - The React component.
 * @returns The display name of the component.
 * @see https://github.com/chakra-ui/panda/blob/main/packages/studio/styled-system/jsx/factory-helper.mjs#L19
 */
const getDisplayName = (Component: ElementType) => {
  if (typeof Component === 'string') return Component;
  return Component?.displayName || Component?.name || 'Component';
};

// Type generics S, T are the slot names and the variant record respectively.
// Refer: styled-system/types/recipe.d.ts

/**
 * Creates a slot recipe context with variant provider and consumer components.
 * You can created styled UI components with headless UI libraries such as Radix UI, Vaul, Sonner easily.
 * ```tsx
 * const drawerSlotRecipe = sva({
 *     slots: ['overlay', 'content', 'scrollarea', 'title', 'description', 'close', 'knob'],
 *     ... // The rest of the slot recipe definition
 * });
 * // Create a slot recipe context.
 * const { withVariantProvider, withVariantConsumer } = createSlotRecipeContext(drawerSlotRecipe);
 * // Wrap headless UI components with the slot recipe context.
 * const Drawer = withVariantProvider(VaulDrawer.Root, null); // No styles applied since `null` is given.
 * const DrawerOverlay = withVariantProvider(VaulDrawer.Overlay, 'overlay');
 * const DrawerContent = withVariantConsumer(VaulDrawer.Content, 'content');
 * const DrawerTitle = withVariantConsumer(VaulDrawer.Title, 'title');
 * const DrawerDescription = withVariantConsumer(VaulDrawer.Description, 'description');
 * const DrawerClose = withVariantConsumer(VaulDrawer.Close, 'close');
 *
 * ```
 * @template S - The union type of slot names. e.g. `"title" | "content" | "description" | "close"`
 * @template T - The type of slot recipe variant record.
 * @param {SlotRecipeRuntimeFn<S, T>} recipe - The slot recipe runtime function, which is created with `sva()` or is a config recipe.
 * @param {string} [recipeDisplayName] - (Optional) The display name of the recipe only for debugging.
 * @returns {Object} - `withVariantProvider()` creates a wrapped component to which slot variant props are given. `withVariantConsumer` creates a component that consumes slot styles provided by `withVariantProvider()`. And `useVariantProps()` hook can retrive variant props on your wish.
 */
export const createSlotRecipeContext = <S extends string, T extends SlotRecipeVariantRecord<S>>(
  recipe: SlotRecipeRuntimeFn<S, T>,
  recipeDisplayName?: string,
) => {
  const SlotRecipeResultContext = createContext<ReturnType<typeof recipe> | null>(null);
  const VariantPropsContext = createContext<RecipeSelection<T> | null>(null);

  /**
   * Retrieves the variant props from the VariantPropsContext.
   * Throws an error if the variant props are not found.
   * @params keys - The keys of the variant props to be retrieved. When `null` is given, all variant props are retrieved.
   * @returns The variant props of the nearest parent with corresponding `withVariantProvider()`.
   * @throws {Error} if the variant props are not found.
   */
  const useVariantProps = (keys: Array<keyof RecipeSelection<T>> | null = null) => {
    const variantProps = useContext(VariantPropsContext);
    if (!variantProps) {
      throw new Error(
        `useVariantProps: Could not find the variant props. Make sure to wrap the component with corresponding \`withVariantProvider()\`.`,
      );
    }
    const memoizedVariantProps = useMemo(() => {
      if (keys === null) return variantProps;
      return keys.reduce((acc, key) => ({ ...acc, [key]: variantProps[key] }), {} as RecipeSelection<T>);
    }, [variantProps, keys]);
    return memoizedVariantProps;
  };

  /**
   * Retrieves the styles for a specific slot.
   * @param slot - The slot for which to retrieve the styles.
   * @returns The styles for the specified slot.
   * @throws {Error} If the slot styles are not found. Make sure to wrap the component with the corresponding `withVariantProvider()`.
   */
  const useSlotRecipeResult = (slot: S) => {
    const slotStyles = useContext(SlotRecipeResultContext);
    if (!slotStyles) {
      throw new Error(
        `useSlotRecipeResult: Could not find the slot styles. Make sure to wrap the component with corresponding \`withVariantProvider()\`.`,
      );
    }
    const memoizedSlotStyles = useMemo(() => slotStyles[slot], [slotStyles, slot]);
    return memoizedSlotStyles;
  };

  /**
   * Higher-order function that wraps a component with variant context provider and applies styles to the given component.
   * @param Component - a HTML element or component to be applied. e.g. `MyComponent`, `"span"`
   * @param {S | null} slot - The slot name of which style gets applied to the `Component`. When `null` is given, the `Component` gets no additional classnames.
   * @returns The wrapped component.
   */
  const withVariantProvider = <
    C extends ElementType,
    TNewProps extends RecipeSelection<T> & ComponentPropsWithoutRef<C>,
  >(
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
            {/* @ts-expect-error: Could not find any useful solution on  `LibraryManagedAttributes` type error. It could be caused by the type definition getting too deep. */}
            <Component ref={ref} {...newProps} />
          </SlotRecipeResultContext.Provider>
        </VariantPropsContext.Provider>
      );
    });

    // Configure the display name to improve DX during debugging via React Devtools.
    // The resulting display name will be like: `Dialog 🎨(container in dialogSlotRecipe)`.
    StyledComponent.displayName = `${getDisplayName(Component)} 🎨(${slot} in ${recipeDisplayName || recipe.name})`;
    return StyledComponent;
  };

  /**
   * Higher-order function that wraps a component with variant context consumer and applies styles to the given component.
   * @param Component - a HTML element or component to be applied. e.g. `MyComponent`, `"span"`
   * @param {S} slot - The slot name of which style gets applied to the `Component`. When `null` is given, the `Component` gets no additional classnames.
   * @returns The wrapped component.
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
        // @ts-expect-error: Could not find any useful solution on  `LibraryManagedAttributes` type error. It could be caused by the type definition getting too deep.
        <Component ref={ref} {...newProps} />
      );
    });

    // Configure the display name to improve DX during debugging via React Devtools.
    // The resulting display name will be like: `DialogTrigger ↪️🎨(trigger in dialogSlotRecipe)`.
    StyledComponent.displayName = `${getDisplayName(Component)} ↪️🎨(${slot} in ${recipeDisplayName || recipe.name})`;
    return StyledComponent;
  };

  return { withVariantProvider, withVariantConsumer, useVariantProps, useSlotRecipeResult };
};
