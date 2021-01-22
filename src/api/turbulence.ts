// http://192.168.10.38:9000/turbulence
import request from "./request";

export interface ParamsType {
  air: number;
  hgt: number;
  omega: number;
  uwnd: number;
  vwnd: number;
}
export interface ResultType {
  code: number;
  prob: number;
  flag: string;
}
export function turbulence({ air, hgt, omega, uwnd, vwnd }: ParamsType) {
  const formData = new FormData();
  formData.set("air", String(air));
  formData.set("hgt", String(hgt));
  formData.set("omega", String(omega));
  formData.set("uwnd", String(uwnd));
  formData.set("vwnd", String(vwnd));
  return request({
    method: "post",
    url: "/turbulence",
    data: formData
  });
}
