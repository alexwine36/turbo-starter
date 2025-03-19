import { Skeleton } from '../../ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { Text } from '../typography';
import type { BasePlaceholderProps, TableType } from './types';

export const TablePlaceholder = ({
  table: rawTable,
}: Pick<BasePlaceholderProps, 'table'>) => {
  let table: Required<TableType> = {
    columns: 3,
    rows: 4,
    columnNames: ['', '', ''],
  };
  if (rawTable && typeof rawTable !== 'boolean') {
    table = {
      ...table,
      ...rawTable,
    };
    if (rawTable.columnNames) {
      table.columns = rawTable.columnNames.length;
    }
    if (table.columnNames.length !== table.columns) {
      table.columnNames = Array.from({ length: table.columns }).map((_) => '');
    }
  }

  const { columns, rows, columnNames } = table;
  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          {columnNames.map((col, index) => (
            <TableHead key={index}>
              {col ? (
                <Text variant="muted">{col}</Text>
              ) : (
                <Skeleton className="h-4 w-full"></Skeleton>
              )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, index) => (
          <TableRow key={index}>
            {Array.from({ length: columns }).map((_, index) => (
              <TableCell key={index}>
                <Skeleton className="h-4 w-full"></Skeleton>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    // <div className={`h-full p-4 grid grid-cols-${columns} gap-2 items-end overflow-hidden w-full`}>
    //     {
    //         Array.from({length: columns}).map((_, index) => (
    //             <div key={index} className="flex flex-col gap-2">
    //                 {
    //                     Array.from({length: rows}).map((_, index) => (
    //                         <Skeleton key={index} className="h-full w-1/10"></Skeleton>
    //                     ))
    //                 }
    //             </div>
    //         ))
    //     }
    // </div>
  );
};
