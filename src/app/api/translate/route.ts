import { uploadDropzoneFile, uploadFile } from "@/lib/gcs";
import { translateDocument } from "@/lib/translatedocument";

import { NextRequest, NextResponse } from "next/server";
// import  from 'pdf-parse'

export async function POST(req: NextRequest) {
  try {
    // const url = "https://arxiv.org/pdf/2310.07778.pdf";
    // console.log(req);
    const contentType = req.headers.get("content-type");
    let file_name;
    let TL;
    if (contentType === "application/json") {
      const body = await req.json();
      console.log(body);
      const { url, targetLanguage } = body;
      console.log(url);
      file_name = (await uploadFile(url)) as string;
      TL = targetLanguage;
    } else {
      const data = await req.formData();
      const file = data.get("file") as File;
      const targetlanguage = data.get("targetlanguage") as string;
      TL = targetlanguage;
      file_name = await uploadDropzoneFile(file);
      // file_name = file.name.replace(' ','-')
    }
    if (!file_name) {
      throw Error("Cannot upload file to GCS");
    }
    const translation_info = await translateDocument(file_name, TL!);

    console.log("successful translation");

    return NextResponse.json(translation_info, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

// import { uploadFile } from "@/lib/gcs";
// import { translateText } from "@/lib/translateText";
// import { NextResponse } from "next/server";
// import fs from 'fs'

// export async function POST(req: Request) {
//   try {
//     console.log("entering translate");

//     const body = await req.json();
//     console.log(body);
//     const { file } = body;
//     console.log(fs.readFileSync(file))
//     console.log(typeof file)

//     console.log(file);
//     const reader = fs.createReadStream(file)
//     // const { createReadStream, filename } = await file;
//     // const content = "hello"
//     console.log("entering api translate");
//     const translate = await uploadFile(file);
//     // console.log(translate);
//     return NextResponse.json({ success: "success" }, { status: 200 });
//   } catch (error) {
//     console.log(error);
//   }
// }
