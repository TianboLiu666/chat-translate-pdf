// // import axios from "axios";
// // type Props = {
// //   contents: string[];
// //   sourceLanguageCode: string;
// //   targetLanguageCode: string;
// // };

// // export async function googleTranslate(content: string) {
// //   const contents = [content];
// //   console.log(contents);
// //   const sourceLanguageCode = "en";
// //   const targetLanguageCode = "zh";
// //   const mimeType = "text/plain";

// //   console.log("entering translateion" + content);

// //     const response = await axios.post(
// //       `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATION_API_KEY}`,
// //       // `https://translate.googleapis.com/v3beta1/parent=projects/play-with-pdf:translateText?key=${process.env.GOOGLE_TRANSLATION_API_KEY}`,
// //       { q: "hello", target: "zh" }
// //     );

// //     console.log(response);
// //     let translation = response.data.data.translations[0].translatedText;
// //     console.log(translation)
// //     return translation;
// //   }
// //   const response = await axios.post(
// //     // `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATION_API_KEY}`,
// //     // `https://translate.googleapis.com/v3beta1/parent=projects/play-with-pdf:translateText?key=${process.env.GOOGLE_TRANSLATION_API_KEY}`,
// //     `https://translate.googleapis.com/v3beta1/projects/play-with-pdf:translateText?key=${process.env.GOOGLE_TRANSLATION_API_KEY}`,
// //     {
// //       contents,
// //       sourceLanguageCode,
// //       targetLanguageCode,
// //       mimeType,
// //     }
// //   );

// //   console.log(response);
// //   return Response;

// // let url = "https://translation.googleapis.com/v3/projects/play-with-pdf:translateText";  // Modified
// // let response = await fetch(url, {
// //   method: "POST",
// //   headers: {
// //     "Authorization": "Bearer ###accessToken###",  // Modified
// //     "Content-Type": "application/json",
// //   },
// //   body: JSON.stringify({  // Modified
// //     sourceLanguageCode: "en",
// //     targetLanguageCode: "ru",
// //     contents: ["Dr. Watson, come here!"],
// //     mimeType: "text/plain",
// //   }),
// // });

// // let result = await response.json();

// // console.log(result);
// // }

// // import { TranslationServiceClient } from "@google-cloud/translate";

// // export GOOGLE_APPLICATION_CREDENTIALS="/Users/tianboliu/Downloads/play-with-pdf-0adff46ec9c4.json"

// /**
//  * TODO(developer): Uncomment these variables before running the sample.
//  */


// /**
//  * TODO(developer): Uncomment these variables before running the sample.
//  */
// const projectId = "play-with-pdf";
// const location = "global";
// const inputUri = "gs://translate-pdf-1/wavenet.pdf";

// // Imports the Google Cloud Translation library
// const { TranslationServiceClient } = require("@google-cloud/translate").v3beta1;

// // Instantiates a client
// const translationClient = new TranslationServiceClient();

// const documentInputConfig = {
//   gcsSource: {
//     inputUri: inputUri,
//   },
// };

// export async function translateDocument() {
//   // Construct request
//   const request = {
//     parent: translationClient.locationPath(projectId, location),
//     documentInputConfig: documentInputConfig,
//     sourceLanguageCode: "en-US",
//     targetLanguageCode: "sr-Latn",
//   };

//   // Run request
//   const [response] = await translationClient.translateDocument(request);

//   console.log(`Response: Mime Type - ${response.documentTranslation.mimeType}`);
// }

// translateDocument();
