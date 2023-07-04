import {test, chromium} from '@playwright/test';

test('Without fixtures', async () => {
  //Create a chrome browser
  const browser = await chromium.launch();

  //Create isolated context
  const context = await browser.newContext();

  //Create a page
  const page = await context.newPage();
  await page.goto('https://amazon.co.uk')

  //Use context to remove cookies
  console.log(await context.cookies());
  console.log('AFTER CLEAR');
  await context.clearCookies();
  console.log(await context.cookies());

  //Create another new isolated browser context
  //Create a new isolated context
  const context2 = await browser.newContext();
  const page2 = await context2.newPage();
  await page2.goto('https://google.com');

  //Make a request
  const req = await page.request.get("https://jsonplaceholder.typicode.com/todos/1");
  const res = await req.json();
  console.log(res);

  //Browser name
  //console.log(await browser._name);
});

test.only('With fixtures', async ({page, context, browser, request, browserName}) => {
  await page.goto('https://amazon.co.uk')

  //Use context to remove cookies
  console.log(await context.cookies());
  console.log('AFTER CLEAR');
  await context.clearCookies();
  console.log(await context.cookies());

  //Create another new isolated browser context
  //Create a new isolated context
  const context2 = await browser.newContext();
  const page2 = await context2.newPage();
  await page2.goto('https://google.com');

  //Make a request
  const req = await request.get("https://jsonplaceholder.typicode.com/todos/1");
  const res = await req.json();
  console.log(res);

  //Browser name
  console.log(await browserName);
});
