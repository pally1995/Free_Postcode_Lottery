const puppeteer = require("puppeteer");

async function findWinningPostcode() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--disable-features=site-per-process"],
  });

  const page = await browser.newPage();
  page.setViewport({ width: 1000, height: 900 });
  await page.goto("https://pickmypostcode.com/#", {
    waitUntil: "networkidle0",
  });
  await page.click(
    "#v-rebrand > div.wrapper.top > div.wrapper--content.wrapper--content__relative > nav > ul > li.nav--buttons.nav--item > button.btn.btn-secondary.btn-cancel"
  );
  await page.type("#confirm-ticket", `ng5 7at`);
  await page.type("#confirm-email", `alexward95@hotmail.com`);
  await page.click(
    "#v-rebrand > div.wrapper.top > div.wrapper--content > main > div.overlay.overlay__open > section > div > div > div > form > button"
  );

  await page.waitForNavigation({ waitUntil: "networkidle2" });
  const frameHandle = await await page.$(".faktor-iframe-wrapper");
  const frame = await frameHandle.contentFrame();
  await frame.click("#save");

  await page.goto(
    "https://pickmypostcode.com/api/index.php/entry/ref/refurl/campaign/21674/cid/landing/?_=1667585918311", {
    waitUntil: "networkidle0",
});

  const found = await page.evaluate(() => window.find("ng5 7at"));

  if (found == true){
    console.log(" Congratulations! You have a winning postcode! Log into the website to claim!")
  }else {
    console.log("Sorry! No winning postcode today!")
  }

  page.close();
}

findWinningPostcode();

// SL2 4DW
// LN11 8EL
