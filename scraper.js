const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

import puppeteer from 'puppeteer';


// Middleware to parse incoming JSON
app.use(json());

// POST route to handle form submission
app.post('/submit', async (req, res) => {
  const { email, postcode } = req.body;

  try {
    // Launch Puppeteer browser instance
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--disable-features=site-per-process"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 900 });

    // Navigate to the page
    await page.goto("https://pickmypostcode.com/#", { waitUntil: "networkidle0" });

    // Close the pop-up
    await page.click("#v-rebrand > div.wrapper.top > div.wrapper--content.wrapper--content__relative > nav > ul > li.nav--buttons.nav--item > button.btn.btn-secondary.btn-cancel");

    // Type in postcode and email
    await page.type("#confirm-ticket", postcode);
    await page.type("#confirm-email", email);

    // Click the submit button
    await page.click("#v-rebrand > div.wrapper.top > div.wrapper--content > main > div.overlay.overlay__open > section > div > div > div > form > button");

    // Wait for the page to load after submission
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    // Interact with the iframe (if needed)
    const frameHandle = await page.$(".faktor-iframe-wrapper");
    const frame = await frameHandle.contentFrame();
    await frame.click("#save");

    // Navigate to the API URL
    await page.goto("https://pickmypostcode.com/api/index.php/entry/ref/refurl/campaign/21674/cid/landing/?_=1667585918311", { waitUntil: "networkidle0" });

    // Check if the winning postcode is found
    const found = await page.evaluate(() => window.find(postcode));

    // Respond with a message based on the result
    if (found) {
      res.json({ message: "Congratulations! You have a winning postcode! Log into the website to claim!" });
    } else {
      res.json({ message: "Sorry! No winning postcode today!" });
    }

    // Close the browser
    await browser.close();

  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "An error occurred while processing your request." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
