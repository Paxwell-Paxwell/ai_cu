"use client";
import CardDetail from "@/components/CardDetail";
import { DataTable } from "../../../components/viewdata/data-table";
import { columns } from "@/components/viewdata/columns";
import { wait } from "@/lib/wait";
import { DateTime } from "luxon";
import { motion } from "framer-motion";

import columnsPrediction, {
  PredictionEachBuilding,
} from "@/components/viewdata/columsPrediction";
import { Suspense } from "react";
import { DataTablePrediction } from "@/components/viewdata/data-table-prediction";
import { Skeleton } from "@/components/ui/skeleton";

type Payment = {
  id: string;
  amount: number;
  status:
    | "pending"
    | "processing"
    | "success"
    | "failed"
    | "cancelled"
    | "completed";
  email: string;
};

export const payments: Payment[] = [
  {
    id: "8a2f1a3b",
    amount: 200,
    status: "pending",
    email: "example1@gmail.com",
  },
  {
    id: "f73e2b59",
    amount: 150,
    status: "processing",
    email: "example2@gmail.com",
  },
  {
    id: "8729cbfa",
    amount: 170,
    status: "completed",
    email: "example3@gmail.com",
  },
  {
    id: "f97d41fe",
    amount: 185,
    status: "cancelled",
    email: "example4@gmail.com",
  },
  {
    id: "4e12d1bc",
    amount: 300,
    status: "pending",
    email: "example5@gmail.com",
  },
  {
    id: "12cfbe9a",
    amount: 250,
    status: "processing",
    email: "example6@gmail.com",
  },
  {
    id: "c1d6f2a7",
    amount: 275,
    status: "completed",
    email: "example7@gmail.com",
  },
  {
    id: "01bc4f9e",
    amount: 220,
    status: "cancelled",
    email: "example8@gmail.com",
  },
  {
    id: "a0fda2c8",
    amount: 400,
    status: "pending",
    email: "example9@gmail.com",
  },
  {
    id: "879bd3e4",
    amount: 350,
    status: "processing",
    email: "example10@gmail.com",
  },
  {
    id: "5cd8ef61",
    amount: 375,
    status: "completed",
    email: "example11@gmail.com",
  },
  {
    id: "3a2fd18a",
    amount: 325,
    status: "cancelled",
    email: "example12@gmail.com",
  },
  {
    id: "fbc98d6f",
    amount: 500,
    status: "pending",
    email: "example13@gmail.com",
  },
  {
    id: "4b0cd2c5",
    amount: 450,
    status: "processing",
    email: "example14@gmail.com",
  },
  {
    id: "1a6f8d62",
    amount: 475,
    status: "completed",
    email: "example15@gmail.com",
  },
  {
    id: "fa20df6a",
    amount: 420,
    status: "cancelled",
    email: "example16@gmail.com",
  },
  {
    id: "aa2c8f1b",
    amount: 600,
    status: "pending",
    email: "example17@gmail.com",
  },
  {
    id: "3a9cd852",
    amount: 550,
    status: "processing",
    email: "example18@gmail.com",
  },
  {
    id: "cc8f6f2f",
    amount: 575,
    status: "completed",
    email: "example19@gmail.com",
  },
  {
    id: "ea12df89",
    amount: 520,
    status: "cancelled",
    email: "example20@gmail.com",
  },
  {
    id: "ba21cf1c",
    amount: 700,
    status: "pending",
    email: "example21@gmail.com",
  },
  {
    id: "4a8cdf83",
    amount: 650,
    status: "processing",
    email: "example22@gmail.com",
  },
  {
    id: "dc8e6f30",
    amount: 675,
    status: "completed",
    email: "example23@gmail.com",
  },
  {
    id: "ec1adf8b",
    amount: 620,
    status: "cancelled",
    email: "example24@gmail.com",
  },
  {
    id: "ba2bcf1d",
    amount: 800,
    status: "pending",
    email: "example25@gmail.com",
  },
  {
    id: "4b8cdf84",
    amount: 750,
    status: "processing",
    email: "example26@gmail.com",
  },
  {
    id: "dd8f6f31",
    amount: 775,
    status: "completed",
    email: "example27@gmail.com",
  },
  {
    id: "ed2adf8c",
    amount: 720,
    status: "cancelled",
    email: "example28@gmail.com",
  },
  {
    id: "bb3ccf1e",
    amount: 900,
    status: "pending",
    email: "example29@gmail.com",
  },
  {
    id: "4c8cdf85",
    amount: 850,
    status: "processing",
    email: "example30@gmail.com",
  },
  {
    id: "de8f6f32",
    amount: 875,
    status: "completed",
    email: "example31@gmail.com",
  },
  {
    id: "ee3adf8d",
    amount: 820,
    status: "cancelled",
    email: "example32@gmail.com",
  },
  {
    id: "bc4dcf1f",
    amount: 1000,
    status: "pending",
    email: "example33@gmail.com",
  },
  {
    id: "4d8cdf86",
    amount: 950,
    status: "processing",
    email: "example34@gmail.com",
  },
  {
    id: "df8f6f33",
    amount: 975,
    status: "completed",
    email: "example35@gmail.com",
  },
  {
    id: "ef4adf8e",
    amount: 920,
    status: "cancelled",
    email: "example36@gmail.com",
  },
  {
    id: "bd5ecf20",
    amount: 1100,
    status: "pending",
    email: "example37@gmail.com",
  },
  {
    id: "4e8cdf87",
    amount: 1050,
    status: "processing",
    email: "example38@gmail.com",
  },
  {
    id: "e08f6f34",
    amount: 1075,
    status: "completed",
    email: "example39@gmail.com",
  },
  {
    id: "ff5adf8f",
    amount: 1020,
    status: "cancelled",
    email: "example40@gmail.com",
  },
];

let parent = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
let child = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Detail = ({
  params,
}: {
  params: {
    name: string;
  };
}) => {
  return (
    <motion.main
      variants={parent}
      initial="hidden"
      animate="show"
      className="container flex mt-5 flex-col items-center"
    >
      <motion.div variants={child}>
        <CardDetail name={params.name.replace("_", " ")} className="mb-6" />
      </motion.div>
      <motion.div variants={child} className="w-10/12">
        <Suspense>
          <DataTablePrediction
            columns={columnsPrediction("hourly")}
            buildingId={params.name}
          />
        </Suspense>
      </motion.div>
      <motion.div variants={child} className="w-10/12">
        <Suspense>
          <DataTablePrediction
            columns={columnsPrediction("daily")}
            buildingId={params.name}
            frequency="daily"
          />
        </Suspense>
      </motion.div>
    </motion.main>
  );
};
export default Detail;
