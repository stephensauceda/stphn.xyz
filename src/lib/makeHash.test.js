import makeHash from './makeHash'
let req;

beforeEach(() => {
  req = {}
})

test('returns a string', () => {
  makeHash(req, {}, () => {})
  expect(typeof req.hash).toBe('string')
})

test('hash should be five characters', () => {
  makeHash(req, {}, () => {})
  expect(req.hash.length).toBe(5)
})

test('should call next()', () => {
  const next = jest.fn()
  makeHash(req, {}, next)
  expect(next).toHaveBeenCalled()
})
