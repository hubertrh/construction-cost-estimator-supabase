"use server";

const { google } = require("googleapis");

export async function createGoogleDriveFolder(folderName: string) {
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

  if (!process.env.GCP_DRIVE_FOLDER_ID) {
    throw new Error("Google Drive folder ID not set");
  }

  const fileMetadata = {
    name: folderName,
    parents: [process.env.GCP_DRIVE_FOLDER_ID],
    mimeType: "application/vnd.google-apps.folder",
  };

  try {
    const file = await driveService.files.create({
      resource: fileMetadata,
      fields: "id",
    });
    console.log("Folder Id:", file.data.id);
    return file.data.id;
  } catch (error) {
    throw new Error("Error creating folder: " + error);
  }
}
