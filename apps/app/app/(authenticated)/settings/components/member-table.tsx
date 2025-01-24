'use client';

import { DataTable } from '@repo/design-system/components/custom/data-table';
import { useDataTable } from '@repo/design-system/hooks/use-datatable';

import { Button } from '@repo/design-system/components/ui/button';
import { Edit } from 'lucide-react';
import { trpc } from '../../../../utils/trpc';
export const MemberTable = () => {
  const { data } = trpc.member.getAll.useQuery({});
  const table = useDataTable({
    selectable: true,
    columns: [
      {
        accessorKey: 'name',
        header: 'Name',
        enableSorting: true,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        enableSorting: true,
      },

      {
        accessorKey: 'role',
        header: 'Role',
        enableColumnFilter: true,
        filterFn: 'arrIncludesSome',
      },
      {
        accessorKey: 'title',
        header: 'Title',
        enableSorting: true,
      },
      {
        id: 'actions',
        accessorFn(row) {
          return `${row.email}-${row.email}`;
        },
        cell: ({ row: _ }) => {
          // const email = row.getValue<string>('email');
          // console.log(email);
          return (
            <Button
              aria-label="View"
              className="text-sm"
              // href={`/programs/${email}`}
              size="icon"
              variant="ghost"
            >
              <Edit size={16} />
            </Button>
          );
          // return <a href={`/programs/${value}`}>View</a>;
        },
      },
    ],
    data: data || [],
  });

  // console.log(table.selectedRows);

  return <DataTable {...table} />;
};
