"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChangeEvent, FC, Suspense, useCallback, useState } from "react";
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
import { divide } from "lodash";
import { BarChart } from "./BarChart";
import { ErrorBoundary } from "react-error-boundary";

interface CardDetailProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  className?: string;
}

export const CardDetail: FC<CardDetailProps> = ({
  name = "Building",
  className,
}) => {
  const [show, setShow] = useState<"daily" | "monthly" | "hourly">("hourly");
  const [toggle, setToggle] = useState<boolean>(true);
  const handleSelect = (value: string) => {
    setShow(value as "daily" | "monthly" | "hourly");
  };
  const handleClick = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);

  return (
    <Card className={twMerge("w-11/12", className)}>
      <CardHeader>
        <div className="text-5xl font-extrabold text-center">{name}</div>
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-center gap-x-8">
        <div className="w-32">
          <Select onValueChange={handleSelect} defaultValue="hourly" >
            <SelectTrigger id="time">
              <SelectValue placeholder="Time" />
            </SelectTrigger>
            <SelectContent position="popper" >
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              {/* <SelectItem value="monthly">Monthly</SelectItem> */}
            </SelectContent>
          </Select>
        </div>
        <ErrorBoundary fallback={<div>some thing wrong</div>}>
          <Suspense fallback="loading">
            {toggle ? (
              <LineChart className="w-[800px]" show={show} buildingId={name} />
            ) : (
              <BarChart className="w-[800px]" show={show} buildingId={name} />
            )}
        </Suspense>
        </ErrorBoundary>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button size="sm" onClick={handleClick}>
          {toggle ? "LineChart" : "BarChart"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardDetail;
