"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building } from "lucide-react";
import { ChangeEvent, FC, Suspense, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LineChart } from "@/components/LineChart";
import Link from "next/link";
import { ErrorBoundary } from "react-error-boundary";
import { divide } from "lodash";
interface CardEachBuildingProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  className?: string;
}
import { Skeleton } from "./ui/skeleton";
const CardEachBuilding: FC<CardEachBuildingProps> = ({
  name = "Building",
  className,
}) => {
  const [show, setShow] = useState<"daily" | "monthly" | "hourly">("hourly");
  const handleSelect = (value: string) => {
    setShow(value as "daily" | "monthly" | "hourly");
  };

  return (
    <Card className={twMerge("w-[800px]", className)}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-32">
          <label htmlFor="time">Frequency</label>
          <Select onValueChange={handleSelect} defaultValue="hourly">
            <SelectTrigger id="time">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>

              {/* <SelectItem value="month">Montly</SelectItem> */}
            </SelectContent>
          </Select>
        </div>
        <ErrorBoundary fallback={<div>something went wrong</div>}>
          <Suspense fallback={<Skeleton className="w-[700px] h-[300px] mt-3"/>}>
            <LineChart className="w-[700px]" show={show} buildingId={name} />
          </Suspense>
        </ErrorBoundary>
      </CardContent>
      <CardFooter>
        <Link href={`building/${name.replace(" ", "_")}`}>
          <Button size="sm">ViewMore</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardEachBuilding;
