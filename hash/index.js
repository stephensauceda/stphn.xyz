const url = require('url')
const { db } = require('../lib/db')

module.exports = (req, res) => {
  const { query } = url.parse(req.url, true)
  const linkRef = db.ref(`/links/${query.hash}`)

  linkRef.once('value').then(snapshot => {
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

    res.writeHead(302, {
      Location: val.url
    })
    
    res.end()
  })
}
