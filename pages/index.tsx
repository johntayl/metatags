import type { NextPage, NextPageContext } from "next";
import { ChangeEventHandler, useState } from "react";
import { useForm } from "react-hook-form";

import CodePreview from "../components/CodePreview";
import FacebookPreview from "../components/FacebookPreview";
import GooglePreview from "../components/GooglePreview";
import TwitterPreview from "../components/TwitterPreview";
import { MetaTags } from "../types/meta";
import { fetchUrl } from "../utils/fetchUrl";

const Home: NextPage<{ initialMetaTags: MetaTags | null }> = ({
  initialMetaTags
}) => {
  const [url, setUrl] = useState(initialMetaTags?.url || "");
  const [loading, setLoading] = useState(false);

  const { register, getValues, setValue, reset, watch } = useForm<MetaTags>({
    mode: "onChange",
    defaultValues: {
      title: initialMetaTags?.title || "",
      description: initialMetaTags?.description || "",
      image: initialMetaTags?.image || "",
      og_title: initialMetaTags?.og_title || "",
      og_description: initialMetaTags?.og_description || "",
      og_image: initialMetaTags?.og_image || "",
      og_site_name: initialMetaTags?.og_site_name || "",
      og_url: initialMetaTags?.url || "",
      twitter_title:
        initialMetaTags?.twitter_title || initialMetaTags?.og_title || "",
      twitter_description:
        initialMetaTags?.twitter_description ||
        initialMetaTags?.og_description ||
        "",
      twitter_image:
        initialMetaTags?.twitter_image || initialMetaTags?.og_image || "",
      twitter_site:
        initialMetaTags?.twitter_site || initialMetaTags?.og_site_name || "",
      url: initialMetaTags?.url || ""
    }
  });

  watch();

  const handlePreview = (formData: FormData) => {
    fetchMetaData(formData.url);
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setValue("og_image", reader.result as string);
        setValue("twitter_image", reader.result as string);
      };
    }
  };

  const fetchMetaData = (url: string) => {
    if (url) {
      setUrl(url);
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("url", encodeURI(url));
      window.history.pushState("", "", `?${searchParams.toString()}`);
      setLoading(true);
      fetchUrl(url).then((data) => {
        setLoading(false);
        reset({ ...data, url: url, og_image: "", twitter_image: "" });
      });
    }
  };

  return (
    <div className="flex flex-row">
      {/* left sidebar form */}
      <div className="w-[350px] border-r-[1px] border-solid border-gray-200">
        <div className="p-4">
          <p className="mb-4 text-gray-700 text-sm">
            Enter the title and description of your page and see how it will
            look on Google, Facebook and Twitter.
          </p>
          <form className="flex flex-col justify-start items-start gap-2 w-full">
            <div className="w-full">
              <label className="font-bold text-gray-700">Title</label>
              <input
                className="border-[1px] border-gray-300 p-2 w-full"
                type="text"
                {...register("title", {
                  onChange: (e) => {
                    setValue("title", e.target.value);
                    setValue("og_title", e.target.value);
                    setValue("twitter_title", e.target.value);
                  }
                })}
              />
            </div>
            <div className="w-full">
              <label className="font-bold text-gray-700">Description</label>
              <textarea
                className="border-[1px] border-gray-300 p-2 w-full"
                rows={8}
                {...register("description", {
                  onChange: (e) => {
                    setValue("description", e.target.value);
                    setValue("og_description", e.target.value);
                    setValue("twitter_description", e.target.value);
                  }
                })}
              ></textarea>
            </div>

            <div className="w-full">
              <label className="font-bold text-gray-700">Image</label>
              <input
                className="border-[1px] border-gray-300 p-2 w-full"
                type="file"
                accept="image/jpeg, image/jpg"
                onChange={handleFileChange}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="flex-1">
        <div className="p-4">
          <p className="mb-4 text-sm text-gray-700">
            Enter the URL of your page.
          </p>
          <SearchForm url={initialMetaTags?.url} onSubmit={handlePreview} />
        </div>

        {loading && (
          <div className="p-4">
            <p>Reading {url}...</p>{" "}
          </div>
        )}

        <GooglePreview metaTags={getValues()} />
        <div className="py-4"></div>
        <FacebookPreview metaTags={getValues()} />
        <div className="py-4"></div>
        <TwitterPreview metaTags={getValues()} />
        <div className="py-4"></div>
        <CodePreview metaTags={getValues()} />

        <div className="py-4"></div>
      </div>
    </div>
  );
};

type FormData = {
  url: string;
};

type SearchFormProps = {
  url?: string;
  onSubmit: (data: FormData) => void;
};

const SearchForm = ({ url, onSubmit }: SearchFormProps) => {
  const { register, handleSubmit } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      url: url || ""
    }
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-row justify-between items-start gap-2"
    >
      <input
        className="border-[1px] border-gray-300 p-2 w-full"
        type="text"
        placeholder="https://example.com"
        {...register("url", { required: true })}
      />

      <button
        type="submit"
        className="bg-blue-700 border border-blue-700 text-white px-4 py-2"
      >
        Preview
      </button>
    </form>
  );
};

export default Home;

export async function getServerSideProps(context: NextPageContext) {
  const { req, query } = context;

  if (query.url) {
    const url = decodeURIComponent(query.url as string);
    const metaTags = await fetchUrl(url, `http://${req?.headers.host}`);
    return {
      props: {
        initialMetaTags: { ...metaTags, url }
      }
    };
  }

  return {
    props: {
      initialMetaTags: null
    }
  };
}
