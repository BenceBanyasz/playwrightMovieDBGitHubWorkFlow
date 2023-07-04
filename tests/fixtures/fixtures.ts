import {test as base} from '@playwright/test';
import {HomePage} from '../pages/home-page/home-page';
import {SearchResultPage} from '../pages/search-result-list/search-result-page';

export const test = base.extend<{
    homePage: HomePage;
    searchResultPage: SearchResultPage;
}>({
    homePage: async({page}, use) => {
        await use(new HomePage(page));
    },
    searchResultPage: async({page}, use) => {
        await use(new SearchResultPage(page));
    }
})
