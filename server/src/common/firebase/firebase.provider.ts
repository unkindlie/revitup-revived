import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

import { FIREBASE_APP } from './firebase.constants';

export default {
    provide: FIREBASE_APP,
    useFactory: (configService: ConfigService) => {
        const firebaseConfig = {
            type: configService.get<string>('firebaseAdmin.type'),
            projectId: configService.get('firebaseAdmin.projectId'),
            privateKeyId: configService.get<string>(
                'firebaseAdmin.privateKeyId',
            ),
            privateKey: configService.get('firebaseAdmin.privateKey'),
            clientEmail: configService.get('firebaseAdmin.clientEmail'),
            clientId: configService.get<string>('firebaseAdmin.clientId'),
            authUri: configService.get<string>('firebaseAdmin.authUri'),
            tokenUri: configService.get<string>('firebaseAdmin.tokenUri'),
            authProviderCertUrl: configService.get<string>(
                'firebaseAdmin.authProviderCertUrl',
            ),
            clientCertUrl: configService.get<string>(
                'firebaseAdmin.clientCertUrl',
            ),
            universalDomain: configService.get<string>(
                'firebaseAdmin.universalDomain',
            ),
        } as admin.ServiceAccount;

        return admin.initializeApp({
            credential: admin.credential.cert(firebaseConfig),
            storageBucket: configService.get('firebaseAdmin.storageBucket'),
        });
    },
    inject: [ConfigService],
    import: [ConfigModule],
};
