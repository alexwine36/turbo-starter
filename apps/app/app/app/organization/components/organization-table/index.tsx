'use client';

import { trpc } from '@/utils/trpc';
import type { OrganizationData } from '@repo/common-types';
import { DataTable } from '@repo/design-system/components/custom/data-table';
import type { DataTableRowAction } from '@repo/design-system/components/custom/data-table';
import { useDataTable } from '@repo/design-system/hooks/use-datatable';
import { useMemo, useState } from 'react';
import { OrganizationDialog } from '../organization-dialog';
import type { OrganizationTypes } from '../organization-types';
import { getColumns } from './columns';

export const OrganizationTable: React.FC<OrganizationTypes> = (props) => {
  const { data, isLoading } = trpc.organization.getAll.useQuery({});
  const [rowAction, setRowAction] = useState<
    DataTableRowAction<OrganizationData> | undefined
  >(undefined);

  const columns = useMemo(() => getColumns({ setRowAction }), []);
  const table = useDataTable({
    data: data || [],
    loading: isLoading,
    columns,
  });

  return (
    <>
      <DataTable {...table} />
      <OrganizationDialog
        organization={rowAction?.row?.original}
        open={rowAction?.type === 'update'}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setRowAction(undefined);
          }
        }}
        {...props}
      />
    </>
  );
};
