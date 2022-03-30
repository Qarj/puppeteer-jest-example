// search.test.js

jest.setTimeout(45000);

describe("Search", () => {
    it("should enter login details", async () => {
        // launch browser for LHCI
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        const baseurl = "https://www.totaljobs.com";
        const authurl = `${baseurl}/account/signin`;
        const membersAreaUrl = `${baseurl}/membersarea`;
        const email = "lighthouse@example.com";
        const data2 = "ExamplePassword1";
        await page.goto(authurl);

        const cookies = [
            {
                name: "CONSENTMGR",
                value: "consent:true",
            },
        ];

        await page.setCookie(...cookies);
        await page.goto(authurl);

        const emailInput = await page.$('input[id="Form_Email"]');
        const data2Input = await page.$('input[id="Form_Password"]');
        await emailInput.type(email);
        await data2Input.type(data2);

        const checkboxInput = await page.$('input[id="Form_RememberMe"]');
        await checkboxInput.click();

        await Promise.all([page.click('input[id="btnLogin"]'), page.waitForNavigation()]);

        await page.goto(membersAreaUrl);
        await expect(page).toMatch("Here is your job search at a glance", { timeout: 8000 });

        // close session for next run
        await page.close();
    });
});
