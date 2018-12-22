const times = require('lodash.times')

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function pickChar() {
  return chars.charAt(Math.floor(Math.random() * chars.length))
}

module.exports = (limit = 5) => {
  return times(limit, pickChar).join('')
}
