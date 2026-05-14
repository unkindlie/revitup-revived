export class FileUploadDto {
  pathname: string | null;
  originalName: string;
  metadata: { contentType: string };
  buffer: Buffer;

  constructor(file: Express.Multer.File, pathname?: string) {
    this.pathname = pathname || null;
    this.originalName = file.originalname;
    this.metadata = { contentType: file.mimetype };
    this.buffer = file.buffer;
  }
}
