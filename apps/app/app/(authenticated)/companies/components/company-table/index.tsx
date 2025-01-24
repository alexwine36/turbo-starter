'use client';

import { DataTable } from '@repo/design-system/components/custom/data-table';
import { Button } from '@repo/design-system/components/ui/button';
import { useDataTable } from '@repo/design-system/hooks/use-datatable';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { trpc } from '../../../../../utils/trpc';

export const CompanyTable = () => {
  const { data } = trpc.company.getAll.useQuery({});
  console.log(data);
  const table = useDataTable({
    data: data || [],

    columns: [
      {
        accessorKey: 'id',
        header: '',
        size: 40,
        cell: ({ cell }) => {
          const id = cell.getValue<string>();
          return (
            <Button variant={'ghost'} size={'icon'} asChild>
              <Link href={`/companies/${id}`}>
                <Eye />
              </Link>
            </Button>
          );
        },
      },
      {
        accessorKey: 'name',
        header: 'Name',
        enableSorting: true,
      },
      //   {
      //     accessorKey: 'image',
      //     header: 'Image',

      //     cell: ({ cell }) => {
      //       const image = cell.getValue<string>();
      //       return (
      //         <img
      //           src={image}
      //           alt="Company Logo"
      //           className="h-8 w-8 rounded-full"
      //         />
      //       );
      //     },
      //   },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'website',
        header: 'Website',
      },

      {
        accessorKey: 'type',
        header: 'Type',
      },
      {
        accessorKey: 'createdAt',
        enableSorting: true,
        header: 'Created At',
        cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return date.toLocaleDateString();
        },
      },
    ],
  });

  return <DataTable {...table} />;
};
