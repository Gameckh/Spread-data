const fs = require('fs');
const { initSpreadJS } = require('../spreadjs/initSpread');

async function extractData(file) {
    const page = await initSpreadJS();
    return await page.evaluate(({ file }) => {
        let result = null;
        const designer = GC.Spread.Sheets.Designer.findControl(document.getElementById("gc-designer-container"));
        const spread = designer.getWorkbook();
        // 最后一个参数是 options, 可以配置一些优化项
        return new Promise((resolve, reject) => {
            spread.import(file, function () {
                const sheet = spread.getActiveSheet();
                result = sheet.name() + ': ' + sheet.getValue(1, 1);
                resolve(result);
            }, function () {
                reject('导入发生错误');
            }, {});
        })
    }, { file });
}

module.exports = {
    extractData
}