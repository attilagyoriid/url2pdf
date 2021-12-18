const captureWebsite = require('capture-website')
const puppeteer = require('puppeteer')
const { wait } = require('./wait')
const config = require('./configReader')
const createPageProxy = require('puppeteer-proxy')
/**
 * Get html element height defined by selector
 * @param {*} page
 * @return {number} scrollheight of html element determined by
 */
const _getDocHeight = async (page) => {
    return await page.evaluate((selector) => {
        const h = document.querySelector(selector).scrollHeight
        return +h
    }, config.selector)
}

/**
 *  Polling html element height till last n values equal
 * @param {*} page puppeteer object
 * @return {number} document height
 */

const _getDocHeightSettled = async (page) => {
    let currentDocHeight = 0
    let i = 0
    const n = 2
    const dockHeights = []
    do {
        await wait(2000)
        currentDocHeight = await _getDocHeight(page)
        dockHeights.push(currentDocHeight)
        i++
        if (i > n && dockHeights[i] === dockHeights[i - 1]) {
            console.log(`Doc height settled: ${currentDocHeight}`)
            break
        }
    } while (i < n + 1)

    return +currentDocHeight
}

/**
 * Get html element heigh under the provided url. this will be the
 * height of the screen capture
 * @return {number} document height by selector
 */
const _getUrlPageHeight = async () => {
    let browser = null
    let documentHeight
    console.log(`Navigating to url: ${config.url}`)
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        })
        const page = await browser.newPage()

        const pageProxy = createPageProxy({
            page,
        })

        await page.setRequestInterception(true)

        page.once('request', async (request) => {
            await pageProxy.proxyRequest({
                request,
                proxyUrl: 'http://127.0.0.1:4444',
            })
        })

        await page.goto(config.url, {
            waitUntil: 'domcontentloaded',
            timeout: config.pageLoadTimeout,
        })
        await page.waitForSelector(config.selector, {
            visible: true,
            timeout: config.waitForSelector,
        })

        documentHeight = await _getDocHeightSettled(page)

        console.log(`Successfully retrieved document height: ${documentHeight}`)
    } catch (err) {
        console.log(`❌ Error: ${err.message}`)
        throw err
    } finally {
        await browser.close()
    }
    return +documentHeight
}

/**
 * Creates screenshot capture as 'screenshot.png'
 * in the output folder on the webpage under url
 */
exports.createScreenshotImgOnUrl = async () => {
    const documentHeight = config.selector && (await _getUrlPageHeight())
    const delayTime = 30
    try {
        await captureWebsite.file(config.url, `./output/${config.imageName}`, {
            fullPage: true,
            executablePath: 'google-chrome-unstable',
            delay: delayTime,
            width: config.width,
            ...(config.selector && { waitForElement: config.selector }),
            ...(documentHeight && { height: documentHeight }),
            launchOptions: {
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            },
        })
    } catch (err) {
        console.log(`❌ Error creating screen capture: ${err.message}`)
        throw err
    }
}
