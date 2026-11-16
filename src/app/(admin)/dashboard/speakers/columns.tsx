"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, SquarePen, Trash } from "lucide-react";

import { cn, formatDate } from "@/components/lib/utils";
import { Button } from "@/components/ui/button";
import { TSpeaker } from "shared/types/speaker";
import { useConfirmSpeaker } from "api/speaker/queries";
import UDialog from "@/components/u-credenza";
import SpeakerDetails from "@/components/speakers/SpeakerDetails";
import Link from "next/link";
import DeleteSpeakerBtn from "@/components/speakers/delete-speaker-btn";

export const columns: ColumnDef<TSpeaker>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ФИО
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.first_name} {row.original.last_name}
      </span>
    ),
  },
  {
    accessorKey: "email",
    header: "Электронная почта",
  },
  {
    accessorKey: "topic",
    header: "Тема",
  },
  {
    accessorKey: "created_at",
    header: "Дата подачи",
    cell: ({ row }) => (
      <span className="font-medium text-nowrap">
        {formatDate(row.original.created_at, "ru-RU", true)}
      </span>
    ),
  },
  {
    accessorKey: "is_confirmed",
    header: "Статус",
    cell: ({ row }) => {
      const isConfirmed = row.original.is_confirmed;
      const confirmSpeakerMutation = useConfirmSpeaker();
      return (
        <div className="flex items-center gap-2">
          <Button
            size={"sm"}
            variant={"ghost"}
            onClick={() => confirmSpeakerMutation.mutate(row.original.id)}
            disabled={confirmSpeakerMutation.isPending} // Disable if confirmed
            className={cn(
              isConfirmed
                ? "bg-green-200 text-emerald-800 hover:bg-emerald-200 hover:text-emerald-800"
                : "bg-red-100 text-red-600 hover:bg-red-100 hover:text-red-600"
            )}
          >
            {isConfirmed ? "✅Подтвержден" : "❌Подтвердить"}
          </Button>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex">
          <UDialog
            title="Спикер"
            triggerElement={
              <Button variant="ghost" className="h-8 w-8 p-0 text-main-blue">
                <span className="sr-only">View</span>
                <Eye />
              </Button>
            }
          >
            <SpeakerDetails isAdmin={true} speaker={row.original} />
          </UDialog>
          <Link href={`speakers/${row.original.id}`}>
            <Button variant="ghost" className="h-8 w-8 p-0 text-main-blue">
              <span className="sr-only">Edit</span>
              <SquarePen />
            </Button>
          </Link>
          <DeleteSpeakerBtn speakerId={row.original.id}>
            <span className="sr-only">Delete</span>
            <Trash />
          </DeleteSpeakerBtn>
        </div>
      );
    },
  },
];
