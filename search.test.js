// search.test.js

jest.setTimeout(45000);

describe("Search", () => {
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
