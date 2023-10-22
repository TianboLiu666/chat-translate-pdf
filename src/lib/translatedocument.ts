const projectId = "play-with-pdf";
const location = "global";
const inputUri = "gs://translate-pdf-1/wavenet.pdf";

// Imports the Google Cloud Translation library
const { TranslationServiceClient } = require("@google-cloud/translate").v3beta1;

// Instantiates a client
const translationClient = new TranslationServiceClient();

const documentInputConfig = {
  gcsSource: {
    inputUri: inputUri,
  },
};

export async function translateDocument() {
  // Construct request
  const request = {
    parent: translationClient.locationPath(projectId, location),
    documentInputConfig: documentInputConfig,
    sourceLanguageCode: "en-US",
    targetLanguageCode: "zh",
  };

  // Run request
  const [response] = await translationClient.translateDocument(request);

  console.log(`Response: Mime Type - ${response.documentTranslation.mimeType}`);
}

translateDocument();
