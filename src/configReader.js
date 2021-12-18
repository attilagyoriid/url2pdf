exports.imageName = 'screenshot.png'
exports.pdfName = process.env.PDF_NAME || process.env.npm_config_PDF_NAME || 'result.pdf'
exports.url = process.env.URL_TO_CAPTURE || process.env.npm_config_URL_TO_CAPTURE

exports.selector =
    process.env.CSS_SELECTOR_TO_WAIT_FOR || process.env.npm_config_CSS_SELECTOR_TO_WAIT_FOR
exports.pageLoadTimeout =
    process.env.PAGE_LOAD_TIMEOUT || process.env.npm_config_PAGE_LOAD_TIMEOUT || 60000
exports.waitForSelector =
    process.env.WAIT_FOR_SELECTOR || process.env.npm_config_WAIT_FOR_SELECTOR || 8000
exports.width = process.env.PAGE_WIDTH || process.env.npm_config_PAGE_WIDTH || 1920

exports.validateInputParams = () => {
    if (!exports.url) {
        const errorMessage = `Error: URL_TO_CAPTURE argument 
    variable must be defined! Set as env variable: URL_TO_CAPTURE or pass as cli argument: --URL_TO_CAPTURE`
        console.log(errorMessage)
        throw new Error(errorMessage)
    }
}

exports.displayInfo = () => {
    console.log(`--CSS_SELECTOR_TO_WAIT_FOR:${exports.selector}`)
    console.log(`--PAGE_LOAD_TIMEOUT:${exports.pageLoadTimeout}`)
    console.log(`--WAIT_FOR_SELECTOR:${exports.waitForSelector}`)
    console.log(`--PAGE_WIDTH:${exports.width}`)
    console.log(`--PDF_NAME:${exports.pdfName}`)
    console.log(`Image output name:${exports.imageName}`)
}
