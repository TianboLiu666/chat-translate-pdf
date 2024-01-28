import ChatComponent from "@/components/ChatComponent";
import React from "react";

type Props = {
  params: {
    url: string;
  };
};

const Page = ({ params: { url } }: Props) => {
  // const real_url = decodeURIComponent(url.replace(/--/g, "/"));
  let real_url
  if (/^http.*\.pdf$/i.test(url)) {
    real_url = decodeURIComponent(url.replace(/--/g, "/"));
  } else {
    real_url = "https://storage.googleapis.com/" + 'chat-translate-pdf-2' + "/tmp/" + url;
  }
  // console.log(typeof real_url);
  console.log(real_url);

  return (
    <div className="flex min-h-full overflow-scroll">
      {/* <div className="">{real_url}</div> */}

      <div className="min-h-screen p-0 oveflow-scroll flex-[5]">
        <iframe src={real_url} className="w-full h-full"></iframe>
      </div>

      <div className="min-h-screen p-4 oveflow-scroll flex-[5]">
        <ChatComponent />
      </div>
    </div>
  );
};

export default Page;
