// Upload avatar image
const uploadImage = async (fileName: string, file: Blob) => {
  const cloudinaryEndPoint = `https://api.cloudinary.com/v1_1/${
    import.meta.env.CLOUDINARY_CLOUD_NAME
  }/image/upload`;
  const timestamp = Math.floor(Date.now() / 1000);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', import.meta.env.CLOUDINARY_API_KEY as string);
  formData.append('folder', import.meta.env.CLOUDINARY_FOLDER as string);
  formData.append('id', fileName);
  formData.append('timestamp', timestamp + '');
  formData.append(
    'upload_preset',
    import.meta.env.CLOUDINARY_UPLOAD_PRESET as string,
  );

  const res = await fetch(cloudinaryEndPoint, {
    method: 'POST',
    body: formData,
  });

  // Fail upload
  if (!res.ok) return null;

  // Success upload
  const resJSON = await res.json();
  const imageUrl = resJSON.secure_url as string;

  return imageUrl;
};

export { uploadImage };
