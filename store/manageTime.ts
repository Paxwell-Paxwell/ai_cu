import { atom, useAtom } from 'jotai';
const labels = ["January", "February", "March", "April", "May", "June",
 "July","August","September","October","November","December"];

export const  month = atom<string[]>(labels);
export const  day = atom<string[]>(Array(30).fill(0).map((items,index) => (index).toString()));
export const hour = atom<string[]>(Array(24).fill(0).map((items,index) => (index).toString()));