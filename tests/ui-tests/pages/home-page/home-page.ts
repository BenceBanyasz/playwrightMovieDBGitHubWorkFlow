import {Locator, Page} from "@playwright/test";
import selectors from "./selectors.json";
import {Master} from '../master';

export class HomePage extends Master {
    readonly page: Page;
    readonly searchBar: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        super(page)
        this.page = page;
        this.searchBar = page.locator(selectors.searchBar);
        this.searchButton = page.locator(selectors.searchButton);
    }

    async fillSearchBar(text: string): Promise<void> {
        await this.searchBar.fill(text);
    }

    async clickSearchButton(): Promise<void> {
        await this.searchButton.click();
    }

    async searchForTerm(text: string): Promise<void> {
        await this.fillSearchBar(text);
        await this.clickSearchButton();
    }
}
