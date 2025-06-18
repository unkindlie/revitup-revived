import { registerAs } from '@nestjs/config';

export default registerAs('firebaseAdmin', () => ({
    type: process.env.FIREBASE_TYPE,
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID,
    authUri: process.env.FIREBASE_AUTH_URI,
    tokenUri: process.env.FIREBASE_TOKEN_URI,
    authProviderCertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    clientCertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universalDomain: process.env.FIREBASE_UNIVERSAL_DOMAIN,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
}));
