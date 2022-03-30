// advanced.test.js

jest.setTimeout(45000);
const fs = require("fs");

describe("Advanced", () => {
  beforeAll(async () => {
    const baseUrl = "https://www.totaljobs.com";

    await page.setViewport({ width: 1920, height: 1800 });
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
    await expect(page).toMatch("Sort by");
    await page.screenshot({ path: "advanced-search-results.png" });
  });

  it("should click on the sort options and select sort by date", async () => {
    const beforeHtml = await page.content();
    fs.writeFileSync("before-sorted-by-expand.html", beforeHtml);

    await expect(page).toClick('button[data-at="sorting-dropdown-button"]');
    const afterHtml = await page.content();
    fs.writeFileSync("after-sorted-by-expand.html", afterHtml);

    const [span] = await page.$x("//span[contains(., 'Published')]");
    if (span) {
      await span.click();
    }

    await page.screenshot({ path: "sorted-by-date.png" });
  });
});
