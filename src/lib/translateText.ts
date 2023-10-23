// import axios from "axios";
// import { PDFLoader } from "langchain/document_loaders/fs/pdf";

// const fs = require("fs");
// // import fs from "fs";
// const projectId = "play-with-pdf";
// // const location = "global";
// const text =
//   "Efficient calculation of the self magnetic field, self-force, and self-inductance for electromagnetic coils";

// // Imports the Google Cloud Translation library
// const { TranslationServiceClient } = require("@google-cloud/translate");

// // Instantiates a client
// const translationClient = new TranslationServiceClient();

// const url = "https://arxiv.org/pdf/2310.09313.pdf";

// type PDFPage = {
//   pageContent: string;
//   metadata: {
//     loc: { pageNumber: Number };
//   };
// };

// export async function translateText() {
//   console.log("entering downloading(fetch)");
//   const response = await axios.get(url);
//   const blob = new Blob([response.data]);
//   // const blob = await response.blob();
//   const arraybuffer = await blob.arrayBuffer();
//   const data = Buffer.from(arraybuffer);

//   const temp_file_name = `/tmp/${Date.now().toString()}.pdf`;
//   fs.writeFileSync(temp_file_name, data);
//   console.log("finish write temp file: " + temp_file_name);
//   console.log(fs.readFileSync(temp_file_name, "utf8"));
//   // const loader = new PDFLoader(temp_file_name);
//   // const pages = (await loader.load()) as PDFPage[];

//   // // fs.writeFileSync("programming.txt", data);
//   // console.log("File written successfully\n");
//   // console.log("The written has the following contents:");
//   // console.log(pages);
//   // return typeof pages;
//   // console.log(fs.readFileSync("programming.txt", "utf8"));

//   //   console.log(data.toString());
//   //   console.log(typeof temp_file_name);
//   //   // Construct request
//   //   const request = {
//   //     parent: `projects/${projectId}/locations/${location}`,
//   //     contents: [text],
//   //     mimeType: "text/plain", // mime types: text/plain, text/html
//   //     sourceLanguageCode: "en",
//   //     targetLanguageCode: "zh",
//   //   };

//   //   // Run request
//   //   const [response] = await translationClient.translateText(request);

//   //   for (const translation of response.translations) {
//   //     console.log(`Translation: ${translation.translatedText}`);
//   //   }
// }
