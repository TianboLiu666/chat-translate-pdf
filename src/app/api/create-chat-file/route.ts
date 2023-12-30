import { uploadDropzoneFile } from "@/lib/gcs";
import { loadGCStoPinecone } from "@/lib/urldownload";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // const url = "https://arxiv.org/pdf/2310.07778.pdf";
    console.log('req type' + typeof req);

    // const body = await req.json();
    const data = await req.formData();
    const file = data.get("file") as File;
    // console.log(body);
    // const { arraybuffer } = body;
    // console.log(arraybuffer);
    // console.log(typeof arraybuffer);
    await loadGCStoPinecone(file);
    // console.log(typeof pages);
    const filename = await uploadDropzoneFile(file);
    console.log("filename is " + filename);
    return NextResponse.json({ filename: filename });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
