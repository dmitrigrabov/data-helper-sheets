import { getNthChar } from 'server/lib/sheets/getNthChar'

describe('getNthChar', () => {
  it('matches n = 0 => A', () => {
    expect(getNthChar(1)).toBe('B')
  })

  it('matches n = 1 => B', () => {
    expect(getNthChar(1)).toBe('B')
  })

  it('matches n = 25 => Z', () => {
    expect(getNthChar(25)).toBe('Z')
  })

  it('matches n = 26 => AA', () => {
    expect(getNthChar(26)).toBe('AA')
  })

  it('matches n = 51 => AZ', () => {
    expect(getNthChar(51)).toBe('AZ')
  })

  it('matches n = 52 => BA', () => {
    expect(getNthChar(52)).toBe('BA')
  })

  it('matches n = 702 => ZZ', () => {
    expect(getNthChar(701)).toBe('ZZ')
  })
})
