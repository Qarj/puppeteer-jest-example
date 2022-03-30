// search.test.js

jest.setTimeout(45000);

describe("Search", () => {
    it("should enter login details", async () => {
        // launch browser for LHCI
        const page = await browser.newPage();
        await page.setUserAgent("WebInject and Selenium");
        await page.setViewport({ width: 1920, height: 1080 });
        const baseurl = "https://www.totaljobs.com";
        const membersAreaUrl = `${baseurl}/membersarea`;
        const email = "lighthouse@example.com";
        const data2 = "ExamplePassword1";
        await page.goto(baseurl);

        await page.screenshot({ path: "01_initial_load.png", fullPage: true });

        await page.waitForFunction('document.querySelector("body").innerText.includes("We use cookies")');

        await page.screenshot({ path: "02_cookie_wall.png", fullPage: true });

        const [span] = await page.$x("//span[contains(., 'Accept All')]");
        if (span) {
            await span.click();
        }

        await page.goto(membersAreaUrl);

        await page.waitForFunction('document.querySelector("body").innerText.includes("Jobseeker sign in")');

        const emailInput = await page.$('input[id="Form_Email"]');
        const data2Input = await page.$('input[id="Form_Password"]');
        await emailInput.type(email);
        await data2Input.type(data2);

        const checkboxInput = await page.$('input[id="Form_RememberMe"]');
        await checkboxInput.click();

        await page.screenshot({ path: "03_before_submit.png", fullPage: true });

        await Promise.all([page.click('input[id="btnLogin"]'), page.waitForNavigation()]);

        await page.screenshot({ path: "04_immediately_after_submit.png", fullPage: true });

        await page.waitForFunction('document.querySelector("body").innerText.includes("Here is your job search at a glance")');

        await page.screenshot({ path: "05_after_wait_members_area_text.png", fullPage: true });

        // close session for next run
        await page.close();
    });
});
