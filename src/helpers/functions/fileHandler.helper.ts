import { NextFunction, Request, Response } from "express";
import * as admin from "firebase-admin";
import * as serviceAccount from "../configs/firebaseKey.config";
import { CustomFile } from "../interface/file.interface";
const BUCKET_URL = "biskato-557d0.appspot.com";


if (!admin.apps.some(app => app.name === "uploadApp")) {
  admin.initializeApp(
    {
      credential: admin.credential.cert(serviceAccount),
      storageBucket: BUCKET_URL,
    },
    "uploadApp"
  );
}

// Obtendo a instância correta para o bucket
const bucket = admin.app("uploadApp").storage().bucket();

const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) return next();
  const file = req.file as CustomFile;
  const nameFile = Date.now() + "." + file.originalname.split(".").pop();
  const file_bucket = bucket.file(nameFile);
  const stream = file_bucket.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });
  stream.on("error", (e) => {});
  stream.on("finish", async () => {
    await file_bucket.makePublic();
    file.fileUrl = `https://storage.googleapis.com/${BUCKET_URL}/${nameFile}`;
    next();
  });
  stream.end(file.buffer);
};

const uploadFiles = (req: Request, res: Response, next: NextFunction) => {
  if (!req.files || !Array.isArray(req.files)) return next();
  
  const files = req.files as CustomFile[];
  const uploadPromises = files.map((file) => {
    return new Promise<void>((resolve, reject) => {
      const nameFile = Date.now() + "." + file.originalname.split(".").pop();
      const file_bucket = bucket.file(nameFile);
      const stream = file_bucket.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      stream.on("error", (e) => {
        reject(e);
      });

      stream.on("finish", async () => {
        try {
          await file_bucket.makePublic();
          file.fileUrl = `https://storage.googleapis.com/${BUCKET_URL}/${nameFile}`;
          resolve();
        } catch (error) {
          reject(error);
        }
      });

      stream.end(file.buffer);
    });
  });

  Promise.all(uploadPromises)
    .then(() => next())
    .catch((error) => {
      res.status(500).json({ message: "File upload failed", error });
    });
};

export { uploadFile, uploadFiles };
