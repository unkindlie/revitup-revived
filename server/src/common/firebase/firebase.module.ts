import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FirebaseStorageService } from './firebase-storage.service';
import firebaseProvider from './firebase.provider';
import firebaseAdminConfig from './firebase-admin.config';

@Module({
    imports: [ConfigModule.forFeature(firebaseAdminConfig)],
    providers: [firebaseProvider, FirebaseStorageService],
    exports: [FirebaseStorageService],
})
export class FirebaseModule {}
