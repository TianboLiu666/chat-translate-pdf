import { Storage } from "@google-cloud/storage";

const credential = JSON.parse(
  Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS!, "base64").toString()
);

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

  
export async function uploadDropzoneFile(file: File) {
    try {
      const temp_file_name = `/uploads/${file.name.replace(" ", "-")}`;
      const options = {
        destination: temp_file_name.slice(1),
        MimeType: "application/pdf",
      };
      await storage.bucket(bucketName).upload(temp_file_name, options);
      console.log(`${temp_file_name} uploaded to ${bucketName}`);
      // await storage.bucket(bucketName).file(destFileName).createWriteStream()// .upload(file: File);
      // console.log(`${destFileName} uploaded to ${bucketName}`);
  
      return temp_file_name.slice(1);
    } catch (error) {
      console.log(error);
      return null;
    }
  }