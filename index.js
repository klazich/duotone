import { parse, join } from 'path'
import sharp from 'sharp'
import getImagePaths from './getImagePaths'
import duotone from './duotone'

const imagesDir = join(__dirname, 'images')
const outputDir = join(__dirname, 'duotone')

const joinDir = filename => join(imagesDir, filename)

async function run() {
  try {
    const files = await getImagePaths(imagesDir)
    await files.map(joinDir).forEach(async imageFile => {
      const options = {
        highlight: '#0ec4f1',
        shadow: '#192550',
        // opacity: '50',
      }
      const format = 'jpg'

      const { name } = parse(imageFile)
      const output = join(outputDir, `${name}.jpg`)

      try {
        const duotoneImage = await duotone(options, format, sharp(imageFile))
        await duotoneImage.toFile(output)
      } catch (err) {
        console.error(err, imageFile)
      }
    })
  } catch (err) {
    console.error(err)
  }
}

run()