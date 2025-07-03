import { ConfigModule, ConfigType } from '@nestjs/config';
import * as admin from 'firebase-admin';

import { FIREBASE_APP } from './firebase.constants';
import firebaseAdminConfig from './firebase-admin.config';

export default {
    provide: FIREBASE_APP,
    useFactory: (config: ConfigType<typeof firebaseAdminConfig>) => {
        const firebaseConfig = {
            type: config.type,
            projectId: config.projectId,
            privateKeyId: config.privateKeyId,
            privateKey: config.privateKey,
            clientEmail: config.clientEmail,
            clientId: config.clientId,
            authUri: config.authUri,
            tokenUri: config.tokenUri,
            authProviderCertUrl: config.authProviderCertUrl,
            clientCertUrl: config.clientCertUrl,
            universalDomain: config.universalDomain,
        } as admin.ServiceAccount;

        return admin.initializeApp({
            credential: admin.credential.cert(firebaseConfig),
            storageBucket: config.storageBucket,
        });
    },
    inject: [firebaseAdminConfig.KEY],
    import: [ConfigModule.forFeature(firebaseAdminConfig)],
};
