import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSub, DropdownMenuSubTrigger, 
  DropdownMenuSubContent, DropdownMenuRadioGroup, DropdownMenuRadioItem
} from "./ui/dropdown-menu"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "./ui/button"
import { FormControl } from "./ui/form"
import { cn, categories } from "@/lib/utils"
import { ChevronsUpDown } from "lucide-react"
import { useState } from "react"


const TransactionCategories = ({value, onChangeHandler}: {value: string, onChangeHandler: (val: string) => void}) => {

  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            role="combobox"
            className={cn(
              "w-[200px] justify-between",
              !value && "text-muted-foreground"
            )}
            >
              {value ? categories.find(
                (category) => category.value === value
              )?.label : 'Select a category'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
            </Button>
        </FormControl>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <div className="hidden lg:block">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              Income
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="p-0">
              <Command>
                <CommandInput
                  placeholder="Filter categories..."
                />
                <CommandList>
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {categories.filter(({type}) => type === 'income')?.map(({label, value}) => (
                      <CommandItem
                        key={value}
                        value={value}
                        onSelect={() => {
                          onChangeHandler(value)
                          setOpen(false)
                        }}
                      >
                        {label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              Expense
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="p-0">
              <Command>
                <CommandInput
                  placeholder="Filter categories..."
                />
                <CommandList>
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {categories.filter(({type}) => type === 'expense')?.map(({label, value}) => (
                      <CommandItem
                        key={value}
                        value={value}
                        onSelect={() => {
                          onChangeHandler(value)
                          setOpen(false)
                        }}
                      >
                        {label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </div>
        <div className="block lg:hidden">
          <DropdownMenuRadioGroup value={value} onValueChange={onChangeHandler}>
            {categories.map(({value, label}) => (
              <DropdownMenuRadioItem value={value}>{label}</DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TransactionCategories
