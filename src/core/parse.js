export function parse(value = '') {
  try {
    if (value.startsWith('=')) {
      return eval(value.slice(1))
    }
  } catch (e) {
    console.warn('Skipping parse error', e.message);
  }

  return value
}