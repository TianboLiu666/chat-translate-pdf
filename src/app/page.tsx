import FileURLUpload from "@/components/FileURLUpload";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
// import axios from "axios";

export default async function Home() {
  return (
    <div className="w-screen min-h-screen bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900">
      <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-end">
            <h1 className="mr-3 text-5xl font-semibold">Chat With any PDF</h1>
          </div>

          <div className="flex mt-3">
            <Button>Go to chats</Button>
          </div>

          <FileURLUpload />
          <FileUpload />
        </div>
      </div>
      {/* <Button>click</Button> */}
    </div>
  );
}
