// import axios from "axios";

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const fs = require("fs");
import {createReadStream, createWriteStream} from "fs";
// The ID of your GCS bucket
const bucketName = "translate-pdf-1";

// const url = "https://arxiv.org/pdf/2310.09313.pdf";

// The contents that you want to upload
// const contents = JSON.parse({ try: "try", test: "test" });

// The new ID for your GCS file
const destFileName = "new-file-name";

// Imports the Google Cloud Node.js client library
// const { Storage } = require("@google-cloud/storage");
import { Storage } from "@google-cloud/storage";

// Creates a client


// async function translateText() {
//   console.log("entering downloading(fetch)");
//   const response = await fetch(url);
//   //   const blob = new Blob([response.data]);
//   const blob = await response.blob();
//   const arraybuffer = await blob.arrayBuffer();
//   const data = Buffer.from(arraybuffer);

//   const temp_file_name = `/tmp/${Date.now().toString()}.pdf`;
//   fs.writeFileSync(temp_file_name, data);
//   console.log(typeof temp_file_name);
//   return temp_file_name;
// }

// const contents = translateText();
//// -------------------------  //// -------------------------

// export async function uploadFromMemory(file: File) {
//   const storage = new Storage();
//   const contents = file;
//   await storage.bucket(bucketName).file(destFileName).save(file);

//   console.log(
//     `${destFileName} with contents ${contents} uploaded to ${bucketName}.`
//   );
// }

//// -------------------------  //// -------------------------

// uploadFromMemory().catch(console.error);

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// The ID of your GCS bucket
// const bucketName = 'your-unique-bucket-name';

// The path to your file to upload
// const filePath = '/Users/tianboliu/Downloads/Lec4.pdf'
// // The new ID for your GCS file
// const destFileName = "filepath-try";

// // Imports the Google Cloud client library
// const { Storage } = require("@google-cloud/storage");

// // Creates a client
// const storage = new Storage();

//// -------------------------  //// -------------------------

export async function uploadFile(file: File) {
  const storage = new Storage();
  // const {createReadStream} = file
  const options = {
    destination: destFileName,
    // Blob:

    // Optional:
    // Set a generation-match precondition to avoid potential race conditions
    // and data corruptions. The request to upload is aborted if the object's
    // generation number does not match your precondition. For a destination
    // object that does not yet exist, set the ifGenerationMatch precondition to 0
    // If the destination object already exists in your bucket, set instead a
    // generation-match precondition using its generation number.
    // preconditionOpts: {ifGenerationMatch: generationMatchPrecondition},
  };
  console.log(file)
  await storage.bucket(bucketName).file(destFileName).createWriteStream()// .upload(file: File);
  console.log(`${destFileName} uploaded to ${bucketName}`);
}
//// -------------------------  //// -------------------------
// uploadFile().catch(console.error);

// "@google-cloud/storage": "^6.12.0",
// "@google-cloud/translate": "^8.0.2",
