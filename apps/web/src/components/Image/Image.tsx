import NextImage from 'next/image';
import type { ImageProps as NextImageProps } from 'next/image';
import { forwardRef, ForwardRefExoticComponent } from 'react';
import { breakpoints } from '@/styles/tokens/breakpoints';
import { css } from 'styled-system/css';
import type { SystemStyleObject } from 'styled-system/types';

export type ImageSizeDimension = `${number}vw` | `${number}px`;

export type ImageProps = Omit<NextImageProps, 'sizes'> & {
  sizes?:
    | (Partial<Record<keyof typeof breakpoints, ImageSizeDimension>> & { default: ImageSizeDimension })
    | ImageSizeDimension;
} & {
  css?: SystemStyleObject[];
};

/**
 * Generates the sizes string for an image based on the provided sizes object.
 * If sizes is not provided, returns '100vw'.
 * If sizes is a string, returns the string as is.
 * If sizes is an object, maps each key-value pair to a media query and value string,
 * using the breakpoints object to retrieve the media query for each key.
 * Joins the resulting strings with a comma and space separator.
 *
 * @param sizes - The sizes object for the image.
 * @returns The sizes string for the image.
 */
const generateSizes = (sizes: ImageProps['sizes']): string => {
  if (!sizes) {
    return '100vw';
  }

  if (typeof sizes === 'string') {
    return sizes;
  }

  return Object.entries(sizes)
    .map(([key, value]) => {
      if (key == 'default') {
        return value;
      }

      const breakpoint = key as keyof typeof breakpoints;
      return `(min-width: ${breakpoints[breakpoint]}) ${value}`;
    })
    .join(', ');
};

export const Image: ForwardRefExoticComponent<ImageProps> = forwardRef<
  HTMLImageElement | null,
  Omit<ImageProps, 'ref'>
>(({ css: cssProps = [{}], sizes, ...props }, ref) => (
  <NextImage ref={ref} sizes={sizes && generateSizes(sizes)} className={css(...cssProps)} {...props} />
));

Image.displayName = 'Image';
