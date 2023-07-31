"use client";
import getData from "@/lib/getdata";
import { FC } from "react";
import { Fetcher, SWRConfig } from "swr";
import { unstable_serialize } from 'swr'
import dynamic from "next/dynamic";

interface SWRProviderProps {
  children: React.ReactNode;
}



export const fetcher: Fetcher<unknown, string> = (url) => getData(url);
export const SWRProvider: FC<SWRProviderProps> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        suspense: true,
        fallbackData:[],
      }}
    >
      {children}
    </SWRConfig>
  );
};

