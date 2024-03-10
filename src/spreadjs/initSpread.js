const { chromium } = require('playwright');

let page = null;

async function initSpreadJS() {
    if (page) return page;
    const browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto(`file://${__dirname}/spreadjs.html`);
    await page.waitForFunction(() => window.GC && window.GC.Spread);
    if (page) {
        console.log('完成 page 初始化');
    } else {
        console.error('page 未完成初始化');
    }
    return page;
}

module.exports = {
    initSpreadJS
};