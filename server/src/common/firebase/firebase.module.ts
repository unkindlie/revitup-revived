import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import firebaseAdminConfig from 'common/firebase/firebase-admin.config';
import { FirebaseStorageService } from 'common/firebase/firebase-storage.service';
import firebaseProvider from 'common/firebase/firebase.provider';

@Module({
  imports: [ConfigModule.forFeature(firebaseAdminConfig)],
  providers: [firebaseProvider, FirebaseStorageService],
  exports: [FirebaseStorageService],
})
export class FirebaseModule {}
