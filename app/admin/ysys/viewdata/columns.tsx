"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Entries = {
    id: string
    client: string
    date: string
    desription: string
    muns: string
    kg: string
    price: string
    bill: string
    amount: string
    clientid: string
    message: string
    by: string
}

export const columns: ColumnDef<Entries>[] = [
    { accessorKey: "id", header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID
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
    { accessorKey: "date", header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    DATE
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },},
    { accessorKey: "desription", header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    DESCRIPTION
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },},
    { accessorKey: "muns", header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    MUNS
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },},
    { accessorKey: "kg", header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    KG
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },},
    { accessorKey: "price", header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    PRICE
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
                    BILL
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
                    AMOUNT
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },},
    { accessorKey: "clientid",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    CLIENT ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    { accessorKey: "message", header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    MESSAGE
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },},
    { accessorKey: "by", header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    BY
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },},
]
