import firebase from 'firebase'

const config = {
  apiKey: process.env.apikey,
  authDomain: process.env.authdomain,
  databaseURL: process.env.databaseurl,
  storageBucket: process.env.storagebucket,
  messagingSenderId: process.env.messagingsenderid
};

firebase.initializeApp(config);

export const db = firebase.database()
