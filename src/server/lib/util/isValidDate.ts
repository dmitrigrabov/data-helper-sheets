export const isValidDate = (date: unknown): date is Date => {
  if (!(date instanceof Date)) {
    return false
  }

  if (date.toString() === 'Invalid Date') {
    return false
  }

  return true
}
