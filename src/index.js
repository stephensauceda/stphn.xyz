import express from 'express'
import bodyParser from 'body-parser'
import makeHash from './lib/makeHash'
import { db } from './lib/db'

export const app = express()

app.use(bodyParser.json())

app.get('/receive', makeHash, (req, res) => {
  const name = req.query.name || req.hash
  db.ref(`links/${name}`).set({
    hash: name,
    url: req.query.url
  }, (data) => {
    res.json({ shorturl: `https://${req.hostname}/${name}` })
  });
})

app.get('/:hash', (req, res) => {
  db.ref(`/links/${req.params.hash}`)
    .once('value')
    .then(snapshot => {
      res.redirect(snapshot.val().url)
    })
})

app.listen(3000, () => {
  console.log('App listening...')
})
