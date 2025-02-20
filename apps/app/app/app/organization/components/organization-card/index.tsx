'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import React from 'react';
import { OrganizationDialog } from '../organization-dialog';
import { OrganizationTable } from '../organization-table';
import type { OrganizationTypes } from '../organization-types';

export const OrganizationCard: React.FC<OrganizationTypes> = (props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            Organization
            <OrganizationDialog
              open={open}
              onOpenChange={setOpen}
              showTrigger
              {...props}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <OrganizationTable {...props} />
      </CardContent>
    </Card>
  );
};
