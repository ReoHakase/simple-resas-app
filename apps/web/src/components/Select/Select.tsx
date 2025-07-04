'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { select } from 'styled-system/recipes';
import { createConfigSlotRecipeContext } from '@/states/createConfigSlotRecipeContext';

const { withVariantProvider, withVariantConsumer } = createConfigSlotRecipeContext(select);

const Select = withVariantProvider(SelectPrimitive.Root, null);
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = withVariantConsumer(SelectPrimitive.Trigger, 'trigger');
const SelectIcon = SelectPrimitive.Icon;
const SelectViewport = withVariantConsumer(SelectPrimitive.Viewport, 'viewport');
const SelectPortal = SelectPrimitive.Portal;
const SelectContent = withVariantConsumer(SelectPrimitive.Content, 'content');
const SelectItemIndicator = withVariantConsumer(SelectPrimitive.ItemIndicator, 'itemIndicator');
const SelectItem = withVariantConsumer(SelectPrimitive.Item, 'item');
const SelectItemText = SelectPrimitive.ItemText;
const SelectItemDescription = withVariantConsumer('span', 'itemDescription');
const SelectLabel = withVariantConsumer(SelectPrimitive.Label, 'label');
const SelectSeparator = withVariantConsumer(SelectPrimitive.Separator, 'separator');

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectItemDescription,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
};
