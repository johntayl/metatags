import { MetaTags } from "../../types/meta";

type TwitterPreviewProps = {
  metaTags: MetaTags;
};

export default function TwitterPreview({ metaTags }: TwitterPreviewProps) {
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
}
