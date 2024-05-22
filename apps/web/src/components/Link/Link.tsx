import NextLink from 'next/link';
import type { LinkProps as NextLinkProps } from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

// It is required to forward generics T to NextLinkProps in order to make DynamicRoute work.
// e.g. `/tag/[tagId]`
type LinkProps<T> = (
  | (NextLinkProps<T> & {
      external?: false;
    })
  | (ComponentPropsWithoutRef<'a'> & {
      external: true;
    })
) & {
  children: ReactNode;
};

/**
 * A custom Link component that handles both internal and external links.
 *
 * @template T - The type of the route or URL object.
 * @param {LinkProps<T>} props - The props for the Link component.
 * @param {external} props.external - Whether the link is external.
 * @returns {ReactElement} - The rendered Link component.
 */
export const Link = <T,>({ children, ...props }: LinkProps<T>): ReactNode => {
  // Since experimental typedRoutes is enabled, NextLink only accepts
  // statically-typed routes and URL Objects, not strings.
  // Moreover, in React server components, it is unable to pass URL Objects via props. (SC to CC)
  // (It cannot be serialized as shown in the error message below.)

  // Warning: Only plain objects can be passed to Client Components from Server Components. URL objects are not supported.
  // <... className=... href={URL} target=... rel=... children=...>
  //                        ^^^^^

  // Therefore, we'd better use <a> tag instead of NextLink for external urls.

  // If the link is external, use <a> tag
  if (props.external) {
    // external is not a valid prop for <a> tag
    const { external, ...anchorProps } = props;
    return <a {...anchorProps}>{children}</a>;
  }
  // If not, use NextLink
  return <NextLink {...props}>{children}</NextLink>;
};

Link.displayName = 'Link';
