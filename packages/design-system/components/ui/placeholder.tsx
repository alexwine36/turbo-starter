'use client'

import { cn } from "@repo/design-system/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { NotebookIcon } from "lucide-react"
import * as React from "react"
import Markdown from 'react-markdown'
import { Text } from "../custom/typography"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Skeleton } from "./skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table"

const placeholderVariants = cva(
    "rounded flex flex-col justify-center items-center p-2",
    {
        variants: {
            aspect: {
                "default": "aspect-[16/9]",
                "square": "aspect-square",
                "portrait": "aspect-[9/16]",
                "fill": "min-h-[100vh] flex-1 md:min-h-min"
            },
            bg: {
                "default": "bg-muted/25",
            },

        },
        defaultVariants: {
            aspect: "default",
            bg: "default"
        }
    }
)

type TableType = {
    
        columns?: number;
        columnNames?: string[];
        rows?: number;
    
}

type PlaceholderProps = {
    className?: string;
    // children?: React.ReactNode;
    title?: string;
    description?: string;
    chart?: boolean;
    notes?: string;
    table?: boolean | TableType;
} & VariantProps<typeof placeholderVariants>;

export const Placeholder: React.FC<PlaceholderProps> = ({ notes, bg, className, title, description, aspect, chart, table }) => {
    return (
        <div 
        className={cn(placeholderVariants({ aspect, bg, className }), chart || table ? "items-start" : "", notes ? "relative" : "")} >
        
            <NotesDisplay notes={notes} />
            <div className="flex flex-col ">

            <Text variant={"lead"}>{title}</Text>
            <Text variant={"muted"}>{description}</Text>

            </div>         
            {
                chart && (
            <BarChartPlaceholder />
                )
            }   
        {
            table && (
                <TablePlaceholder table={table} />
            )
        }
        </div>
    );
}

const TablePlaceholder = ({table: rawTable}: Pick<PlaceholderProps, "table">) => {
    let table: Required<TableType> = {
        columns: 3,
        rows: 4,
        columnNames: ['', '', '']
    }
    if (rawTable && typeof rawTable !== "boolean") {
        table = {
            ...table,
            ...rawTable};
        if (rawTable.columnNames) {
            table.columns = rawTable.columnNames.length;
        }
        if (table.columnNames.length !== table.columns) {
            table.columnNames = Array.from({length: table.columns}).map((_, ) => '');
        }
    }
    
    const {columns, rows, columnNames} = table;
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {
                        columnNames.map((col, index) => (
                            <TableHead key={index}>
                                {
                                    col ? (
                                        <Text variant="muted">{col}</Text>
                                    ) : (
                                        <Skeleton className="h-4 w-full"></Skeleton>
                                    )
                                }

                            </TableHead>
                        ))
                    }
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    Array.from({length: rows}).map((_, index) => (
                        <TableRow key={index}>
                            {
                                Array.from({length: columns}).map((_, index) => (
                                    <TableCell key={index}>
                                        <Skeleton className="h-4 w-full"></Skeleton>
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    ))
                }
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
    )
}

const NotesDisplay = ({notes: rawNotes}: Pick<PlaceholderProps, "notes">) => {

    if (!rawNotes) return null;

    const notes = React.useMemo(() => {
       return  rawNotes?.split('\n').map((note, index) => {
            return note.trim()
        }
        ).join('\n')
    }, [rawNotes])

    return (
        <Popover>
            <PopoverTrigger asChild>
        <div className="absolute top-0 right-0">
                {/* <button className="text-gray-100/50 bg-gray-500/50">
                    <NotebookIcon className="size-4" />
                </button> */}
                <Button size="icon" variant="ghost" >
                    <NotebookIcon className="size-4" />
                </Button>
            </div>
            </PopoverTrigger>
            <PopoverContent>
                <div className="prose  prose-base">
                <Markdown>{notes}</Markdown>
                </div>

            </PopoverContent>
        </Popover>

    )
}

const BarChartPlaceholder = () => {
    return (
        <div className="h-full p-4 flex gap-2 items-end overflow-hidden w-full">
    <Skeleton className="h-9/10 w-1/10"></Skeleton>
    <Skeleton className="h-7/10 w-1/10"></Skeleton>
    <Skeleton className="h-8/10 w-1/10"></Skeleton>
    <Skeleton className="w-1/10"></Skeleton>
    <Skeleton className="h-9/10 w-1/10"></Skeleton>
    <Skeleton className="h-7/10 w-1/10"></Skeleton>
    <Skeleton className="h-8/10 w-1/10"></Skeleton>
    <Skeleton className="w-1/10"></Skeleton>
        <Skeleton className="h-9/10 w-1/10"></Skeleton>
    <Skeleton className="h-7/10 w-1/10"></Skeleton>
    <Skeleton className="h-8/10 w-1/10"></Skeleton>
    <Skeleton className="w-1/10"></Skeleton>
        <Skeleton className="h-9/10 w-1/10"></Skeleton>
    <Skeleton className="h-7/10 w-1/10"></Skeleton>
    <Skeleton className="h-8/10 w-1/10"></Skeleton>
    <Skeleton className="w-1/10"></Skeleton>
        <Skeleton className="h-9/10 w-1/10"></Skeleton>
    <Skeleton className="h-7/10 w-1/10"></Skeleton>
    <Skeleton className="h-8/10 w-1/10"></Skeleton>
    
</div>
    )
}