import React from "react";

type Props = {
  params: {
    slug: string[];
  };
};

const page = ({ params: { slug } }: Props) => {
  const [bucketName, file_name] = slug;
  // https://storage.googleapis.com/chat-translate-pdf/1698022609327.pdf
  const file_url =
    "https://storage.googleapis.com/" + bucketName + "/" + file_name;
  // https://storage.googleapis.com/chat-translate-pdf/translated1698022609327.pdf
  const translated_file_url =
    "https://storage.googleapis.com/" + bucketName + "/translated" + file_name;
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
