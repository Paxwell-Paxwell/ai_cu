"use client";
import CardDetail from "@/components/CardDetail";
import { motion } from "framer-motion";
import columnsPrediction, {
  PredictionEachBuilding,
} from "@/components/viewdata/columsPrediction";
import { Suspense } from "react";
import { DataTablePrediction } from "@/components/viewdata/data-table-prediction";
import {wait} from "@/lib/wait";

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

const Detail =  ({
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
      <motion.div variants={child} className="flex justify-center ">
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
