const imagesToPdf = require('images-to-pdf')
const config = require('./configReader')

/**
 * Creates pdf from 'screenshot.png' in the output folder under name pdfName
 */
exports.createPdfFromImgs = async () => {
    try {
        await imagesToPdf([`./output/${config.imageName}`], `./output/${config.pdfName}`)
    } catch (err) {
        console.log(`❌ Error: ${err.message}`)
        throw err
    }
}
