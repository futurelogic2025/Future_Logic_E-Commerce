import admin, { initializeApp, credential as _credential } from 'firebase-admin';
import serviceAccount from '../path/to/firebase-key.json';

initializeApp({
  credential: _credential.cert(serviceAccount),
  databaseURL: 'https://<your-database-name>.firebaseio.com',
});

export default admin;
