import { downloadFromURL } from "@/lib/urldownload";
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
    await downloadFromURL(url);
    // console.log(typeof pages);
    return NextResponse.json({ url: url });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
