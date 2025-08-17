import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const firebase = this.configService.get('FIREBASE_CREDENTIALS_ENCODED');
    if (!firebase) {
      throw new Error('FIREBASE_CREDENTIALS_ENCODED is not set in the environment variables');
    }

    const decodedzCredentials = Buffer.from(firebase, 'base64').toString('utf-8');
    const serviceAccount = JSON.parse(decodedzCredentials);

    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log('Firebase Admin SDK initialized successfully.');
    }
  }

  getAuth() {
    return admin.auth();
  }

  getFirestore() {
    return admin.firestore()
  }
}
