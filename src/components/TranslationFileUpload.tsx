"use client";

import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
import { Inbox, Loader2 } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  targetLanguage: string;
};

const TranslationFileUpload = ({ targetLanguage }: Props) => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch("/api/translate", {
        method: "POST",
        body: data,
      });
      console.log("success");
      //   console.log(response.json());
      const result = await response.json();
      console.log(result);
      return result;
    },
  });
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      //   console.log(acceptedFiles);
      const file = acceptedFiles[0];

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
        console.log(file.name);
        const data = new FormData();
        data.set("file", file);
        data.set("targetlanguage", targetLanguage);
        // const file_name = file.name.replace(" ", "-");
        mutate(data, {
          onSuccess: ({
            file_name,
            translated_file_name,
            bucketName,
          }: {
            file_name: string;
            translated_file_name: string;
            bucketName: string;
          }) => {
            console.log("on Success:" + file_name);
            router.push(`/translate/${bucketName}/${file_name.slice(4)}`);
          },
          onError: (err) => {
            toast.error("Error creating chat");
            console.log(err);
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    },
  });
  return (
    <div className="p-2 bg-white rounded-xl mt-3">
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

export default TranslationFileUpload;
