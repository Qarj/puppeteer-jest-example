# puppeteer-jest-example

Installing and using Puppeteer and Jest with a simple example.

## Setup a node tests project

From the same command terminal in folder `code/pj-demo`, create a `package.json` file

```sh
npm init
```

`test` command is `jest`, you can accept the other defaults or add some info

`package.json` will have content like this

```js
{
  "name": "pj-demo",
  "version": "1.0.0",
  "description": "puppeteer jest example",
  "main": "index.js",
  "scripts": {
    "test": "jest"
  },
  "author": "Qarj",
  "license": "ISC"
}
```

2. Install Jest and Puppeteer

```sh
npm install --save-dev jest-puppeteer puppeteer expect-puppeteer jest
```

`--save-dev` will update your `package.json` to indicate that these packages are development dependencies.

3. Modify `package.json`, some additional manual set-up is required

```sh
code package.json
```

Before the `"scripts"` line, insert:

```js
  "jest": {
    "preset": "jest-puppeteer",
    "setupFilesAfterEnv": ["expect-puppeteer"]
  },
```

package.json after edit will be similar to this

```javascript
{
  "name": "pj-demo",
  "version": "1.0.0",
  "description": "puppeteer jest example",
  "main": "index.js",
  "jest": {
    "preset": "jest-puppeteer",
    "setupFilesAfterEnv": ["expect-puppeteer"]
  },
  "scripts": {
    "test": "jest"
  },
  "author": "Qarj",
  "license": "ISC",
  "devDependencies": {
    "expect-puppeteer": "^3.5.1",
    "jest": "^24.0.0",
    "jest-puppeteer": "^3.9.0",
    "puppeteer": "^1.11.0"
  }
}
```

_Note: you can just create `package.json` as above without going through the `npm init` process._

## Create a simple test

From the same command terminal in folder `code/pj-demo`

```sh
code totaljobs.test.js
```

Copy-paste then save

```js
// totaljobs.test.js

jest.setTimeout(45000);

describe("Totaljobs", () => {
    beforeAll(async () => {
        await page.goto("https://www.totaljobs.com");
    });

    it('should display "job ads" somewhere on the page', async () => {
        await expect(page).toMatch("job ads");
    });
});
```

The Jest timeout defaults to 5000 ms which might be fine for unit style tests, but is too
low for web testing where there are third party dependencies and banner ads, so we raise it.

## Run the simple test

From the same command terminal in folder `code/pj-demo`

```sh
npm run test
```

Example output

```txt
C:\code\pj-demo>npm run test

> pj-demo@1.0.0 test C:\code\pj-demo
> jest

 PASS  ./totaljobs.test.js (5.824s)
  Totaljobs
    √ should display "job ads" somewhere on the page (24ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        5.926s
Ran all test suites.

C:\code\pj-demo>
```

## Turn off headless mode

Turning off headless tends to make the tests more stable, and helps debugging.

```sh
code jest-puppeteer.config.js
```

Copy paste

```js
module.exports = {
    launch: {
        dumpio: true,
        headless: process.env.HEADLESS === "false",
        args: [`--window-size=1920,1080`],
    },
    browserContext: "default",
};
```

You will see Chromium appear when you run the test this time

```sh
npm run test
```

## Write another test to fill a form and submit

```sh
code search.test.js
```

```javascript
// search.test.js

jest.setTimeout(45000);

describe("Search", () => {
    beforeAll(async () => {
        const baseUrl = "https://www.totaljobs.com";

        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(baseUrl, { waitUntil: "networkidle2" });

        const cookies = [
            {
                name: "CONSENTMGR",
                value: "consent:true",
            },
        ];

        await page.setCookie(...cookies);
        await page.goto(baseUrl, { waitUntil: "networkidle2" });
    });

    it('should display "job ads" somewhere on the page', async () => {
        await expect(page).toMatch("job ads", { timeout: 8000 });
    });

    it("should fill out the search form", async () => {
        await expect(page).toFillForm('form[action="/onsitesearch"]', {
            Keywords: "Automation Test Engineer",
            LTxt: "London",
        });
    });

    it("should submit the search", async () => {
        await expect(page).toClick('input[type="submit"]');
    });

    it("should then display the search results", async () => {
        await page.waitForNavigation({ waitUntil: "domcontentloaded" });
        await expect(page).toMatch("Sort by");
    });
});
```

