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

app.get('/stats', (req, res) => {
  const linkRef = db.ref('links')

  linkRef.once('value')
    .then(snapshot => {
      res.json(snapshot.val())
    })
})

app.get('/:hash', (req, res) => {
  const linkRef = db.ref(`/links/${req.params.hash}`)
  linkRef
    .once('value')
    .then(snapshot => {
      const val = snapshot.val()
      if (val.views) {
        linkRef.update({
          views: val.views + 1
        })
      } else {
        linkRef.update({
          views: 1
        })
      }
      res.redirect(val.url)
    })
})

app.listen(3000, () => {
  console.log('App listening...')
})
