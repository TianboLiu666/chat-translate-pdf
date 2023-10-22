import { uploadFile } from "@/lib/gcs";
import { translateText } from "@/lib/translateText";
import { NextResponse } from "next/server";
import fs from 'fs'

export async function POST(req: Request) {
  try {
    console.log("entering translate");

    const body = await req.json();
    console.log(body);
    const { file } = body;
    console.log(typeof file)

    console.log(file);
    const reader = fs.createReadStream(file)
    // const { createReadStream, filename } = await file;
    // const content = "hello"
    console.log("entering api translate");
    const translate = await uploadFile(file);
    // console.log(translate);
    return NextResponse.json({ success: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
