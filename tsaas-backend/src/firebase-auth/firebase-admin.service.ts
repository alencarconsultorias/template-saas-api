import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.applicationDefault(), // ou use sua serviceAccount
});

export default admin;
