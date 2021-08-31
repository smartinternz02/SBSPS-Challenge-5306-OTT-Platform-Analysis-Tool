// Importing Libraries
const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  // Launching headless browser
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  // Opening a blank page
  const [page] = await browser.pages();

  // Declaring variables
  const baseURL =
    "https://www.mouthshut.com/product-reviews/Hotstar-reviews-925755712-page-";
  let titles = [];
  let reviews = [];

  for (let i = 1; i < 44; i++) {
    // Navigating to the URL
    await page.goto(`${baseURL}${i}`);

    // Waiting for the review to load
    await page.waitForSelector(".read-review-holder");

    // Evaluating and cleaning the Review Title and pushing it in titles array
    titles.push(
      await page.$$eval(".row.review-article", (els) =>
        els.map((el) =>
          el.childNodes[1].childNodes[3].childNodes[3].innerText
            .replace(/,/g, "")
            .replace(/\n/g, " ")
        )
      )
    );

    // Evaluating and cleaning the Main Review and pushing it in reviews array
    reviews.push(
      await page.$$eval(".row.review-article", (els) =>
        els.map((el) =>
          el.childNodes[1].childNodes[3].childNodes[5].classList
            ? "Fake Review"
            : el.childNodes[1].childNodes[3].childNodes[9].innerText
                .replace(/,/g, "")
                .replace(/\n/g, " ")
        )
      )
    );
  }

  // Closing the headless brower
  await browser.close();

  // Converting the arrays into 1D
  titles = titles.flat(1);
  reviews = reviews.flat(1);

  // Converting into a table array to change into CSV
  const table = [["Main Title", "Full Review"]];
  for (let i = 0; i < titles.length; i++) {
    table.push(`${titles[i]},${reviews[i]}`);
  }

  // Converting table array into CSV File
  let csvContent = table.join("\n");
  fs.writeFile("./reviewData/disney-reviews.csv", csvContent, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Data converted into CSV file");
  });
})();
