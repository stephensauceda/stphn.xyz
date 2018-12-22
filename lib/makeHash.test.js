const makeHash = require('./makeHash')
let req;

beforeEach(() => {
  req = {}
})

test('returns a string', () => {
  expect(makeHash()).toEqual(expect.any(String))
})

test('hash should be five characters', () => {
  expect(makeHash().length).toBe(5)
})
