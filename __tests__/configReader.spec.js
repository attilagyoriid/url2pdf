const config = require('../src/configReader')
describe('Config Reader', () => {
    test('should fallback to the proper defaults', () => {
        expect(config.imageName).toEqual('screenshot.png')
        expect(config.pdfName).toEqual('result.pdf')
        expect(+config.pageLoadTimeout).toEqual(60000)
        expect(+config.waitForSelector).toEqual(8000)
        expect(+config.width).toEqual(1920)
        expect(config.url).toEqual(undefined)
        expect(config.selector).toEqual(undefined)
    })
    describe('validateInputParams', () => {
        test('should throw error if no url defined', () => {
            expect(config.validateInputParams).toThrowError(/URL_TO_CAPTURE/)
        })
    })
})
