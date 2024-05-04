"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/app/components/ui/button"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Balnaces = {
    id: string
    name: string
    shop: string
    mobile: string
    status: string
}

export const columns: ColumnDef<Balnaces>[] = [
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
    { accessorKey: "name", header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    NAME
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },},
    { accessorKey: "shop", header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    SHOP
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },},
    { accessorKey: "mobile", header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    MOBILE
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },},
    { accessorKey: "status", header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    STATUS
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },},
]
