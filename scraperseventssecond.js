const puppeteer = require('puppeteer');

async function scrapeEvents(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    for(y = 2; y < 8; y++){
    await page.goto(url);
    console.log('it arrives at line 9');
    const [el1] = await page.$x('//*[@id="sidebar"]/div[3]/table/tbody/tr['+y+']/td[1]/a');  
    console.log('it arrives at line 11');
    const eventLink = await el1.getProperty('href');
    console.log('it arrives at line 13');
    const eventLinkText = await eventLink.jsonValue();
    console.log({eventLinkText})
    console.log('succesfully obtained event data')

    await page.goto(eventLinkText);
    let names = [];
   
        for (x = 1; x < 6; x++){

            for (n = 1; n < 3; n++){ 
            const [el2] =  await page.$x('//*[@id="sidebar"]/div[3]/ul/li['+x+']/span[1]/a['+n+']');  
            const txt11A = await el2.getProperty('textContent');
            const fighter = await txt11A.jsonValue();
            names.push({
                'fighter': fighter

            });
            console.log('fighter'+(y-1)+x+n+' set innerHTML to '+ fighter);
            console.log({fighter});
                  
            }
        }
        console.log(JSON.stringify(names))   
      
    }
     
    // document.getElementById('event11').innerHTML = 'hello';
    browser.close();

    
     
}
scrapeEvents('https://www.tapology.com');