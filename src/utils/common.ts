export const handleTrim = (value: string) => {
  if (typeof value === 'string') return value.trim()
  return value
}
