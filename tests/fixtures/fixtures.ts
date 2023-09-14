require('dotenv').config();
import {test as base} from '@playwright/test';
import {HomePage} from '../pages/home-page/home-page';
import {SearchResultPage} from '../pages/search-result-list/search-result-page';
import {Authentication} from '../pages/login-page/login-page';
import urls from '../data/urls.json'

export const test = base.extend<{
    homePage: HomePage;
    searchResultPage: SearchResultPage;
    authentication: Authentication;
}>({
    homePage: async({page}, use) => {
        await use(new HomePage(page));
    },
    searchResultPage: async({page}, use) => {
        await use(new SearchResultPage(page));
    },
    authentication: async({page}, use) => {
        const username = process.env.MOVIEDB_USERNAME;
        const password = process.env.MOVIEDB_PASSWORD;
        const loginUrl = urls.loginPage;
        await use(new Authentication(page, username, password, loginUrl));
    }
})
