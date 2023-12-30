// import axios from "axios";
import fs from "fs";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { getEmbeddings } from "./embeddings";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import md5 from "md5";

export const getPineconeClient = () => {
  return new Pinecone({
    environment: process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
};

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: Number };
  };
};

export async function downloadFromURL(url: string) {
  console.log("entering downloading(fetch)");
  const response = await fetch(url);
  const blob = await response.blob();
  const arraybuffer = await blob.arrayBuffer();
  const data = Buffer.from(arraybuffer);
  //   readFile(url, (error, data) => {
  //     if (error) throw error;
  //     console.log(data);
  //   });
  const temp_file_name = `/tmp/${Date.now().toString()}.pdf`;
  fs.writeFileSync(temp_file_name, data);
  console.log("finish write temp file: " + temp_file_name);
  const loader = new PDFLoader(temp_file_name);
  const pages = (await loader.load()) as PDFPage[];

  const documents = await Promise.all(
    pages.map((page) => prepareDocument(page))
  );

  const vectors = await Promise.all(documents.flat().map(embedDocument));

  const client = await getPineconeClient();
  const prineconeIndex = await client.index("play-with-pdf");

  console.log("Inserting vectors into pinecone");
  await prineconeIndex.upsert(vectors);
  return documents[0];
}

export async function loadGCStoPinecone(file: File) {
  // var reader = new FileReader();
  const arraybuffer = await file.arrayBuffer();
  // console.log(arraybuffer);
  // // const arraybuffer = reader.readAsArrayBuffer(file);
  const data = Buffer.from(arraybuffer);

  const temp_file_name = `/tmp/${Date.now().toString()}.pdf`;
  fs.writeFileSync(temp_file_name, data);
  console.log("finish write temp file: " + temp_file_name);

  const loader = new PDFLoader(temp_file_name);
  const pages = (await loader.load()) as PDFPage[];

  const documents = await Promise.all(
    pages.map((page) => prepareDocument(page))
  );

  const vectors = await Promise.all(documents.flat().map(embedDocument));

  const client = await getPineconeClient();
  const prineconeIndex = await client.index("play-with-pdf");

  console.log("Inserting vectors into pinecone");
  await prineconeIndex.upsert(vectors);
  return documents[0];
}

async function embedDocument(doc: Document) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord;
  } catch (error) {
    console.log("error embedding document", error);
    throw error;
  }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page: PDFPage) {
  let { pageContent, metadata } = page;
  // pageContent = pageContent.replace(/\n/g, "");
  // Replace \n followed by capitalized letter with space
  pageContent = pageContent.replace(/\n[A-Z]/g, " ");

  // Replace \n followed by small letter with empty string
  pageContent = pageContent.replace(/\n[a-z]/g, "");
  // split the docs
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs;
}
