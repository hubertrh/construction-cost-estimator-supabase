"use server";

const { google } = require("googleapis");

export async function createGoogleDriveFolder(
  folderName: string,
  clientEmail: string,
) {
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

  const permissions = [
    {
      type: "user",
      role: "reader",
      emailAddress: clientEmail,
    },
  ];

  try {
    const file = await driveService.files.create({
      resource: fileMetadata,
      fields: "id",
    });

    console.log(permissions[0].emailAddress);

    try {
      for (const permission of permissions) {
        await driveService.permissions.create({
          resource: permission,
          fileId: file.data.id,
          fields: "id",
        });
      }
    } catch (error) {
      throw new Error("Error setting permissions: " + error);
    }

    return file.data.id;
  } catch (error) {
    throw new Error("Error creating folder: " + error);
  }
}
