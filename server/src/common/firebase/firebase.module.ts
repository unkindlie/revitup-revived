import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FirebaseStorageService } from './firebase-storage.service';
import firebaseProvider from './firebase.provider';

@Module({
    imports: [ConfigModule],
    providers: [firebaseProvider, FirebaseStorageService],
    exports: [FirebaseStorageService],
})
export class FirebaseModule {}
