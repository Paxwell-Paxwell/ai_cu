import { BatteryCharging, Home } from "lucide-react";
import { FC } from "react";
import Link from "next/link";

const Navbar: FC = () => {
  return (
    <div className="sticky top-0 z-40 w-full bg-white">
      <div className="flex p-3 border-slate-10 border">
        <div className="me-2 flex justify-center items-center ">
          <BatteryCharging className="text-pink-500 inline-block" size={60} />
        </div>
        <div className="text-3xl font-bold flex justify-center items-center ">
          <span>AI@CU: Power prediction</span>
        </div>
        <div className="flex-grow" />
        <div className="flex justify-center items-center me-4">
          <Link href="/">
            <Home className="text-gray-800 cursor-pointer" size={30} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
