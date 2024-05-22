import type { MDXComponents } from 'mdx/types';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Image } from '@/components/Image/Image';
import type { ImageProps } from '@/components/Image/Image';
import { css, cx } from 'styled-system/css';
import {
  markupHeading,
  markupHr,
  markupSpan,
  markupA,
  markupImage,
  markupList,
  markupCode,
  markupDiv,
  markupTable,
  markupBlockquote,
} from 'styled-system/recipes';

// Define your custom MDX components.
export const mdxComponents: MDXComponents = {
  // Override the default <a> element to use the next/link component.
  // a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  // Add a custom component.
  // MyComponent: () => <div>Hello World!</div>,
  // @ts-expect-error Ignore difference between <img> and <Image> from next/image
  img: ({ src, alt, width, height, blurDataURL, className, ...props }: ImageProps): ReactNode => {
    const { img, figure, figcaption } = markupImage({ caption: !!alt });
    if (alt) {
      return (
        <figure className={figure}>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            placeholder="blur"
            blurDataURL={blurDataURL}
            sizes={{
              default: '100vw',
              lg: '800px',
            }}
            className={cx(img, className)}
            {...props}
          />
          <figcaption className={figcaption}>{alt}</figcaption>
        </figure>
      );
    }
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={blurDataURL}
      sizes={{
        default: '100vw',
        lg: '800px',
      }}
      className={cx(img, className)}
      {...props}
    />;
  },
  h1: ({ className, ...props }: ComponentPropsWithoutRef<'h1'>): ReactNode => (
    <h1 className={cx(markupHeading({ level: 'h1' }), className)} {...props} />
  ),
  h2: ({ className, ...props }: ComponentPropsWithoutRef<'h2'>): ReactNode => (
    <h2 className={cx(markupHeading({ level: 'h2' }), className)} {...props} />
  ),
  h3: ({ className, ...props }: ComponentPropsWithoutRef<'h3'>): ReactNode => (
    <h3 className={cx(markupHeading({ level: 'h3' }), className)} {...props} />
  ),
  h4: ({ className, ...props }: ComponentPropsWithoutRef<'h4'>): ReactNode => (
    <h4 className={cx(markupHeading({ level: 'h4' }), className)} {...props} />
  ),
  h5: ({ className, ...props }: ComponentPropsWithoutRef<'h5'>): ReactNode => (
    <h5 className={cx(markupHeading({ level: 'h5' }), className)} {...props} />
  ),
  h6: ({ className, ...props }: ComponentPropsWithoutRef<'h6'>): ReactNode => (
    <h6 className={cx(markupHeading({ level: 'h6' }), className)} {...props} />
  ),
  hr: ({ className, ...props }: ComponentPropsWithoutRef<'hr'>): ReactNode => (
    <hr className={cx(markupHr(), className)} {...props} />
  ),
  strong: ({ className, ...props }: ComponentPropsWithoutRef<'strong'>): ReactNode => (
    <strong
      className={cx(
        css({
          fontWeight: 'bold',
        }),
        className,
      )}
      {...props}
    />
  ),
  em: ({ className, ...props }: ComponentPropsWithoutRef<'em'>): ReactNode => (
    <em
      className={cx(
        css({
          fontStyle: 'italic',
        }),
        className,
      )}
      {...props}
    />
  ),
  del: ({ className, ...props }: ComponentPropsWithoutRef<'del'>): ReactNode => (
    <del
      className={cx(
        css({
          textDecoration: 'line-through',
        }),
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: ComponentPropsWithoutRef<'a'>): ReactNode => (
    <a className={cx(markupA(), className)} {...props} />
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<'p'>): ReactNode => (
    <p
      className={cx(
        css({
          my: '1',
        }),
        className,
      )}
      {...props}
    />
  ),
  span: ({ className, ...props }: ComponentPropsWithoutRef<'span'>): ReactNode => (
    <span className={cx(markupSpan(), className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentPropsWithoutRef<'blockquote'>): ReactNode => (
    <blockquote className={cx(markupBlockquote(), className)} {...props} />
  ),
  div: ({ className, ...props }: ComponentPropsWithoutRef<'div'>): ReactNode => (
    <div className={cx(markupDiv(), className)} {...props} />
  ),
  ul: ({ className, ...props }: ComponentPropsWithoutRef<'ul'>): ReactNode => (
    <ul
      className={cx(
        markupList({
          type: 'unordered',
        }),
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<'ol'>): ReactNode => (
    <ol
      className={cx(
        markupList({
          type: 'ordered',
        }),
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<'code'>): ReactNode => (
    <code className={cx(markupCode().code, className)} {...props} />
  ),
  pre: ({ className, ...props }: ComponentPropsWithoutRef<'pre'>): ReactNode => (
    <pre className={cx(markupCode().pre, className)} {...props} />
  ),
  table: ({ className, ...props }: ComponentPropsWithoutRef<'table'>): ReactNode => (
    <table className={cx(markupTable().table, className)} {...props} />
  ),
  thead: ({ className, ...props }: ComponentPropsWithoutRef<'thead'>): ReactNode => (
    <thead className={cx(markupTable().thead, className)} {...props} />
  ),
  tbody: ({ className, ...props }: ComponentPropsWithoutRef<'tbody'>): ReactNode => (
    <tbody className={cx(css({}), className)} {...props} />
  ),
  tr: ({ className, ...props }: ComponentPropsWithoutRef<'tr'>): ReactNode => (
    <tr className={cx(markupTable().tr, className)} {...props} />
  ),
  th: ({ className, ...props }: ComponentPropsWithoutRef<'th'>): ReactNode => (
    <th className={cx(markupTable().th, className)} {...props} />
  ),
  td: ({ className, ...props }: ComponentPropsWithoutRef<'td'>): ReactNode => (
    <td className={cx(markupTable().td, className)} {...props} />
  ),
};
