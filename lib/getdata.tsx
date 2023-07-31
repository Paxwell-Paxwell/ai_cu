import aiCu from "./configAxios/baseUrl"
import { Prediction } from "@/components/models/predictions"
export const getData = async (url:string):Promise<Prediction[]> => {
  try {
    const res = await aiCu.get(url)
    // console.log(res.data)
    return res.data.data
  }
  catch (err) {
    console.log(err)
    return []
  }
}

export default getData