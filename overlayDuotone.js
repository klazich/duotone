import sharp from 'sharp'

async function overlayDuotone(duotoneImage, originalImage, opacity, format) {
  const info = await duotoneImage
    .flatten()
    .metadata()
    .then(info => info)
  // see https://github.com/lovell/sharp/issues/859#issuecomment-311319149
  const percentGrey = Math.round((opacity / 100) * 255)
  const percentTransparency = Buffer.alloc(
    info.width * info.height,
    percentGrey
  )

  const duotoneWithTransparency = await duotoneImage
    .joinChannel(percentTransparency, {
      raw: { width: info.width, height: info.height, channels: 1 },
    })
    .raw()
    .toBuffer()

  return await originalImage
    .overlayWith(duotoneWithTransparency, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) =>
      sharp(data, {
        raw: info,
      }).toFormat(format)
    )
}

export default overlayDuotone
