import { defineSlotRecipe as sva } from '@pandacss/dev';

export const drawerSlotRecipe = sva({
  className: 'drawer',
  description: 'The drawer component styles.',
  jsx: [
    'Drawer',
    'DrawerTrigger',
    'DrawerPortal',
    'DrawerOverlay',
    'DrawerContent',
    'DrawerScrollArea',
    'DrawerKnob',
    'DrawerTitle',
    'DrawerDescription',
    'DrawerClose',
  ],
  slots: ['overlay', 'content', 'scrollarea', 'title', 'description', 'close', 'knob'],
  base: {
    overlay: {
      pos: 'fixed',
      inset: '0',
    },
    content: {
      shadow: 'floating',
      bg: 'keyplate.1',
      pos: 'fixed',
      display: 'flex',
      flexDir: 'column',
      zIndex: '100',
    },
    scrollarea: {
      p: '4',
      display: 'flex',
      flexDir: 'column',
      gap: '2',
      w: 'full',
    },
    knob: {
      position: 'absolute',
      bg: 'keyplate.6',
      rounded: 'full',
      flexShrink: '0',
      cursor: 'grab',
    },
    title: {
      fontWeight: 'bold',
      fontFamily: 'heading',
      fontSize: 'lg',
    },
    description: {
      fontSize: 'sm',
    },
    close: {
      pos: 'absolute',
      top: '2',
      color: 'keyplate.11',
      right: '2',
      fontSize: 'sm',
      fontWeight: 'bold',
      fontFamily: 'heading',
      textTransform: 'uppercase',
      cursor: 'pointer',
    },
  },
  variants: {
    overlay: {
      dark: {
        overlay: {
          bg: 'keyplate.a.3',
        },
      },
      transparent: {
        overlay: {
          bg: 'transparent',
        },
      },
    },
    direction: {
      top: {
        content: {
          top: '0',
          left: '0',
          right: '0',
          w: 'calc(token(sizes.full) - token(sizes.2) * 2)',
          mx: 'auto',
          roundedBottom: 'xl',
          pb: '2',
        },
        knob: {
          w: '24',
          bottom: '0',
          left: '0',
          right: '0',
          mx: 'auto',
          h: '1',
          my: '4',
        },
      },
      bottom: {
        content: {
          bottom: '0',
          left: '0',
          right: '0',
          w: 'calc(token(sizes.full) - token(sizes.2) * 2)',
          mx: 'auto',
          roundedTop: 'xl',
          pt: '2',
        },
        knob: {
          w: '24',
          top: '0',
          left: '0',
          right: '0',
          mx: 'auto',
          h: '1',
          my: '4',
        },
      },
      left: {
        content: {
          left: '0',
          top: '0',
          bottom: '0',
          h: 'calc(token(sizes.full) - token(sizes.2) * 2)',
          my: 'auto',
          roundedRight: 'xl',
          pr: '2',
        },
        knob: {
          h: '24',
          right: '0',
          top: '0',
          bottom: '0',
          my: 'auto',
          w: '1',
          mx: '4',
        },
      },
      right: {
        content: {
          right: '0',
          top: '0',
          bottom: '0',
          h: 'calc(token(sizes.full) - token(sizes.2) * 2)',
          my: 'auto',
          roundedLeft: 'xl',
          pl: '2',
        },
        knob: {
          h: '24',
          left: '0',
          top: '0',
          bottom: '0',
          my: 'auto',
          w: '1',
          mx: '4',
        },
      },
    },
    occupancy: {
      full: {
        content: {
          h: '90%',
        },
      },
      twothird: {
        content: {
          h: '67%',
        },
      },
      half: {
        content: {
          h: '50%',
        },
      },
      third: {
        content: {
          h: '33%',
        },
      },
    },
    scrollable: {
      true: {
        scrollarea: {
          overflowY: 'auto',
        },
      },
      false: {
        scrollarea: {
          overflowY: 'hidden',
        },
      },
    },
  },
  defaultVariants: {
    scrollable: false,
    occupancy: 'full',
    overlay: 'dark',
    direction: 'bottom',
  },
});
