import aiCu from "./configAxios/baseUrl"
import { Prediction } from "@/components/models/predictions"
export const getData = async (url:string):Promise<Prediction[]> => {
  try {
    const res = await aiCu.get(url)
    // console.log(res.data)
    res.data.data.forEach((d:Prediction)=>{
      d.peakPower = Number((d.peakPower/1000).toFixed(2))
      d.energy = Number((d.energy/1000).toFixed(2))
    })
    return res.data.data
  }
  catch (err) {
    console.log(err)
    return []
  }
}

export default getData