import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate, getImageURL, truncateText } from "../lib/utils";
import { TFestival } from "shared/types/festivals";
import { Clock } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const FestivalCard = ({ festival }: { festival: TFestival }) => {
  const headerStyle = {
    backgroundImage: `url("${getImageURL(festival.image)}")`,
  };

  return (
    <Card className="rounded-3xl w-full shadow-none min-w-60 border-none hover:shadow-custom transition-shadow">
      <CardHeader className="flex flex-row justify-between p-3">
        <div
          className="bg-admin-primary/10 w-full h-40 rounded-xl bg-cover bg-center"
          style={headerStyle}
        ></div>
      </CardHeader>
      <CardContent>
        <div>
          <CardTitle className="text-xl font-medium">
            {festival.title}
          </CardTitle>
          <CardDescription className="text-gray-500 mt-2 flex gap-1 items-center">
            <Clock size={16} />
            {formatDate(festival.start_date)}
          </CardDescription>
        </div>
        <p className="text-gray-600 mt-2.5 text-sm">
          {truncateText(festival.short_description || "", 100)}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link href={`festivals/${festival.id}`}>
          <Button
            variant={"outline"}
            size={"lg"}
            className="border-admin-primary text-admin-primary hover:bg-admin-primary/5 hover:text-admin-primary"
          >
            Детали
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FestivalCard;
