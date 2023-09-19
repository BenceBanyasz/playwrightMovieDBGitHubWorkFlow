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

    async nthItemsTitleToBe(nth: number, text: string): Promise<void> {
        await expect((this.SearchResultItems).locator(`nth=${nth}`)).toHaveText(text);
    }
}
