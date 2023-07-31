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
        className="w-11/12  flex flex-wrap gap-5 justify-center items-center">
          <CardEachBuilding name="cham4" />
          <CardEachBuilding name="cham9" />
          <CardEachBuilding name="chul" />
          <CardEachBuilding name="sport" />
          <CardEachBuilding name="witya" />
        </motion.div>
      </div>
    </main>
  );
}
