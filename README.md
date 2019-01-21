# work in progress - this is not ready


# puppeteer-jest-example

Installing and using Puppeteer and Jest with a simple example starting from scratch.



## Windows Install

1. Open up an administrator command prompt and install Chocolatey
```
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

2. Install node.js
```
cinst nodejs
```

3. Close command prompt then open a fresh administrator command prompt

4. Install Puppeteer
```
node -v
npm -v
npm install puppeteer
```

4. Change to project dir, then Install Jest
```
npm install --save-dev jest-puppeteer jest
```

## Create a test
```
subl totaljobs.test.js
```

Copy-paste and save:
```javascript
describe('Totaljobs', () => {
	beforeAll(async () => {
		await page.goto('https://www.totaljobs.com');
	});

	it('should display "job ads" somewhere on the page', async () => {
		await expect(page).toMatch('job ads');
	});
});
```

```
npm init
```

package.json
```
{
  "name": "jtest",
  "version": "1.0.0",
  "description": "Jest test",
  "main": "totaljobs.test.js",
  "dependencies": {
    "jest": "^23.6.0",
    "jest-puppeteer": "^3.8.0",
    "puppeteer": "^1.11.0"
  },
  "devDependencies": {},
  "jest": {
        "preset": "jest-puppeteer"
  },
  "scripts": {
    "test": "jest"
  },
  "author": "",
  "license": "ISC"
}

```

## Run a test
```
npm run test
```

