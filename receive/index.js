const url = require('url')
const { db } = require('../lib/db')
const makeHash = require('../lib/makeHash')

module.exports = (req, res) => {
  const { query } = url.parse(req.url, true)
  const name = query.name ? query.name : makeHash()

  db.ref(`links/${name}`).set(
    {
      hash: name,
      url: query.url
    },
    data => {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ shorturl: `https://${req.headers.host}/${name}` }))
    }
  )
}
