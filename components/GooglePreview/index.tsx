import { MetaTags } from "../../types/meta";

type GooglePreviewProps = {
  metaTags: MetaTags;
};

export default function GooglePreview({ metaTags }: GooglePreviewProps) {
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
}
