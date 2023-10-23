// import axios from "axios";

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const fs = require("fs");
import { createReadStream, createWriteStream } from "fs";
// The ID of your GCS bucket
// const bucketName = "translate-pdf-1";

// const url = "https://arxiv.org/pdf/2310.09313.pdf";

// The contents that you want to upload
// const contents = JSON.parse({ try: "try", test: "test" });

// The new ID for your GCS file

// Imports the Google Cloud Node.js client library
// const { Storage } = require("@google-cloud/storage");
import { Storage } from "@google-cloud/storage";
import fs from "fs";
// import { GoogleAuth } from "google-auth-library";

const credential = JSON.parse(
  Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS!, "base64").toString()
);

// const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS!);
// const auth = new GoogleAuth({ credentials });

// Creates a client

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

export async function uploadFile(url: string) {
  try {
    
  console.log("entering downloading(fetch)");
  const response = await fetch(url);
  const blob = await response.blob();
  const arraybuffer = await blob.arrayBuffer();
  const data = Buffer.from(arraybuffer);
  //   readFile(url, (error, data) => {
  //     if (error) throw error;
  //     console.log(data);
  //   });
  const temp_file_name = `${Date.now().toString()}.pdf`;
  fs.writeFileSync(temp_file_name, data);
  console.log("finish write temp file: " + temp_file_name);

  const storage = new Storage({
    projectId: credential.project_id,
    // important
    credentials: {
      client_email: credential.client_email,
      private_key: credential.private_key,
    },
  });
  // const {createReadStream} = file
  const bucketName = "chat-translate-pdf";

  const options = {
    destination: temp_file_name,
    MimeType: "application/pdf",

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
  await storage.bucket(bucketName).upload(temp_file_name, options);
  console.log(`${temp_file_name} uploaded to ${bucketName}`);
  // await storage.bucket(bucketName).file(destFileName).createWriteStream()// .upload(file: File);
  // console.log(`${destFileName} uploaded to ${bucketName}`);

  return temp_file_name;
} catch (error) {
    console.log(error)
    return null
}
}
//// -------------------------  //// -------------------------
// uploadFile().catch(console.error);

// "@google-cloud/storage": "^6.12.0",
// "@google-cloud/translate": "^8.0.2",
