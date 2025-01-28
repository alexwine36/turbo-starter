'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { CompanyDialog } from '.';
import { useCompanyDialog } from './hook';

export const CompanyDialogWrapper = () => {
  const { rowAction, setRowAction } = useCompanyDialog();

  return (
    <>
      <Button
        onClick={() => {
          setRowAction({ type: 'create' });
        }}
        variant="outline"
        size="icon"
      >
        <PlusIcon />
      </Button>

      <CompanyDialog
        open={rowAction?.type === 'create'}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setRowAction(undefined);
          }
        }}
      />
    </>
  );
};
