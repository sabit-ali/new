
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


interface Props{
    title : string,
    description :string,
    avatar :string
}

export const CardIs = ({title,description,avatar}:Props) => {
    return (
<Card className="w-full md:w-auto max-w-xs md:max-w-sm lg:max-w-md mx-auto">
  <CardHeader>
    <CardContent>
      <img
        className="w-full h-40 md:h-48 lg:h-60 object-cover"
        src={avatar}
        alt={title}
      />
    </CardContent>
    <CardTitle>{title}</CardTitle>
  </CardHeader>
  <CardFooter className="flex justify-between">
    <CardDescription>{description}</CardDescription>
  </CardFooter>
</Card>

      )
    }