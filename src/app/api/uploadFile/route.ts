import { Readable } from "stream";
const { google } = require("googleapis");

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    throw new Error("Expected 'file' to be a file.");
  }

  const folderID = formData.get("folderID");
  const fileName = formData.get("fileName");
  const fileType = formData.get("fileType");
  const fileArrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(fileArrayBuffer);
  const fileStream = Readable.from(fileBuffer);

  let auth;
  try {
    if (!process.env.GCP_SERVICE_ACCOUNT_BASE64) {
      throw new Error("Google application credentials not set");
    }
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.GCP_SERVICE_ACCOUNT_BASE64, "base64").toString(),
    );
    auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
    console.log("Auth initialized successfully");
  } catch (error) {
    throw new Error("Error initializing auth: " + error);
  }

  const driveService = google.drive({
    version: "v3",
    auth: auth,
  });

  const fileMetadata = {
    name: fileName,
    parents: [folderID],
  };
  const media = {
    mimeType: fileType,
    body: fileStream,
  };

  try {
    const file = await driveService.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });
    console.log(`File uploaded successfully, File ID: ${file.data.id}`);
    return new Response(
      JSON.stringify({
        message: "File uploaded successfully",
        fileID: file.data.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    return new Response("Failed to upload file to Google Drive: " + error, {
      status: 500,
    });
  }
}
