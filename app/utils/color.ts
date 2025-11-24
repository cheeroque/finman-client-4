export function getContrastColor(hex?: string | null, dark = '#000', light = '#fff') {
  if (!hex?.length) return dark

  const rgb = []
  const threshold = 165

  /* Remove hash from hex color string */
  let color = hex.substring(1)

  /* Normalize 3-digit color to 6-digit */
  if (color.length === 3) {
    color = color
      .split('')
      .map((ch) => `${ch}${ch}`)
      .join('')
  }

  /* Get 10-base R, G & B values */
  for (let i = 0; i < 3; i++) {
    rgb[i] = parseInt(color.substring(i * 2, i * 2 + 2), 16)
  }

  const lightness = 0.2126 * rgb[0]! + 0.7152 * rgb[1]! + 0.0722 * rgb[2]!

  return lightness >= threshold ? dark : light
}
