require("dotenv").config();
import { APIRequestContext, request, test as base } from "@playwright/test";
import { HomePage } from "../ui-tests/pages/home-page/home-page";
import { SearchResultPage } from "../ui-tests/pages/search-result-list/search-result-page";
import { Authentication } from "../ui-tests/pages/login-page/login-page";
import urls from "../ui-tests/data/urls.json";

//Declare types of fixtures created
type MyFixtures = {
    homePage: HomePage;
    searchResultPage: SearchResultPage;
    authentication: Authentication;
    requestContext: APIRequestContext;
};

//Extend the base test by creating new fixtures that can be used in multiple test files across the repository
export const test = base.extend<MyFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    searchResultPage: async ({ page }, use) => {
        await use(new SearchResultPage(page));
    },
    authentication: async ({ page }, use) => {
        const username = process.env.MOVIEDB_USERNAME;
        const password = process.env.MOVIEDB_PASSWORD;
        const loginUrl: string = urls.loginPage;
        await use(new Authentication(page, username, password, loginUrl));
    },
    requestContext: async ({}, use) => {
        const moviedbAccessToken: string | undefined = process.env.MOVIEDB_ACCESS_TOKEN;
        const requestContext: APIRequestContext = await request.newContext({
            baseURL: urls.apiUrl,
            extraHTTPHeaders: {
                Authorization: `Bearer ${moviedbAccessToken}`,
            },
        });

        await use(requestContext);
    },
});
