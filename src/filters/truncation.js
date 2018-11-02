export function truncation (value) {
  if (value) {
    if (value.length <= 50) {
      return value
    }

    return value.substring(0, 50) + ' ...'
  }
}
