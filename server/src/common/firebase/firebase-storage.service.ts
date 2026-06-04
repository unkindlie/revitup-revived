import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { App } from 'firebase-admin/app';
import { Storage, getDownloadURL, getStorage } from 'firebase-admin/storage';
import { URL } from 'url';

import { FIREBASE_APP } from 'common/firebase/constants/firebase.constants';
import { FileUploadDto } from 'common/firebase/dto/file-upload.dto';

@Injectable()
export class FirebaseStorageService {
  private storage: Storage;

  constructor(@Inject(FIREBASE_APP) private firebaseApp: App) {
    this.storage = getStorage(firebaseApp);
  }

  // TODO: decide on the demand in this method
  async getFileLink(path: string): Promise<string> {
    const file = this.storage.bucket().file(path);

    const url = new URL(await getDownloadURL(file));

    return url.href;
  }

  async uploadFile(file: FileUploadDto): Promise<string> {
    const id = randomUUID();
    const { pathname, originalName, buffer, metadata } = file;

    const filePathname = `${pathname ? pathname + '/' : ''}${id}-${originalName}`;

    const [exists] = await this.storage.bucket().file(filePathname).exists();
    if (exists)
      throw new ConflictException('File with such name already exists');

    await this.storage.bucket().file(filePathname).save(buffer, {
      metadata,
    });

    return filePathname;
  }

  async deleteFile(fileLink: string): Promise<void> {
    const url = new URL(fileLink);
    const bucketName = this.storage.bucket().name;

    // URL-encoded path part must be decoded
    const pathname = decodeURIComponent(
      url.pathname.replace(`/v0/b/${bucketName}/o/`, ''),
    );
    const file = this.storage.bucket().file(pathname);

    const [exists] = await file.exists();
    if (!exists) throw new NotFoundException("Such file doesn't exists");

    await file.delete();
  }
}
