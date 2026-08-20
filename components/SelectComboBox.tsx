"use client";

import { useId, useState } from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { SelectElementType } from "@/types/selectElements";

interface Props{
  elementList : SelectElementType[]
  placeHolder : string
  commandPlaceholder : string
  value?: string;
  onChange?: (value: string) => void
}

export default function SelectComboBox({elementList, placeHolder, commandPlaceholder, value, onChange} : Props) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="w-full max-w-xs">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              id={id}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-2 cursor-pointer"
            >
              {value ? (
                <span className="flex min-w-0 items-center gap-2">
                  {(() => {
                    const selectedItem = elementList.find(
                      (item) => item.value === value,
                    );

                    if (selectedItem) {
                      const Icon = selectedItem.icon;
                      const color = selectedItem.color ? selectedItem.color : '#2453D4' 

                      return <Icon className="text-primary-col size-4" color={color}/>;
                    }

                    return null;
                  })()}
                  <span className="truncate">
                    {
                      elementList.find((item) => item.value === value)
                        ?.label
                    }
                  </span>
                </span>
              ) : (
                <span className="text-muted-foreground">
                  {placeHolder}
                </span>
              )}
              <ChevronsUpDownIcon
                className="text-muted-foreground/80 shrink-0 size-4"
                aria-hidden="true"
              />
            </Button>
          }
        />
        <PopoverContent className="border-input w-full p-0" align="start" initialFocus={false}>
          {open && (
            <Command>
              <CommandInput placeholder={commandPlaceholder} />
              <CommandList>
                <CommandEmpty>No tool found.</CommandEmpty>
                <CommandGroup>
                  {elementList.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) => {
                        
                        if (onChange) {
                          onChange(currentValue === value ? "" : currentValue)
                        }

                        setOpen(false);
                      }}
                      className="[&>svg:last-of-type]:hidden"
                    >
                      <div className="flex grow items-center gap-2">
                        <item.icon className="text-muted-foreground size-4" color={item.color}/>
                        {item.label}
                      </div>
                      {value === item.value && (
                        <CheckIcon
                          className="ml-auto size-4"
                          aria-hidden="true"
                        />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};
