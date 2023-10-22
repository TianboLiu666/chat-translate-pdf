"use client";
import axios from "axios";
import React from "react";
import { Button } from "./ui/button";
// import fs from "fs";
// import { downloadFromURL } from "@/lib/urldownload";
// import { setDefaultResultOrder } from "dns";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
// import { uploadFile } from "@/lib/gcs";

type Props = {};

// let url = "https://arxiv.org/pdf/2310.07778.pdf";

const FileURLUpload = (props: Props) => {
  const router = useRouter();
  const [url, SetUrl] = React.useState("");
  const { mutate, isLoading } = useMutation({
    mutationFn: async (url: string) => {
      const response = await axios.post("/api/create-chat-url", { url });
      console.log(response.data.length);
      console.log(response.data);
      return response.data;
    },
  });
  const handleChange = async (e: any) => {
    SetUrl(e.target.value);
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(url);

    const regex = /^http.*\.pdf$/i;
    try {
      if (!regex.test(url)) {
        alert("url format is not in pdf");
        return;
      }
      mutate(url, {
        onSuccess: ({ length }: { length: number }) => {
          console.log("on Success:" + length);
          //   const new_url = url.replace(/[^a-zA-Z0-9]/g, "");
          const new_url = url.replace(/\//g, "--");
          toast.success("success:" + length);
          router.push(`/chat/${new_url}`);
        },
        onError: (err) => {
          toast.error("Error creating chat");
          console.log(err);
        },
      });
    } catch (error) {
      console.log(error);
    }

    // const router = useRouter();
  };
  // const handleChange2 = async (files) => {
  //   const file = files[0];
  //   await uploadFromMemory(file);
  // };
  // const inputElement = document.getElementById("input").value;
  // inputElement?.addEventListener("change", handleFiles, false);
  // function handleFiles(this: any) {
  //   const fileList = this.files; /* now you can work with the file list */
  //   console.log(fileList.length)
  // }
  // const [file, setFile] = useState()

  // function handleChange2(event) {
  //   const file = event.target.files[0];
  //   console.log(file);
  //   console.log(typeof file);
  //   await axios.post("/api/translate", {file})
  //   async function upload(file) {
  //     uploadFile(file);
  //   }
  //   upload(file);
  // }



  return (

      <form className="mt-3 rounded-lg flex flex-row" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="enter your pdf url"
          className="w-full max-w-3xl rounded-md border border-input h-10 ring-offset-background px-3 mr-2 bg-slate-300/30"
          onChange={handleChange}
        />
        {/* <input type="submit"/> */}

        <Button type="submit" className="w-1/2">
          Let's go
        </Button>
      </form>
      // {/* <form onSubmit={handleSubmit2}>
      //   {/* <h1>React File Upload</h1> */}
      //   <input type="file" onChange={handleChange2} />
      //   <button type="submit">Upload</button>
      // </form> */}
  );
};

export default FileURLUpload;
