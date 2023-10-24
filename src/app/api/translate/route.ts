import { uploadFile } from "@/lib/gcs";
import { translateDocument } from "@/lib/translatedocument";

import { NextResponse } from "next/server";
// import  from 'pdf-parse'

export async function POST(req: Request, res: Response) {
  try {
    // const url = "https://arxiv.org/pdf/2310.07778.pdf";
    // console.log(req);
    const body = await req.json();
    console.log(body);
    const { url } = body;
    console.log(url);
    const file_name = await uploadFile(url) as string;
    if (!file_name) {
      throw Error("Cannot upload file to GCS");
    }
    const translation_info = await translateDocument(file_name);

    console.log("successful translation");
    // console.log(typeof pages);
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
