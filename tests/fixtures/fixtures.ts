import {test as base} from '@playwright/test';
import {HomePage} from '../pages/home-page/home-page';
import {SearchResultPage} from '../pages/search-result-list/search-result-page';
import {Authentication} from '../pages/login-page/login-page';
import urls from '../data/urls.json'
//import {getSecrets} from '../retrieve-aws-creds';
import {handler} from '../retrieve-aws-creds-ci';

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
        const username: string = (await handler()).username;
        const password: string = (await handler()).password;
        const loginUrl: string = urls.loginPage;
        await use(new Authentication(page, username, password, loginUrl));
    }
})
