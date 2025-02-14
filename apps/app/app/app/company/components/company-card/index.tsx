'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import React from 'react';
import { CompanyDialog } from '../company-dialog';
import { CompanyTable } from '../company-table';
import type { CompanyTypes } from '../company-types';

export const CompanyCard: React.FC<CompanyTypes> = (props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            Company
            <CompanyDialog
              open={open}
              onOpenChange={setOpen}
              showTrigger
              {...props}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CompanyTable {...props} />
      </CardContent>
    </Card>
  );
};
