const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1200 });
    await page.goto('https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html');

    await page.waitForSelector('#tabledatasii');

    const titulo = await page.$eval('.title', el => el.innerText);
    const descripcion = await page.$eval('p:not(.barra-opciones)', el => el.innerText);

    let encabezados = await page.$$eval('#tabledatasii tr', rows => {
        return Array.from(rows, row => {
          const columns = row.querySelectorAll('th');
          return Array.from(columns, column => column.innerText);
        });
      });
      encabezados = encabezados[0, 0];
    const cuerpo = await page.evaluate(() => {
        const rows = document.querySelectorAll('#tabledatasii tr');
        return Array.from(rows, row => {
          const columns = row.querySelectorAll('td');
          return Array.from(columns, column => column.innerText);
        });
      });
      await browser.close();

      
      encabezados = encabezados.toString().split(',');

    const arregloFinal = [];
    arregloFinal.push(
        {titulo},
        {descripcion},
        {encabezados}, 
        {cuerpo}
        );
    

    console.log(JSON.stringify(arregloFinal));
    
})();