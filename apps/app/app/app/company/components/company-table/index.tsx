'use client';

import { trpc } from '@/utils/trpc';
import type { CompanyData } from '@repo/common-types';
import type { DataTableRowAction } from '@repo/design-system/components/custom/data-table';
import { DataTable } from '@repo/design-system/components/custom/data-table';
import { DeleteDialog } from '@repo/design-system/components/custom/delete-dialog';
import { useDataTable } from '@repo/design-system/hooks/use-datatable';
import { useMemo, useState } from 'react';
import { CompanyDialog } from '../company-dialog';
import type { CompanyTypes } from '../company-types';
import { getColumns } from './columns';

export const CompanyTable: React.FC<CompanyTypes> = (props) => {
  const utils = trpc.useUtils();
  const { data, isLoading } = trpc.company.getAll.useQuery({});
  const [rowAction, setRowAction] = useState<
    DataTableRowAction<CompanyData> | undefined
  >(undefined);

  const { mutate: deleteCompany } = trpc.company.delete.useMutation({
    onSuccess: () => {
      utils.company.getAll.invalidate();
    },
  });

  const handleDelete = async (data: CompanyData[]) => {
    const _res = await Promise.all(
      data.map((d) => deleteCompany({ id: d.id }))
    );
  };

  const columns = useMemo(() => getColumns({ setRowAction }), []);
  const table = useDataTable({
    data: data || [],
    loading: isLoading,
    columns,
  });

  return (
    <>
      <DataTable {...table} />
      <CompanyDialog
        company={rowAction?.row?.original}
        open={rowAction?.type === 'update'}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setRowAction(undefined);
          }
        }}
        {...props}
      />
      <DeleteDialog
        label="company"
        handleDelete={handleDelete}
        data={rowAction?.row?.original ? [rowAction.row.original] : []}
        open={rowAction?.type === 'delete'}
        onOpenChange={() => setRowAction(undefined)}
        onSuccess={() => rowAction?.row.toggleSelected(false)}
      />
    </>
  );
};
