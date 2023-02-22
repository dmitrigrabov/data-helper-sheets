type SplitTrim = (joinedStrings: string) => string[]

export const splitTrim: SplitTrim = joinedStrings => {
  return joinedStrings?.split(',').map(link => link.trim())
}
