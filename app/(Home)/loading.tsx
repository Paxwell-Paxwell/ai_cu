import { Skeleton } from "@/components/ui/skeleton"
import { FC } from "react"

 const Loading: FC = () => {
  return (
    <main>
      <div className="w-full flex justify-center items-center mt-6">
        <div className="w-11/12  flex flex-wrap gap-5 justify-center">
          {
            Array(6).fill(0).map((_,i)=>(
              <Skeleton key={i} className="h-[600px] w-[800px]" />
            ))
          }
        </div>
      </div>
    </main>
    
    
  )
}

export default Loading


