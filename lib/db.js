const firebase = require('firebase')

const config = {
  apiKey: process.env.stphn_apikey,
  authDomain: process.env.stphn_authdomain,
  databaseURL: process.env.stphn_databaseurl,
  storageBucket: process.env.stphn_storagebucket,
  messagingSenderId: process.env.stphn_messagingsenderid
};

firebase.initializeApp(config);

module.exports = {
  db: firebase.database()
}
