const { createScreenshotImgOnUrl } = require('./src/htmlHandler')
const { createPdfFromImgs } = require('./src/pdfCreator')
const { deleteOutputDir, createOutputDir } = require('./src/file')
const { validateInputParams, displayInfo } = require('./src/configReader')
/**
 * Starts the application
 */
const start = async () => {
    try {
        validateInputParams()
        displayInfo()
        deleteOutputDir()
        createOutputDir()
        await createScreenshotImgOnUrl()
        await createPdfFromImgs()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

start()
