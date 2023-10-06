import {expect, Locator, Page} from "@playwright/test";
import selectors from "./selectors.json";
import {Master} from '../master';

export class SearchResultPage extends Master {
    readonly page: Page;
    readonly SearchResultItems: Locator;

    constructor(page: Page) {
        super(page)
        this.page = page;
        this.SearchResultItems = page.locator(selectors.searchResultItems);
    }


    async nthItem(nth: number){
        return await (this.SearchResultItems).locator(`nth=${nth}`);
    }
}
