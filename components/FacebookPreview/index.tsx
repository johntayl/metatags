import { MetaTags } from "../../types/meta";

type FacebookPreviewProps = {
  metaTags: MetaTags;
};

export default function FacebookPreview({ metaTags }: FacebookPreviewProps) {
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
              backgroundImage: `url('${metaTags.og_image}')`
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
}
