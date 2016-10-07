import express from 'express'
import bodyParser from 'body-parser'
import makeHash from './lib/makeHash'

import firebase from 'firebase'

const config = {
  apiKey: process.env.apikey,
  authDomain: process.env.authdomain,
  databaseURL: process.env.databaseurl,
  storageBucket: process.env.storagebucket,
  messagingSenderId: process.env.messagingsenderid
};

firebase.initializeApp(config);

const database = firebase.database()

export const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('It works...')
})

app.get('/receive', makeHash, (req, res) => {
  const name = req.query.name || req.hash
  database.ref(`links/${name}`).set({
    hash: name,
    url: req.query.url
  }, (data) => {
    res.json({ shorturl: `https://${req.hostname}/${name}` })
  });
})

app.get('/:hash', (req, res) => {
  database.ref(`/links/${req.params.hash}`)
    .once('value')
    .then(snapshot => {
      res.redirect(snapshot.val().url)
    })
})

app.listen(3000, () => {
  console.log('App listening...')
})
