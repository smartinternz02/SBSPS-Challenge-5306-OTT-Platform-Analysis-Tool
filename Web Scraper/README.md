## Web Scraper

The Web scraper is created using **Puppeteer**. Puppeteer is a web automation tool and we used it to go through a given number of paginated web pages and extract the reviews and title of reviews.

File Structure of the UI:

`package.json`: It contains all the meta data and the dependency data related to the scraper.

`reviewData Folder`: This folder contains all the review data collected for each OTT after running the scraping script.

`index.js`: This file is the main scraping script. It is a simple script which uses puppeteer and native APIs of node.js to extract the review data.
