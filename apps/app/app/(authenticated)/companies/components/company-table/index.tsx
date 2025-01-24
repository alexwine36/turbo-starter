'use client';

import { DataTable } from '@repo/design-system/components/custom/data-table';
import { useDataTable } from '@repo/design-system/hooks/use-datatable';
import { trpc } from '../../../../../utils/trpc';

export const CompanyTable = () => {
  const { data } = trpc.company.getAll.useQuery({});

  const table = useDataTable({
    data: data || [],
    columns: [
      {
        accessorKey: 'name',
        header: 'Name',
      },
    ],
  });

  return <DataTable {...table} />;
};
