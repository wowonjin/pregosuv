import { adminStorage } from "@/lib/firebase/admin";

export async function resolveBusinessCardUrl(input: {
  businessCardPath?: string;
  businessCardUrl?: string;
}) {
  const storagePath = input.businessCardPath?.trim();
  if (storagePath) {
    const bucket = adminStorage().bucket();
    const file = bucket.file(storagePath);
    const [exists] = await file.exists();
    if (exists) {
      const [url] = await file.getSignedUrl({
        action: "read",
        expires: "03-01-2036",
      });
      return url;
    }
  }
  return input.businessCardUrl?.trim() || undefined;
}
