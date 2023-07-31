
"use client"
import React, { useMemo,FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import * as _ from "lodash";
import { month, day, hour } from "@/store/manageTime";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { useAtom } from "jotai";
import { Prediction } from "./models/predictions";
import useSWR from "swr";
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: "Predicted",
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          let label = context.dataset.label || "";

          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            if(context.dataset.label==="Peak Power"){
            label +=
              new Intl.NumberFormat("en-US").format(context.parsed.y) + " kw";
            }else{
              label +=
              new Intl.NumberFormat("en-US").format(context.parsed.y) + " kwh";
            }
          }
          return label;
        },
      },
    },
  },
};
interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  show?: "daily" | "monthly" | "hourly";
  buildingId:string;
}

export const BarChart: FC<BarChartProps> = ({
  className,
  show = "hourly",
  buildingId,
}) => {
  const { data } = useSWR(`building/${buildingId}/${show}`);
  const [m] = useAtom(month);
  const [d] = useAtom(day);
  const [h] = useAtom(hour);
  const dataset = useMemo(() => {
    let lebels = [];
    if (show === "daily") {
      lebels = d;
    } else if (show === "monthly") {
      lebels = m;
    } else {
      lebels = h;
    }
    return {
      labels: lebels,
      datasets: [
        {
          label: "Peak Power",
          data:data?.map((d:Prediction)=>d.peakPower) ,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Energy",
          data: data?.map((d:Prediction)=>d.peakPower),
          borderColor: "rgb(153, 255, 204)",
          backgroundColor: "rgba(153, 255, 204, 0.5)"
        },
      ],
    };
  }, [show, m, d, h,data]);
  return (
    <div className={className}>
      <Bar options={options} data={dataset} />
    </div>
  );
};
