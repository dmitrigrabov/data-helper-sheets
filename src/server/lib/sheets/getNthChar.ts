const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export const getNthChar = (n: number) => {
  if (n > 701) {
    throw new Error('Cannot have more than 702 columns in sheet')
  }

  if (n < 26) {
    return chars[n]
  }

  const n2 = n % 26
  const n1 = (n - n2) / 26

  return `${chars[n1 - 1]}${chars[n2]}`
}
