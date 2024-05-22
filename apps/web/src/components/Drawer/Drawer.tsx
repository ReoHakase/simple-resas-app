'use client';

import { Drawer as VaulDrawer } from 'vaul';
import { createConfigSlotRecipeContext } from '@/states/createConfigSlotRecipeContext';
import { drawer } from 'styled-system/recipes';

const { withVariantProvider, withVariantConsumer } = createConfigSlotRecipeContext(drawer);

// Disabled `compilerOptions.decleration` in tsconfig.json to avoid the following error:
// The inferred type of "X" cannot be named without a reference to "Y" ...
// Refer: https://github.com/microsoft/TypeScript/issues/42873
const Drawer = withVariantProvider(VaulDrawer.Root, null);
const DrawerTrigger = VaulDrawer.Trigger;
const DrawerPortal = VaulDrawer.Portal;
const DrawerOverlay = withVariantConsumer(VaulDrawer.Overlay, 'overlay');
const DrawerContent = withVariantConsumer(VaulDrawer.Content, 'content');
const DrawerScrollArea = withVariantConsumer('div', 'scrollarea');
const DrawerKnob = withVariantConsumer('div', 'knob');
const DrawerTitle = withVariantConsumer(VaulDrawer.Title, 'title');
const DrawerDescription = withVariantConsumer(VaulDrawer.Description, 'description');
const DrawerClose = withVariantConsumer(VaulDrawer.Close, 'close');

export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerScrollArea,
  DrawerKnob,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
};
