import { Skeleton } from "@/components/ui/skeleton"
import { FC } from "react"


 const Loading: FC = () => {
  
  return (
    <main className="container flex mt-5 flex-col items-center">
      <Skeleton className="w-10/12 h-[600px]"/>
      <Skeleton className="w-10/12 h-[600px]"/>
      <Skeleton className="w-10/12 h-[600px]"/>
      <Skeleton className="w-10/12 h-[600px]"/>
    </main>
  )
}

export default Loading


