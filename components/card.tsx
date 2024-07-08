import { CardContent, Card, CardHeader, CardDescription, CardTitle } from "./ui/card";

type CardProps = {
  title: string,
  amount: number
}

const DataCard = ({title, amount}: CardProps) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle>{`${amount}`}</CardTitle>
      </CardHeader>
      <CardContent>
      </CardContent>
    </Card>
  )
}

export default DataCard;