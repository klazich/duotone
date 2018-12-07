import sharp from 'sharp'
import createDuotoneGradient from './createDuotoneGradient'
import hexToRgb from './hexToRgb'
import overlayDuotone from './overlayDuotone'

async function duotone(duotone, format, pipeline) {
  const duotoneGradient = createDuotoneGradient(
    hexToRgb(duotone.highlight),
    hexToRgb(duotone.shadow)
  )

  const duotoneImage = await pipeline
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => {
      for (let i = 0; i < data.length; i = i + info.channels) {
        const r = data[i + 0]
        const g = data[i + 1]
        const b = data[i + 2]

        // @see https://en.wikipedia.org/wiki/Relative_luminance
        const avg = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b)

        data[i + 0] = duotoneGradient[avg][0]
        data[i + 1] = duotoneGradient[avg][1]
        data[i + 2] = duotoneGradient[avg][2]
      }

      return sharp(data, {
        raw: info,
      }).toFormat(format)
    })

  if (duotone.opacity) {
    return overlayDuotone(duotoneImage, pipeline, duotone.opacity, format)
  } else {
    return duotoneImage
  }
}

export default duotone
