import type { CompanyData } from '@repo/common-types';
import type { DataTableRowAction } from '@repo/design-system/components/custom/data-table';
import { useState } from 'react';

export const useCompanyDialog = () => {
  const [rowAction, setRowAction] = useState<
    DataTableRowAction<CompanyData> | undefined
  >(undefined);

  return {
    rowAction,
    setRowAction,
  };
};

export type UseCompanyDialogReturn = ReturnType<typeof useCompanyDialog>;
