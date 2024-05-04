"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/app/components/ui/button"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Balnaces = {
    clientid: string
    client: string
    bill: string
    amount: string
    balance: string
}

export const columns: ColumnDef<Balnaces>[] = [
    { accessorKey: "clientid", header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    CLIENT ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },},
    { accessorKey: "client", header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    CLIENT
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },},
    { accessorKey: "bill", header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    PENDING
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },},
    { accessorKey: "amount", header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    RECEIVED
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },},
    { accessorKey: "balance", header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    BALANCE
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },},
]
