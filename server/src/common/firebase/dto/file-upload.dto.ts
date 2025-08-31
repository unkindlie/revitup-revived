import { join } from 'path';

export class FileUploadDto {
  pathname: string;
  metadata: { contentType: string };
  buffer: Buffer;

  constructor(file: Express.Multer.File, pathname?: string) {
    this.pathname = pathname
      ? join(pathname, '/', file.originalname)
      : file.originalname;
    this.metadata = { contentType: file.mimetype };
    this.buffer = file.buffer;
  }
}
