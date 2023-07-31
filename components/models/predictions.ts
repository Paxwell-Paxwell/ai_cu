export interface Prediction {
  building_id: string,
  date: number,
  frequency :"hourly"|"daily";
  energy: number,
  peakPower: number,
}