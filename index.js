const {Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');


async function setupDriver_Chrome() {
  const timeout = 2000;
  const driver = await new Builder().forBrowser('chrome').build();
  await driver.manage().setTimeouts({ implicit: timeout });
  return driver;
}

async function setupDriverSilent_Chrome() {
  const timeout = 2000;

  const chromeConfig = new chrome.Options();
  chromeConfig.addArguments('--headless');
  chromeConfig.addArguments('--disable-gpu');

  const driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeConfig).build();

  await driver.manage().setTimeouts({ implicit: timeout });
  return driver;
}

async function getProducts_PaoDeAcucar(productName) {
  
  const driver = await setupDriverSilent_Chrome();

  const searchUrl = encodeURI(`https://www.paodeacucar.com/busca?terms=${productName}`);
  const titleAfterLoad = `${productName} | Pão de Açúcar`;
  const productCard_Class = 'gXxQWo';
  const productName_Class = 'coaZwR';
  const productPrice_Class = 'lkWvql';
  const productPriceOnSale_Class = 'bgtGEw';
  const products = [];
  
  try {
    await driver.get(searchUrl);
    const success = await driver.wait(until.titleIs(titleAfterLoad));
    if (success) {
      const cards = await driver.findElements(By.className(productCard_Class));
      for (const card of cards) {
        try {
          const productNameElement = await card.findElement(By.className(productName_Class));
          const productPriceElement = await card.findElement(By.className(productPrice_Class));
          const name = await productNameElement.getText();
          let price = '';
          
          try {
            price = await productPriceElement.getText();
          } catch {
            try {
              const productPriceOnSaleElement = await card.findElement(By.className(productPriceOnSale_Class));
              price = await productPriceOnSaleElement.getText();
            } catch {}
          }
          
          if (price) {
            products.push({name, price});
          }
        } catch {}
      }
    }
  } finally {
    await driver.quit();
  }
  
  return products;
}


(async function main() {


  const products = await getProducts_PaoDeAcucar('café');

  // prints the products found
  for (const product of products) {
    console.log(`price: ${product.price}\tname: ${product.name}`);
  }

})();
