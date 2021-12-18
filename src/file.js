const path = require('path')

const dirPath = path.join(__dirname, '../output')
const fs = require('fs')
const fsExtra = require('fs-extra')
/**
 * Removes the default output folder where pdf will be generated
 */
exports.deleteOutputDir = () => {
    try {
        fs.existsSync(dirPath) && fsExtra.emptyDirSync(dirPath)
    } catch (error) {
        console.log(`Output dir not exist so not got deleted: ${dirPath}`)
        throw error
    }
}

/**
 * Creates output dir to persist captured img and pdf to (current dir/output)
 */
exports.createOutputDir = () => {
    try {
        fs.existsSync(dirPath) || fs.mkdirSync(dirPath)
        console.log(`Output dir got created: ${dirPath}`)
    } catch (error) {
        console.error(`Output dir did not get created: ${dirPath}!!!`)
        throw error
    }
}
