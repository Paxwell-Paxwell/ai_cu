"use client";
import CardEachBuilding from "@/components/CardEachBuilding";
import {motion} from "framer-motion"




export default function Home() {
  return (
    <main>
      <div className="w-full flex justify-center items-center mt-6">
        <motion.div 
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{duration:0.75}}
        className="w-11/12  flex flex-wrap gap-5 justify-center">
          <CardEachBuilding name="Building 1" />
          <CardEachBuilding name="Building 2" />
          <CardEachBuilding name="Building 3" />
          <CardEachBuilding name="Building 4" />
          <CardEachBuilding name="Building 5" />
          <CardEachBuilding name="Building 6" />
        </motion.div>
      </div>
    </main>
  );
}
