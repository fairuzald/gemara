/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
  readonly SHEET_URL: string;
  readonly CLOUDINARY_CLOUD_NAME: string;
  readonly CLOUDINARY_API_KEY: string;
  readonly CLOUDINARY_UPLOAD_PRESET: string;
  readonly CLOUDINARY_API_SECRET: string;
  readonly CLOUDINARY_FOLDER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
