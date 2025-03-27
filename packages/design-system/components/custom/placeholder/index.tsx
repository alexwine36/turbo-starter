'use client';

import { cn } from '@repo/design-system/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import { ChartPlaceholder } from './chart-placeholder';
import { NotesDisplay } from './notes-display';
import { TablePlaceholder } from './table-placeholder';
import type { BasePlaceholderProps } from './types';

const placeholderVariants = cva(
  '',
  // "rounded flex flex-col justify-center items-center p-2",
  {
    variants: {
      aspect: {
        default: 'aspect-[16/9]',
        min: '',
        square: 'aspect-square',
        portrait: 'aspect-[9/16]',
        fill: 'min-h-[100vh] flex-1 md:min-h-min',
      },
      bg: {
        default: '',
        muted: 'bg-muted/25',
      },
    },
    defaultVariants: {
      aspect: 'default',
      bg: 'default',
    },
  }
);

type PlaceholderProps = BasePlaceholderProps &
  VariantProps<typeof placeholderVariants>;

export const Placeholder: React.FC<PlaceholderProps> = ({
  notes,
  bg,
  className,
  title,
  description,
  aspect,
  chart,
  table,
}) => {
  const hasContent = chart || table;
  return (
    <Card
      className={cn(
        placeholderVariants({ aspect, bg, className }),
        chart || table ? 'items-start' : '',
        notes ? 'relative' : ''
      )}
    >
      <NotesDisplay notes={notes} />

      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {hasContent && (
        <CardContent className="h-full overflow-hidden">
          {chart && <ChartPlaceholder chart={chart} />}
          {table && <TablePlaceholder table={table} />}
        </CardContent>
      )}
    </Card>
  );
};
