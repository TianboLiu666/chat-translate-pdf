import fs from "fs";
import { Storage } from "@google-cloud/storage";

// const projectId = "play-with-pdf";
const projectId = "chat-translate-pdf";
const location = "global";

const bucketName = "chat-translate-pdf";
// Imports the Google Cloud Translation library
const { TranslationServiceClient } = require("@google-cloud/translate").v3beta1;

const credential = JSON.parse(
  Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS!, "base64").toString()
);

// Instantiates a client
const translationClient = new TranslationServiceClient({
  projectId: credential.project_id,
  // important
  credentials: {
    client_email: credential.client_email,
    private_key: credential.private_key,
  },
});
// gs://chat-translate-pdf//tmp/1698120544175.pdf

export async function translateDocument(file_name: string) {
  const inputUri =  "gs://" + bucketName + "/" + file_name;
  const documentInputConfig = {
    gcsSource: {
      inputUri: inputUri,
    },
  };
  // Construct request
  const request = {
    parent: translationClient.locationPath(projectId, location),
    documentInputConfig: documentInputConfig,
    sourceLanguageCode: "en-US",
    targetLanguageCode: "zh",
  };

  // Run request
  const [response] = await translationClient.translateDocument(request);

  const [translation] = response.documentTranslation.byteStreamOutputs;

  // console.log(response.documentTranslation); //byteStreamOutputs

  console.log(typeof response.documentTranslation);
  // console.log(response.documentTranslation.byteStreamOutputs);

  console.log(`Response: Mime Type - ${response.documentTranslation.mimeType}`);

  const translated_file_name = "/tmp/translated" + file_name.slice(4);
  fs.writeFileSync(translated_file_name, translation as Buffer);
  console.log("finish write temp file: " + translated_file_name);

  // const storage = new Storage();
  // // const {createReadStream} = file
  const storage = new Storage({
    projectId: credential.project_id,
    // important
    credentials: {
      client_email: credential.client_email,
      private_key: credential.private_key,
    },
  });

  const options = {
    destination: translated_file_name.slice(1),
    MimeType: "application/pdf",
  };
  await storage.bucket(bucketName).upload(translated_file_name, options);
  console.log(`${translated_file_name} uploaded to ${bucketName}`);

  return Promise.resolve({ file_name, translated_file_name, bucketName });
}
