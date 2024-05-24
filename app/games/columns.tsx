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
];