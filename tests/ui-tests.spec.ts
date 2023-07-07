import {test} from './fixtures/fixtures';
import {HomePage} from './pages/home-page/home-page'
import {SearchResultPage} from './pages/search-result-list/search-result-page';
import {expect} from '@playwright/test';

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

test('movieDB ui tests without fixtures', async ({page}) => {
    await page.goto('https://www.themoviedb.org/');
    await expect(page.locator('.logo img')).toBeVisible();
    await expect(page.locator('li a[href="/login"]')).toBeVisible();
    await page.locator('#inner_search_v4').fill('Matrix');
    await page.locator('#inner_search_form input[type="submit"]').click();
    await expect(page.locator('div[id^=card_tv] h2').locator('nth=0')).toHaveText('Matrix')
});

test('movieDB ui tests with POM', async({page}) => {
    const homePage = new HomePage(page);
    const searchResultPage = new SearchResultPage(page);
    await homePage.goto();
    await homePage.waitForPageLoad();
    await homePage.searchForTerm('Matrix');
    await searchResultPage.nthItemsTitleToBe(1,'Matrix')
})

test('movieDB ui tests with fixtures', async ({homePage, searchResultPage}) => {
    await homePage.goto();
    await homePage.waitForPageLoad();
    await homePage.searchForTerm('Matrix');
    await searchResultPage.nthItemsTitleToBe(1,'Matrix');
    await sleep(5000)
})
