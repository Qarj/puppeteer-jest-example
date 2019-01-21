# puppeteer-jest-example

Installing and using Puppeteer and Jest with a simple example.

The instructions here will work on a newly built desktop without node, jest or puppeteer already installed.

Time needed: 5 minutes max


## Windows Install

1. Open up an administrator command prompt and install Chocolatey
```batch
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

2. Install node.js
```batch
choco install nodejs
```

3. Install notepad++
```batch
choco install notepadplusplus
```

4. Close command prompt then open a fresh administrator command prompt

5. Create a folder for this example project
```batch
cd /
mkdir code
mkdir code\pj-demo
cd /code/pj-demo
```

6. Check node and npm versions
```batch
node -v
npm -v
```

7. Install Jest and Puppeteer
```batch
npm install --save-dev jest-puppeteer puppeteer jest
```

## Create a test

1. From the same command prompt in folder `/code/pj-demo`

```batch
start notepad++ totaljobs.test.js
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

2. Create a package.json file

```batch
npm init
```

test command is `jest`, accept other defaults

package.json will have content like this
```javascript
{
  "name": "pj-demo",
  "version": "1.0.0",
  "description": "puppeteer jest example",
  "main": "totaljobs.test.js",
  "dependencies": {
    "jest": "^23.6.0",
    "jest-puppeteer": "^3.8.0",
    "puppeteer": "^1.11.0"
  },
  "devDependencies": {},
  "scripts": {
    "test": "jest"
  },
  "author": "Qarj",
  "license": "ISC"
}

```

3. Modify package.json

```batch
start notepad++ package.json
```

Before the `"scripts"` line, insert:
```javascript
  "jest": {
        "preset": "jest-puppeteer"
  },
```

package.json after edit example
```javascript
{
  "name": "pj-demo",
  "version": "1.0.0",
  "description": "puppeteer jest example",
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
  "author": "Qarj",
  "license": "ISC"
}
```


## Run the example test

1. From the same command prompt in folder `/code/pj-demo`

```batch
npm run test
```

Example output
```
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

Due to short default time outs, it might not pass until the second time your run it.
