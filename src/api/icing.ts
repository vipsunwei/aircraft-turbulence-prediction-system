import request from "./request";

export interface IcingParamsType {
  air: number;
  hgt: number;
  omega: number;
  uwnd: number;
  vwnd: number;
  rhum: number;
  shum: number;
}

export function icing({
  air,
  hgt,
  omega,
  uwnd,
  vwnd,
  rhum,
  shum
}: IcingParamsType) {
  const formData = new FormData();
  formData.set("air", String(air));
  formData.set("hgt", String(hgt));
  formData.set("omega", String(omega));
  formData.set("uwnd", String(uwnd));
  formData.set("vwnd", String(vwnd));
  formData.set("rhum", String(rhum));
  formData.set("shum", String(shum));
  return request({
    method: "post",
    url: "/icing",
    data: formData
  });
}
