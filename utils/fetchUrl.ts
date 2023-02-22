import axios from "axios";
import { MetaTags } from "../types/meta";

export const fetchUrl = (url: string, baseUrl?: string) => {
  if (!baseUrl && window && window.location && window.location.host) {
    let protocol = `https://`;

    if (window.location.host.includes("localhost")) {
      protocol = `http://`;
    }

    baseUrl = `${protocol}${window.location.host}`;
  }
  return axios
    .get<MetaTags>(`${baseUrl}/api/meta?url=${encodeURI(url)}`)
    .then((res) => res.data);
};
