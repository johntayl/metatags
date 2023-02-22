import { MetaTags } from "../../types/meta";

type CodePreviewProps = {
  metaTags: MetaTags;
};

export default function CodePreview({ metaTags }: CodePreviewProps) {
  const code = `
  <!-- Site -->
  <title>${metaTags.title}</title>
  <meta name="description" content="${metaTags.description ?? ""}" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="${metaTags.og_title ?? ""}" />
  <meta property="og:description" content="${metaTags.og_description ?? ""}" />
  <meta property="og:image" content="${metaTags.og_image ?? ""}" />
  <meta property="og:url" content="${metaTags.og_url ?? ""}" />
  <meta property="og:site_name" content="${metaTags.og_site_name ?? ""}" />

  <!-- Twitter -->
  <meta name="twitter:title" content="${metaTags.twitter_title ?? ""}" />
  <meta name="twitter:description" content="${
    metaTags.twitter_description ?? ""
  }" />
  <meta name="twitter:image" content="${metaTags.twitter_image ?? ""}" />
  <meta name="twitter:site" content="${metaTags.twitter_site ?? ""}" />
  `;

  return (
    <div className="px-4">
      <div className="flex flex-row justify-between items-center">
        <div className="font-bold text-gray-700">HTML</div>
        <div className="flex-1 ml-4">
          <hr className="border-t-[1px] border-gray-300" />
        </div>
      </div>

      <p className="my-2 text-sm">
        Paste this code into the <code>&lt;head&gt;</code> of your website.
      </p>

      <div className="py-2"></div>

      <div className="rounded-md bg-gray-200 p-4 overflow-x-scroll w-full">
        <pre className="whitespace-pre-line text-sm">{code}</pre>
      </div>
    </div>
  );
}
