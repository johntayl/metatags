import axios from "axios";
import type { NextPage, NextPageContext } from "next";
import { useState } from "react";
import { MetaTags } from "../types/meta";

let timeout: any = null;

const fetchUrl = (url: string, baseUrl?: string) => {
  if (!baseUrl && window && window.location && window.location.host) {
    let protocol = `https://`;

    if (window.location.host.includes("localhost")) {
      protocol = `http://`;
    }

    baseUrl = `${protocol}${window.location.host}`;
  }
  return axios
    .get(`${baseUrl}/api/meta?url=${encodeURI(url)}`)
    .then((res) => res.data);
};

const GooglePreview = ({ metaTags }: { metaTags: MetaTags }) => {
  return (
    <div className="px-4">
      <div className="flex flex-row justify-between items-center">
        <div className="font-bold text-gray-700">Google</div>
        <div className="flex-1 ml-4">
          <hr className="border-t-[1px] border-gray-300" />
        </div>
      </div>

      <div className="py-2"></div>

      <div>
        <div className="text-[#1a0dab]">{metaTags.title}</div>
        <div className="text-[#006621]">{metaTags.url}</div>
        <div className="text-gray-700">{metaTags.description}</div>
      </div>
    </div>
  );
};

const FacebookPreview = ({ metaTags }: { metaTags: MetaTags }) => {
  return (
    <div className="px-4">
      <div className="flex flex-row justify-between items-center">
        <div className="font-bold text-gray-700">Facebook</div>
        <div className="flex-1 ml-4">
          <hr className="border-t-[1px] border-gray-300" />
        </div>
      </div>

      <div className="py-2"></div>

      <div className="w-[500px]">
        <div className="flex flex-col justify-start items-start border-[1px] border-gray-200">
          <div
            className="relative w-[500px] h-[261px] bg-no-repeat bg-center bg-cover"
            style={{
              backgroundImage: `url('${metaTags.og_image})`
            }}
          ></div>
          <div className="flex flex-col justify-start items-start bg-[#f2f3f5] p-2 w-full">
            <div className="uppercase text-sm text-gray-500">
              {metaTags.og_site_name}
            </div>
            <div className="font-bold">{metaTags.og_title}</div>
            <div className="text-sm">{metaTags.og_description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TwitterPreview = ({ metaTags }: { metaTags: MetaTags }) => {
  return (
    <div className="px-4">
      <div className="flex flex-row justify-between items-center">
        <div className="font-bold text-gray-700">Twitter</div>
        <div className="flex-1 ml-4">
          <hr className="border-t-[1px] border-gray-300" />
        </div>
      </div>

      <div className="py-2"></div>

      <div className="w-[500px]">
        <div className="flex flex-col justify-start items-start border-[1px] border-gray-300 rounded-md overflow-hidden">
          <div
            className="relative w-[500px] h-[261px] bg-no-repeat bg-center bg-cover"
            style={{
              backgroundImage: `url('${
                metaTags.twitter_image || metaTags.og_image
              }')`
            }}
          ></div>
          <div className="flex flex-col justify-start items-start p-2 border-t-[1px] w-full">
            <div className="uppercase text-sm font-bold">
              {metaTags.twitter_title || metaTags.title}
            </div>
            <div className="text-sm my-1">
              {metaTags.twitter_description || metaTags.description}
            </div>
            <div className="font-sm text-sm text-[#8899A6]">
              {metaTags.twitter_site || metaTags.site_name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CodePreview = ({ metaTags }: { metaTags: MetaTags }) => {
  const code = `
  <!-- Site -->
  <title>${metaTags.title}</title>
  <meta name="description" content="${metaTags.description}" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="${metaTags.og_title}" />
  <meta property="og:description" content="${metaTags.og_description}" />
  <meta property="og:image" content="${metaTags.og_image}" />
  <meta property="og:url" content="${metaTags.og_url}" />
  <meta property="og:site_name" content="${metaTags.og_site_name}" />

  <!-- Twitter -->
  <meta name="twitter:title" content="${metaTags.twitter_title}" />
  <meta name="twitter:description" content="${metaTags.twitter_description}" />
  <meta name="twitter:image" content="${metaTags.twitter_image}" />
  <meta name="twitter:site" content="${metaTags.twitter_site}" />
  `;

  return (
    <div className="px-4">
      <div className="flex flex-row justify-between items-center">
        <div className="font-bold text-gray-700">HTML</div>
        <div className="flex-1 ml-4">
          <hr className="border-t-[1px] border-gray-300" />
        </div>
      </div>

      <div className="py-2"></div>

      <div className="rounded-md bg-gray-200 p-4 overflow-hidden">
        <pre className="whitespace-pre-line">{code}</pre>
      </div>
    </div>
  );
};

const Home: NextPage<{ initialMetaTags: MetaTags | null }> = ({
  initialMetaTags
}) => {
  const [url, setUrl] = useState<string>();
  const [metaTags, setMetaTags] = useState<MetaTags | null>(initialMetaTags);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUrl(value);

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => fetchMetaData(value), 1500);
  };

  const fetchMetaData = (url: string) => {
    if (url) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("url", encodeURI(url));
      window.history.pushState("", "", `?${searchParams.toString()}`);
      fetchUrl(url).then((data) => {
        setMetaTags(data);
      });
    }
  };

  return (
    <>
      <div className="p-4">
        <input
          className="border-[1px] border-gray-300  p-2 w-full"
          type="text"
          name="url"
          placeholder="https://example.com"
          value={url}
          onChange={handleChange}
        />
      </div>

      {metaTags && (
        <>
          <GooglePreview metaTags={metaTags} />
          <div className="py-4"></div>
          <FacebookPreview metaTags={metaTags} />
          <div className="py-4"></div>
          <TwitterPreview metaTags={metaTags} />
          <div className="py-4"></div>
          <CodePreview metaTags={metaTags} />
        </>
      )}
    </>
  );
};

export default Home;

export async function getServerSideProps(context: NextPageContext) {
  const { req, query } = context;

  if (query.url) {
    const metaTags = await fetchUrl(
      decodeURIComponent(query.url as string),
      `http://${req?.headers.host}`
    );
    return {
      props: {
        initialMetaTags: metaTags
      }
    };
  }

  return {
    props: {
      initialMetaTags: null
    }
  };
}
