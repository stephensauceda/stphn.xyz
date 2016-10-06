import express from 'express'
import bodyParser from 'body-parser'
import makeHash from './lib/makeHash'

export const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('It works...')
})

app.get('/receive', makeHash, (req, res) => {
  res.json({ shorturl: `https://stphn.xyz/${req.hash}` })
})

app.listen(3000, () => {
  console.log('App listening...')
})
