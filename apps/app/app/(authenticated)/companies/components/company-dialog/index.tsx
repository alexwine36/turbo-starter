'use client';

import type { CompanyData } from '@repo/common-types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@repo/design-system/components/ui/dialog';
import type React from 'react';
import { trpc } from '../../../../../utils/trpc';
import { CompanyForm } from '../company-form';

export interface CompanyDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  company?: CompanyData;
}

export const CompanyDialog: React.FC<CompanyDialogProps> = ({
  company,
  open,
  onOpenChange,
}) => {
  // const [open, setOpen] = React.useState(false);
  const { data: me } = trpc.user.me.useQuery({});
  if (!me || !me.currentOrganizationId) {
    return null;
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{company ? 'Edit' : 'Create'} Company</DialogTitle>
          <DialogDescription>
            {company ? 'Edit an existing company' : 'Create a new company'}
          </DialogDescription>
        </DialogHeader>

        <CompanyForm
          company={company}
          organizationId={me.currentOrganizationId}
          onSuccess={() => {
            onOpenChange?.(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
