import { Select, SelectContent } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon } from 'lucide-react';
import React from 'react';
import { HiChevronDown } from 'react-icons/hi';

interface IDataCategorySelect {
  label: string
  value: string
  color?: string
}

interface CategorySelectProps {
  value?: IDataCategorySelect
  onChange: (value: string) => void
  datas: IDataCategorySelect[]
  placeholder?: string
  classNameTrigger?: string
  emptyMessage?: string
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  value, onChange, datas, placeholder, classNameTrigger, emptyMessage
}: CategorySelectProps) => {
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
          <div className="flex items-center gap-2">
            {
              value?.color && (
                <div
                  className={cn("size-4 rounded-sm")}
                  style={{ backgroundColor: value.color }}
                />
              )
            }
            {
              value?.label ? (
                <span>{value?.label}</span>
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )
            }
          </div>
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
                  "hover:bg-gray-50 cursor-pointer text-sm text-gray-700 px-2"
                )}
              >
                <div className="flex items-center flex-1">
                  <div className="flex items-center gap-2">
                    {
                      option.color && (
                        <div
                          className={cn("size-4 rounded-sm")}
                          style={{ backgroundColor: option.color }}
                        />
                      )
                    }
                    <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  </div>
                </div>
                <SelectPrimitive.ItemIndicator>
                  <CheckIcon className={cn("size-[18px] text-primary")} />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))
        }
      </SelectContent>
    </Select>
  )
}

export default CategorySelect