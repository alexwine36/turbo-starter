import type { CompanyData } from '@repo/common-types';
import type {
  ColumnDef,
  DataTableRowAction,
} from '@repo/design-system/components/custom/data-table';
import { Button } from '@repo/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { Ellipsis, Eye } from 'lucide-react';
import Link from 'next/link';

interface GetColumnsProps {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<CompanyData> | undefined>
  >;
}

export function getColumns({
  setRowAction,
}: GetColumnsProps): ColumnDef<CompanyData>[] {
  return [
    {
      accessorKey: 'id',
      header: '',
      size: 40,
      cell: ({ cell }) => {
        const id = cell.getValue<string>();
        return (
          <Button variant={'ghost'} size={'icon'} asChild>
            <Link href={`/company/${id}`}>
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
    {
      accessorKey: 'createdAt',
      enableSorting: true,
      header: 'Created At',
      cell: ({ cell }) => {
        const date = cell.getValue<Date>();
        return date.toLocaleDateString();
      },
    },
    {
      id: 'actions',
      header: '',
      size: 40,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
              >
                <Ellipsis className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: 'update' })}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: 'delete' })}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
