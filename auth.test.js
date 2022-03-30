// search.test.js

jest.setTimeout(45000);

describe("Search", () => {
  it("should enter login details", async () => {
    // launch browser for LHCI
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    const url = "https://www.totaljobs.com/account/signin";
    const email = "lighthouse@example.com";
    const data2 = "ExamplePassword1";
    await page.goto(url);

    const cookies = [
      {
        name: "CONSENTMGR",
        value: "consent:true",
      },
    ];

    await page.setCookie(...cookies);
    await page.goto(url);

    const emailInput = await page.$('input[id="Form_Email"]');
    const data2Input = await page.$('input[id="Form_Password"]');
    await emailInput.type(email);
    await data2Input.type(data2);

    await Promise.all([
      page.click('input[id="btnLogin"]'),
      page.waitForNavigation(),
    ]);

    // close session for next run
    await page.close();
  });
});
