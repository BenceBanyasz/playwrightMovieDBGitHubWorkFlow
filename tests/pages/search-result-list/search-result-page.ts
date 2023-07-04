import {expect, Locator, Page} from "@playwright/test";
import selectors from "./selectors.json";

export class SearchResultPage {
    readonly page: Page;
    readonly SearchResultItems: Locator;

    constructor(page: Page){
        this.page = page;
        this.SearchResultItems = page.locator(selectors.searchResultItems);
    }

    async nthItemsTitleToBe(nth: number, text: string){
        await expect((this.SearchResultItems).locator(`nth=${nth}`)).toHaveText(text);
    }
}
