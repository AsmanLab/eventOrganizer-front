"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { cn } from "./lib/utils";

type Option = { label: string; value: number };

interface MultiSelectProps {
  className?: string;
  placeholder: string;
  options: Option[];
  selectedOptions: number[];
  setSelectedOptions: Dispatch<SetStateAction<number[]>>;
}

const MultiSelect = ({
  placeholder,
  options,
  selectedOptions,
  setSelectedOptions,
  className = "",
}: MultiSelectProps) => {
  const handleSelectChange = (value: number) => {
    if (!selectedOptions.includes(value)) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((v) => v !== value));
    }
  };

  const isOptionSelected = (value: number): boolean => {
    return selectedOptions.includes(value);
  };

  const selectedCount = selectedOptions.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn("w-max", className)}>
        <Button
          variant="outline"
          className="w-full flex items-center justify-between relative"
        >
          <div className="">
            {selectedCount === 0
              ? placeholder
              : `Выбрано ${selectedCount} ${
                  selectedCount === 1 ? "цель" : "целей"
                }`}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="relative w-full max-w-[80vw] sm:max-w-full"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {options.map((option, index) => (
          <DropdownMenuCheckboxItem
            key={index}
            checked={isOptionSelected(option.value)}
            onCheckedChange={() => handleSelectChange(option.value)}
            onSelect={(e) => e.preventDefault()}
            className="py-2"
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuItem
          className="py-2 justify-center font-medium text-main-red hover:bg-gray-100"
          onSelect={() => {}}
        >
          Закрыть
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiSelect;
