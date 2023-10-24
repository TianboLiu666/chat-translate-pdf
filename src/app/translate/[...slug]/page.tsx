import React from "react";

type Props = {
  params: {
    slug: string[];
  };
};

const page = ({ params: { slug } }: Props) => {
  const [bucketName, filename] = slug;
  const file_name = decodeURIComponent(filename);
  // https://storage.googleapis.com/chat-translate-pdf/1698022609327.pdf
  const file_url =
    "https://storage.googleapis.com/" + bucketName + "/" + file_name;
  // https://storage.googleapis.com/chat-translate-pdf/tmp/translated1698122069491.pdf
  const translated_file_url =
    "https://storage.googleapis.com/" +
    bucketName +
    "/tmp/translated" +
    file_name.slice(4);
  return (
    <div className="flex min-h-full overflow-scroll">
      {/* <div className="">{real_url}</div> */}

      <div className="min-h-screen p-0 oveflow-scroll flex-[5]">
        <iframe src={file_url} className="w-full h-full"></iframe>
      </div>
      <div className="min-h-screen p-0 oveflow-scroll flex-[5]">
        <iframe src={translated_file_url} className="w-full h-full"></iframe>
      </div>
    </div>
  );
};

export default page;
