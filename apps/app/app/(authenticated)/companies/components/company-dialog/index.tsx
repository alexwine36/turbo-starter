'use client';

import type { CompanyData } from '@repo/database/types';
import { Button } from '@repo/design-system/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/design-system/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import React from 'react';
import { trpc } from '../../../../../utils/trpc';
import { CompanyForm } from '../company-form';

export type CompanyDialogProps = {
  company?: CompanyData;
};

export const CompanyDialog: React.FC<CompanyDialogProps> = ({ company }) => {
  const [open, setOpen] = React.useState(false);
  const { data: me } = trpc.user.me.useQuery({});
  if (!me || !me.currentOrganizationId) {
    return null;
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {company ? (
          <Button variant={'ghost'}>Edit</Button>
        ) : (
          <Button variant="outline" size="icon">
            <PlusIcon />
          </Button>
        )}
      </DialogTrigger>
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
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
