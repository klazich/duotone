import { parse, join } from 'path'
import sharp from 'sharp'

const outputDir = join(__dirname, 'greyscale')

async function greyscale(imagePath) {
  const { name } = parse(imagePath)
  const output = join(outputDir, `${name}.jpg`)
  // console.log(`input: ${imagePath} output: ${output}`)

  try {
    await sharp(imagePath)
      .greyscale()
      .sharpen()
      .normalize()
      .toFile(output)
    console.log(`GREYSCALE: ${name}`)
  } catch (err) {
    console.error(err, name)
  }
}

export default greyscale
