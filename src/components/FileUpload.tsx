"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Inbox, Loader2 } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { uploadFile } from "@/lib/gcs";

const FileUpload = () => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const { mutate, isLoading } = useMutation({
    mutationFn: async (file: File) => {
      const response = await axios.post("/api/translate", {
        file,
      });
      console.log("success");
      return response.data;
    },
  });
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      console.log(file);
      console.log(typeof file);
      console.log(Object.keys(file));
      // const file_path = file.path;
      // console.log(file_path);
      if (file.size > 10 * 1024 * 1024) {
        // bigger than 10mb
        toast.error("File too large(bigger than 10mb)");
        // alert("Please upload a smaller file");
        return;
      }
      try {
        setUploading(true);
        // const data = await uploadFile(file);
        if (!file) {
          toast.error("Something went wrong");
          //   alert("something went wrong");
          return;
        }
        mutate(
          file
          // {
          // onSuccess: ({ chat_id }) => {
          //   toast.success("Chat created");
          //   console.log(`/chat/${chat_id}`);
          //   router.push(`/chat/${chat_id}`);
          // },
          // onError: (err) => {
          //   toast.error("Error creating chat");
          //   console.log(err);
          // },
          // }
        );
        //   // console.log("data", data);
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    },
  });
  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        {uploading || isLoading ? (
          <>
            <Loader2 className="h-10 w-10 text-blue-100 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">
              Spilling Tea to GPT...
            </p>
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">Drop PDF here</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
