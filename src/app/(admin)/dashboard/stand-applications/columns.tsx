"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";
import { cn, formatDate } from "@/components/lib/utils";
import { Button } from "@/components/ui/button";
import UDialog from "@/components/u-credenza";
import StandApplicationDetails from "@/components/event-layouts/StandApplicationDetail";
import { TStandApplication } from "shared/types/types";
import { useConfirmStandApplication } from "api/stands/queries";
import DeleteStandApplicationBtn from "@/components/stand-application/delete-stand-application-btn";
import ConfirmDialog from "@/components/confirm-dialog";

export const columns: ColumnDef<TStandApplication>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    id: "fio",
    header: "ФИО",
    cell: ({ row }) => {
      const { first_name, middle_name, last_name } = row.original;
      return (
        <span className="font-medium">
          {first_name} {middle_name ? middle_name + " " : ""}
          {last_name}
        </span>
      );
    },
  },
  {
    accessorKey: "project_name",
    header: "Проект",
  },
  {
    accessorKey: "stand",
    header: "Стенд",
  },
  {
    accessorKey: "created_at",
    header: "Дата подачи",
    cell: ({ row }) => (
      <span className="font-medium">
        {formatDate(row.original.created_at, "ru-RU", true)}
      </span>
    ),
  },
  {
    accessorKey: "is_confirmed",
    header: "Статус заявки",
    cell: ({ row }) => {
      const isConfirmed = row.original.is_confirmed;
      const confirmStandApplicationMutation = useConfirmStandApplication();
      const handleDelete = () => {
        confirmStandApplicationMutation.mutate(row.original.id);
      };
      return (
        <div className="flex items-center gap-2">
          <ConfirmDialog
            title="Вы уверены?"
            description="Это действие невозможно отменить. Вы уверены, что хотите продолжить?"
            confirmText="Подвердить"
            cancelText="Отмена"
            onConfirm={() => handleDelete()}
            triggerElement={
              <Button
                size={"sm"}
                variant={"ghost"}
                className={cn(
                  isConfirmed
                    ? "bg-green-200 text-green-800 hover:bg-green-200 hover:text-green-800"
                    : "bg-yellow-100 text-yellow-600 hover:bg-yellow-100 hover:text-yellow-600"
                )}
                disabled={
                  isConfirmed || confirmStandApplicationMutation.isPending
                }
              >
                {isConfirmed ? "✅Подтвержден" : "На рассмотрении"}
              </Button>
            }
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex">
        <UDialog
          title="Детали заявки"
          triggerElement={
            <Button variant="ghost" className="h-8 w-8 p-0 text-main-blue">
              <span className="sr-only">View</span>
              <Eye />
            </Button>
          }
        >
          <StandApplicationDetails application={row.original} />
        </UDialog>
        <DeleteStandApplicationBtn standAppId={row.original.id}>
          <span className="sr-only">Delete</span>
          <Trash />
        </DeleteStandApplicationBtn>
      </div>
    ),
  },
];
