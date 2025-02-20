'use client';

import type { CompanyData } from '@repo/common-types';
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
import { CompanyForm } from '../company-form';
import type { CompanyTypes } from '../company-types';

export interface CompanyDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog>,
    CompanyTypes {
  company?: CompanyData;
  showTrigger?: boolean;
}

export const CompanyDialog: React.FC<CompanyDialogProps> = ({
  company,
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
            {company ? <Edit /> : <PlusIcon />}
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{company ? 'Edit' : 'Create'} Company</DialogTitle>
          <DialogDescription>
            {company ? 'Edit an existing company' : 'Create a new company'}
          </DialogDescription>
        </DialogHeader>

        <CompanyForm
          company={company}
          {...props}
          onSuccess={() => {
            onOpenChange?.(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
