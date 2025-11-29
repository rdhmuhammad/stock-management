import { Select, SelectContent } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon } from 'lucide-react';
import React from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { IoIosRadioButtonOff } from 'react-icons/io';
import { RiRadioButtonFill } from 'react-icons/ri';

export interface IDataCustomSelect {
  label: string
  value: string
}

interface CustomSelectProps {
  value?: IDataCustomSelect
  onChange: (value: string) => void
  datas: IDataCustomSelect[]
  placeholder?: string
  icon?: React.ReactNode
  style?: "radio" | "checkbox"
  classNameTrigger?: string
  emptyMessage?: string
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, datas, placeholder, icon, style = "radio", classNameTrigger, emptyMessage }: CustomSelectProps) => {
  return (
    <Select value={value?.value ?? ""} onValueChange={onChange}>
      <SelectPrimitive.Trigger
        data-slot="select-trigger"
        className={cn(
          "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-end gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          "max-w-[152px] bg-white rounded-[8px] border-gray-200 cursor-pointer",
          classNameTrigger
        )}
      >
        <div className="flex items-center justify-between w-full flex-1 gap-2 text-gray-800">
          {icon}
          {
            value?.label ? (
              <span>{value?.label}</span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )
          }
          <SelectPrimitive.Icon asChild>
            <HiChevronDown className="text-gray-800 size-4" />
          </SelectPrimitive.Icon>
        </div>
      </SelectPrimitive.Trigger>

      <SelectContent>
        {
          datas.length === 0 ? (
            <div className="flex items-center justify-center py-2">
              <p className="text-sm">{emptyMessage ?? "No Data"}</p>
            </div>
          ) :
            datas.map((option, idx) => (
              <SelectPrimitive.Item
                key={idx}
                value={option.value}
                className={cn(
                  "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
                  "hover:bg-gray-50 cursor-pointer"
                )}
              >
                <div className="flex items-center gap-2 group">
                  {
                    style === "radio" ? (
                      value?.value === option.value ? (
                        <RiRadioButtonFill
                          className={`h-4 w-4 text-primary`}
                        />
                      ) : (
                        <IoIosRadioButtonOff className={`h-4 w-4 text-gray-300`} />
                      )
                    ) : (
                      <div
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-gray-300",
                          value?.value === option.value ? "bg-emerald-800 text-white" : "bg-white text-transparent"
                        )}
                      >
                        {value?.value === option.value && <CheckIcon className="!h-3 !w-3 text-white" />}
                      </div>
                    )
                  }
                  <span>{option.label}</span>
                </div>
              </SelectPrimitive.Item>
            ))
        }
      </SelectContent>
    </Select>
  )
}

export default CustomSelect