```sh
npm run test search
```

`{ waitUntil: 'networkidle2' }` waits until there are no more than 2 network connections for 500ms.
This setting is useful to keep the test moving along when waiting for slow responding
third party content.

Note also we set the view port at the start of the test to match the window size.

## Write a test to submit an advanced search and sort the results

The final example expands the search options then waits for it to be visible.

It sets drop down values, and takes a screenshot before submitting the search.

When the search results display another screenshot is taken.

The search results DOM is also saved. The sort order option is clicked which
changes the DOM via JavaScript. The DOM is saved again so we can see the difference.

Finally, a new sort order is selected and we take a final screenshot proving the
new sort results loaded.

All this is done without any unconditional waits.

```sh
code advanced.test.js
```

```js
// advanced.test.js

jest.setTimeout(45000);
const fs = require("fs");

describe("Advanced", () => {
    beforeAll(async () => {
        await page.setViewport({ width: 1266, height: 1000 });
        await page.goto("https://www.totaljobs.com", { waitUntil: "networkidle2" });
    });

    it('should display "job ads" somewhere on the page', async () => {
        await expect(page).toMatch("job ads", { timeout: 8000 });
    });

    it("should fill out What and Where", async () => {
        await expect(page).toFillForm('form[action="/onsitesearch"]', {
            Keywords: "Automation Test Engineer",
            LTxt: "London",
        });
    });

    it("should show more options", async () => {
        await expect(page).toClick('button[id="more-options-toggle"]');
        await page.waitForSelector('label[id="salaryButtonHourly"]', {
            visible: true,
        });
    });

    it("should select 0 miles radius", async () => {
        await page.select('select[name="Radius"]', "0");
    });

    it("should select Hourly salary rate of 50 pounds", async () => {
        await expect(page).toClick('label[id="salaryButtonHourly"]');
        await page.select('select[id="salaryRate"]', "50");
    });

    it("should select Contract job type", async () => {
        await page.select('select[id="JobType"]', "20");
    });

    it("should select Recruiter Type of Agency", async () => {
        await expect(page).toClick('label[id="recruiterTypeButtonAgency"]');
        await page.screenshot({ path: "advanced-search-form-complete.png" });
    });

    it("should submit the search", async () => {
        await expect(page).toClick('input[type="submit"]');
    });

    it("should then display the search results", async () => {
        await page.waitForNavigation({ waitUntil: "domcontentloaded" });
        await expect(page).toMatch("Explore results");
        await page.screenshot({ path: "advanced-search-results.png" });
    });

    it("should click on the sort options and select sort by date", async () => {
        const beforeHtml = await page.content();
        fs.writeFileSync("before-sorted-by-expand.html", beforeHtml);

        await expect(page).toClick('button[data-toggle="dropdown"]');
        const afterHtml = await page.content();
        fs.writeFileSync("after-sorted-by-expand.html", afterHtml);

        await page.waitForSelector('a[href*="Sort=2"]');
        await expect(page).toClick('a[href*="Sort=2"]', {
            waitUntil: "networkidle2",
        });
        await page.waitForFunction("document.querySelector('button[data-toggle=\"dropdown\"]') != null");
        await page.waitForFunction("document.querySelector('button[data-toggle=\"dropdown\"]').getAttribute('aria-expanded') === \"false\"");
        await page.screenshot({ path: "sorted-by-date.png" });
    });
});
```

```sh
npm run test advanced
```

Also

```sh
npm run test authtj
npm run test authde
```

# References

https://github.com/smooth-code/jest-puppeteer
https://dev.to/aalises/dealing-with-asynchrony-when-writing-end-to-end-tests-with-puppeteer--jest-n37
https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
