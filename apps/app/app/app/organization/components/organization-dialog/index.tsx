'use client';

import type { OrganizationData } from '@repo/common-types';
import { Button } from '@repo/design-system/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/design-system/components/ui/dialog';
import { Edit, PlusIcon } from 'lucide-react';
import type React from 'react';
import { OrganizationForm } from '../organization-form';
import type { OrganizationTypes } from '../organization-types';

export interface OrganizationDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog>,
    OrganizationTypes {
  organization?: OrganizationData;
  showTrigger?: boolean;
}

export const OrganizationDialog: React.FC<OrganizationDialogProps> = ({
  organization,
  open,
  onOpenChange,
  showTrigger,
  ...props
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            {organization ? <Edit /> : <PlusIcon />}
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {organization ? 'Edit' : 'Create'} Organization
          </DialogTitle>
          <DialogDescription>
            {organization
              ? 'Edit an existing organization'
              : 'Create a new organization'}
          </DialogDescription>
        </DialogHeader>

        <OrganizationForm
          organization={organization}
          {...props}
          onSuccess={() => {
            onOpenChange?.(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
