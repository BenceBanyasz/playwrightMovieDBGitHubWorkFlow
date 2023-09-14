import {test} from './fixtures/fixtures';

test.describe('unauthenticated UI tests for movieDB', () => {
    test.beforeEach(async ({homePage}) => {
        await homePage.gotoMainPage();
    });

    test('movieDB user scenario tests with fixtures', async ({homePage, searchResultPage}) => {
        await homePage.searchForTerm('Matrix');
        await searchResultPage.nthItemsTitleToBe(1,'Matrix');
    });

    test('movieDB logo and login button should be visible in header', async({homePage}) => {
        await homePage.headerLogoToBeVisible();
        await homePage.toLoginPageToBeVisible();
    })
});

test.describe('authenticated UI tests for movieDB', () => {
    test.beforeEach(async({authentication,homePage}) => {
        await authentication.login();
        await homePage.gotoMainPage();
    });

    test('movieDB user scenario tests with fixtures', async ({homePage, searchResultPage}) => {
        await homePage.searchForTerm('Matrix');
        await searchResultPage.nthItemsTitleToBe(1,'Matrix');
    });

    test('movieDB logo and userinfo button should be visible in header', async ({homePage}) => {
        await homePage.headerLogoToBeVisible();
        await homePage.userInfoButtonToBeVisible();
    });
});
