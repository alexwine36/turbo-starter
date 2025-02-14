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
import { DeleteDialog } from '@repo/design-system/components/custom/delete-dialog';
import { useDataTable } from '@repo/design-system/hooks/use-datatable';
import { Ellipsis, Eye } from 'lucide-react';
import Link from 'next/link';
import { trpc } from '@/utils/trpc';
import { OrganizationDialog } from '../organization-dialog';
import type { DataTableRowAction } from '@repo/design-system/components/custom/data-table';
import { useState, useMemo } from 'react';
import type { OrganizationData } from '@repo/common-types';
import { OrganizationTypes } from '../organization-types';
import { getColumns } from './columns';


export const OrganizationTable: React.FC<OrganizationTypes> = (props) => {
  const { data, isLoading } = trpc.organization.getAll.useQuery({});
  const [rowAction, setRowAction] = useState< DataTableRowAction<OrganizationData> | undefined
    >(undefined);


    const columns = useMemo(() => getColumns({ setRowAction }), []);
    const table = useDataTable({
    data: data || [],
    loading: isLoading,
    columns
    });

    return (
    <>
      <DataTable {...table} />
      <OrganizationDialog organization={rowAction?.row?.original} open={rowAction?.type==='update' }
        onOpenChange={(isOpen)=> {
        if (!isOpen) {
        setRowAction(undefined);
        }
        }}
        {...props}
        />
    </>
    );
    };