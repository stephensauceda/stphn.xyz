import times from 'lodash.times'

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function pickChar() {
  return chars.charAt(Math.floor(Math.random() * chars.length))
}

export default (req, res, next) => {
  req.hash = times(5, pickChar).join('')
  next()
}
