import { env } from "@/Config/Env";
import { ImagesResponsive, Responsive } from "@/Interfaces/types";
import axios from "axios";

export async function uploadFile(file: File, token?: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(`${env.urlBackNest}/files`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res.data);

  const data: Responsive<ImagesResponsive> = res.data;

  return data.body.url;
}
