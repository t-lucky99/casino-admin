"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Game } from "@prisma/client";


export const columns: ColumnDef<Game>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "typeName",
      header: "Game Type",
    },
    {
      accessorKey: "providerName",
      header: "Provider",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const game = row.original;
  
        return (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => console.log("gameId:::", game.id)}>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>          
        )
      }
    }

];