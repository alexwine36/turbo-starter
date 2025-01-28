'use client';

import { DataTable } from '@repo/design-system/components/custom/data-table';
import { Button } from '@repo/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { useDataTable } from '@repo/design-system/hooks/use-datatable';
import { Ellipsis, Eye } from 'lucide-react';
import Link from 'next/link';
import { trpc } from '../../../../../utils/trpc';
import { CompanyDialog } from '../company-dialog';

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
      {
        accessorKey: 'slug',
        header: 'Slug',
        cell: ({ cell }) => {
          const slug = cell.getValue<string>();
          return <code>/{slug}</code>;
        },
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
      {
        id: 'actions',
        header: '',
        size: 40,
        // accessorFn(row) {
        //   return `${row.email}-${row.email}`;
        // },
        cell: ({ row }) => {
          // const email = row.getValue<string>('email');
          // console.log(email);
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
                <DropdownMenuItem asChild>
                  <CompanyDialog company={row.original} />
                </DropdownMenuItem>
                {/* <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                      value={row.original.label}
                      onValueChange={(value) => {
                        startUpdateTransition(() => {
                          toast.promise(
                            updateTask({
                              id: row.original.id,
                              label: value as Task['label'],
                            }),
                            {
                              loading: 'Updating...',
                              success: 'Label updated',
                              error: (err) => getErrorMessage(err),
                            }
                          );
                        });
                      }}
                    >
                      {tasks.label.enumValues.map((label) => (
                        <DropdownMenuRadioItem
                          key={label}
                          value={label}
                          className="capitalize"
                          disabled={isUpdatePending}
                        >
                          {label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => {
                    console.log('delete', row);
                  }}
                >
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
          // return <a href={`/programs/${value}`}>View</a>;
        },
      },
    ],
  });

  return <DataTable {...table} />;
};
