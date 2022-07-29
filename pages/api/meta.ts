// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { load } from "cheerio";
import { MetaTags } from "../../types/meta";

type Query = {
  url: string;
};

type Error = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MetaTags | Error>
) {
  let { url } = req.query as Query;

  if (!url) {
    return res.status(400).json({ error: "url is required" });
  }

  if (!url.startsWith("http") || !url.startsWith("https")) {
    url = `http://${url}`;
  }

  const resp = await axios.get(url);

  const $ = load(resp.data);

  const metaTags: MetaTags = {
    title: $("title").text(),
    description: $("meta[name='description']").attr("content") || "",
    image: $("meta[property='og:image']").attr("content") || "",
    url: $("meta[property='og:url']").attr("content") || "",
    site_name: $("meta[property='og:site_name']").attr("content") || "",
    twitter_title: $("meta[property='twitter:title']").attr("content") || "",
    twitter_description:
      $("meta[property='twitter:description']").attr("content") || "",
    twitter_image: $("meta[property='twitter:image']").attr("content") || "",
    twitter_card: $("meta[property='twitter:card']").attr("content") || "",
    twitter_site: $("meta[property='twitter:site']").attr("content") || "",
    twitter_creator:
      $("meta[property='twitter:creator']").attr("content") || "",
    og_type: $("meta[property='og:type']").attr("content") || "",
    og_title: $("meta[property='og:title']").attr("content") || "",
    og_description: $("meta[property='og:description']").attr("content") || "",
    og_image: $("meta[property='og:image']").attr("content") || "",
    og_url: $("meta[property='og:url']").attr("content") || "",
    og_site_name: $("meta[property='og:site_name']").attr("content") || ""
  };

  return res.json(metaTags);
}
