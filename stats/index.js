const { db } = require('../lib/db')

module.exports = (req, res) => {
  const linkRef = db.ref('links')

  linkRef.once('value').then(snapshot => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(snapshot.val()))
  })
}
