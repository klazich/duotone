import fs from 'fs-extra'

async function getImagePaths(dir) {
  try {
    return await fs.readdir(dir)
  } catch (err) {
    console.error(err)
  }
}

export default getImagePaths
