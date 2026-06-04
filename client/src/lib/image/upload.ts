export const isImageFile = (file: File | null | undefined) => {
  return !!file && !!file.type && file.type.startsWith('image/');
};

export const createPreviewUrl = (file: File) => URL.createObjectURL(file);

const loadImage = (file: File): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Image load error'));
      if (typeof reader.result === 'string') img.src = reader.result;
      else reject(new Error('Unexpected file reading result'));
    };
    reader.onerror = () => reject(new Error('File read error'));
    reader.readAsDataURL(file);
  });

export const ensureSquareFile = async (file: File): Promise<File> => {
  const img = await loadImage(file);
  const width = img.naturalWidth;
  const height = img.naturalHeight;

  if (width === height) return file;

  const side = Math.min(width, height);
  const sx = Math.floor((width - side) / 2);
  const sy = Math.floor((height - side) / 2);

  const canvas = document.createElement('canvas');
  canvas.width = side;
  canvas.height = side;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context error');

  ctx.drawImage(img, sx, sy, side, side, 0, 0, side, side);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Failed to create blob'))),
      file.type || 'image/png',
    );
  });

  return new File([blob], file.name, { type: blob.type });
};
