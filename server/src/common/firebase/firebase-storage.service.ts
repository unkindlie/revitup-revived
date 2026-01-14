import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    url.searchParams.delete('alt');
    url.searchParams.delete('token');

    return url.href;
  }
  async uploadFile(file: FileUploadDto): Promise<void> {
    const [exists] = await this.storage.bucket().file(file.pathname).exists();
    if (exists)
      throw new ConflictException('File with such name already exists');

    await this.storage.bucket().file(file.pathname).save(file.buffer, {
      metadata: file.metadata,
    });
  }
  async deleteFile(fileLink: string) {
    const url = new URL(fileLink);
    const bucketName = this.storage.bucket().name;

    const pathname = url.pathname.replace(`/v0/b/${bucketName}/o/`, '');
    const file = this.storage.bucket().file(pathname);

    if (!file.exists()[0])
      throw new NotFoundException("Such file doesn't exists");
    await file.delete();
  }
}
