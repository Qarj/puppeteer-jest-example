// search.test.js

jest.setTimeout(45000);

describe("AuthDE", () => {
    it("should enter login details", async () => {
        // launch browser for LHCI
        const page = await browser.newPage();
        await page.setUserAgent("Supertest and Cypress");
        await page.setViewport({ width: 1920, height: 1080 });
        const baseurl = "https://www.stepstone.de";
        const membersAreaUrl = `${baseurl}/membersarea`;
        const email = "lighthouse@example.com";
        const data2 = "ExamplePassword1";
        await page.goto(baseurl);

        await page.screenshot({ path: "01_initial_load.png", fullPage: true });

        await page.waitForFunction('document.querySelector("body").innerText.includes("Wir verwenden Cookies")');

        await page.screenshot({ path: "02_cookie_wall.png", fullPage: true });

        const [span] = await page.$x("//span[contains(., 'Alles akzeptieren')]");
        await span.click();

        await page.goto(membersAreaUrl);

        await page.waitForFunction('document.querySelector("body").innerText.includes("Eingeloggt bleiben")');

        const emailInput = await page.$('input[name="email"]');
        const data2Input = await page.$('input[name="password"]');
        await emailInput.type(email);
        await data2Input.type(data2);

        await page.screenshot({ path: "03_before_submit.png", fullPage: true });

        await Promise.all([page.click('button[type="submit"]'), page.waitForNavigation()]);

        await page.screenshot({ path: "04_immediately_after_submit.png", fullPage: true });

        await page.waitForFunction('document.querySelector("body").innerText.includes("Hier ist deine Jobsuche")');

        await page.screenshot({ path: "05_after_wait_members_area_text.png", fullPage: true });

        // close session for next run
        await page.close();
    });
});
