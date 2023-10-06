import { expect } from '@playwright/test';
import {test} from '../fixtures/fixtures';
import labels from './data/labels.json';

test.describe('unauthenticated UI tests for movieDB', () => {
    test.beforeEach(async ({homePage}) => {
        await homePage.gotoMainPage();
    });

    test(`executed search should have the title "${labels.matrix}"`, async ({homePage, searchResultPage}) => {
        await homePage.searchForTerm(labels.matrix);
        const nthItem = await searchResultPage.nthItem(1);
        expect(nthItem).toHaveText(labels.matrix);
    });

    test('movieDB logo and login button should be visible in header', async ({homePage}) => {
        await homePage.headerLogoToBeVisible();
        await homePage.toLoginPageToBeVisible();
    })
});

test.describe('authenticated UI tests for movieDB', () => {
    test.beforeEach(async ({authentication, homePage}) => {
        await authentication.login();
        await homePage.gotoMainPage();
    });

    test(`executed search should have the title "${labels.matrix}"`, async ({homePage, searchResultPage}) => {
        await homePage.searchForTerm(labels.matrix);
        const nthItem = await searchResultPage.nthItem(1);
        expect(nthItem).toHaveText(labels.matrix);
    });

    test('movieDB logo and userinfo button should be visible in header', async ({homePage}) => {
        await homePage.headerLogoToBeVisible();
        await homePage.userInfoButtonToBeVisible();
    });
});
