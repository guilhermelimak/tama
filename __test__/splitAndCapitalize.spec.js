import { splitAndCapitalize } from 'src/util'

describe('splitAndCapitalize.js', () => {
  it('should work on pascal case strings', () => {
    const before = 'ThisIsATest'
    const after = 'This Is A Test'

    expect(splitAndCapitalize(before)).toBe(after)
  })

  it('should work on mixed case strings', () => {
    const before = 'thisIsATest'
    const after = 'This Is A Test'

    expect(splitAndCapitalize(before)).toBe(after)
  })
})
