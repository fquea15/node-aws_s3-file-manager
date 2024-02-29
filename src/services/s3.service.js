import {
  ListObjectsCommand,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { AWS_BUCKET_NAME } from "../config/env.config.js";
import fs from "fs-extra";
import { clientS3 } from "../config/aws.config.js";

async function uploadFile(image) {
  const pathImage = fs.readFileSync(image.tempFilePath);

  const command = new PutObjectCommand({
    Body: pathImage,
    Bucket: AWS_BUCKET_NAME,
    Key: image.name,
    Metadata: {
      contentType: image.mimetype,
    },
  });
  const response = await clientS3.send(command);
  fs.unlinkSync(image.tempFilePath);
  return response.$metadata;
}

// GET FILES AWS_S3
async function getFiles() {
  const data = [];
  const command = new ListObjectsCommand({
    Bucket: AWS_BUCKET_NAME,
  });
  const response = (await clientS3.send(command)).Contents;

  await Promise.all(
    response.map(async (image, index) => {
      const file = await getFileURL(image);
      console.log(file);
      data.push(file);
    })
  );
  return data;
}

// GET FILE AND GET URL THE FILE
async function getFileURL(image) {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: image.Key,
  });
  const url = await getSignedUrl(clientS3, command, { expiresIn: 600 });
  return {
    name: image.Key,
    LastModified: image.LastModified,
    Size: image.Size,
    url: url,
  };
}

export { uploadFile, getFiles, getFileURL };
