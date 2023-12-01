// minio.ts
import * as Minio from "minio";

export const minioClient = new Minio.Client({
  endPoint: "127.0.0.1",
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_CLIENT_ACCESS_KEY!,
  secretKey: process.env.MINIO_CLIENT_SECRET_KEY!,
});

try {
  minioClient.bucketExists("user-profile-photos", (err, exists) => {
    if (err) {
      console.error("Error checking bucket existence:", err);
    } else {
      console.log("Connection to Minio established.");
    }
  });
} catch (error) {
  console.error("Error during Minio client instantiation:", error);
}
