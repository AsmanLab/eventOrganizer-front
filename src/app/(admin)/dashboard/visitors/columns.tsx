"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TParticipantDetails } from "shared/types/participant";
import UDialog from "@/components/u-credenza";
import VisitorDetails from "@/components/visitors/VisitorDetails";

export const columns: ColumnDef<TParticipantDetails>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    id: "fullName",
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
    accessorKey: "phone_number",
    header: "Телефон",
  },
  {
    accessorKey: "email",
    header: "Электронная почта",
  },
  {
    id: "location",
    header: "Местоположение",
    cell: ({ row }) => (
      <span>
        {row.original.country}, {row.original.city}
      </span>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="">
          <UDialog
            title="Посетитель"
            triggerElement={
              <Button variant="ghost" className="h-8 w-8 p-0 text-main-blue">
                <span className="sr-only">View</span>
                <Eye />
              </Button>
            }
          >
            <VisitorDetails visitor={row.original} />
          </UDialog>
        </div>
      );
    },
  },
];
