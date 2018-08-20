const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://www.espn.com/nba/statistics/player/_/stat/scoring-per-game/sort/avgPoints/year/2018/seasontype/2');
    await page.screenshot({ path: 'example.png' });


    const data = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('table tr td'))
        return tds.map(td => td.innerHTML)
    });

    //You will now have an array of strings
    //[ 'One', 'Two', 'Three', 'Four' ]
    console.log(data);
    //One
    console.log(data[0]);
    await browser.close();
})();