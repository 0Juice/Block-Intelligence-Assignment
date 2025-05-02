import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function NewsCard({title, description, pubDate}){
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
            </CardHeader>
            {description ? <CardContent>
                {description}
            </CardContent> : null}
            <CardFooter>
                {pubDate}
            </CardFooter>
        </Card>
    );
}