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
