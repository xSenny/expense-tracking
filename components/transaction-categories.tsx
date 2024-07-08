import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const TransactionCategories = ({value, onChangeHandler}: {value: string, onChangeHandler: () => void}) => {
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem  value={'Income'} className={" p-regular-14"}>
          Income
        </SelectItem>
        <SelectItem  value={'Expenses'} className={" p-regular-14"}>
          Expenses
        </SelectItem>
        <SelectItem  value={'Food'} className={" p-regular-14"}>
          Food
        </SelectItem>
        <SelectItem  value={'Transport'} className={" p-regular-14"}>
          Transport
        </SelectItem>
        <SelectItem  value={'Bills'} className={" p-regular-14"}>
          Bills
        </SelectItem>
        <SelectItem  value={'Entertainment'} className={" p-regular-14"}>
          Entertainment
        </SelectItem>
        <SelectItem  value={'Other'} className={" p-regular-14"}>
          Other
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export default TransactionCategories
