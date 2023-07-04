import {expect, Locator, Page} from "@playwright/test";
import selectors from "./selectors.json";

export class HomePage {
    readonly page: Page;
    readonly headerLogo: Locator;
    readonly loginButton: Locator;
    readonly searchBar: Locator;
    readonly searchButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.headerLogo = page.locator(selectors.headerLogo);
        this.loginButton = page.locator(selectors.loginButton);
        this.searchBar = page.locator(selectors.searchBar);
        this.searchButton = page.locator(selectors.searchButton);
    }
    //Navigates to the moviedb homepage
    async goto() {
        await this.page.goto('https://www.themoviedb.org/');
    }

    async headerLogoToBeVisible() {
        await expect(this.headerLogo).toBeVisible();
    }

    async loginButtonToBeVisible(){
        await expect(this.loginButton).toBeVisible();
    }

    async waitForPageLoad(){
        await this.headerLogoToBeVisible();
        await this.loginButtonToBeVisible();
    }

    async fillSearchBar(text: string){
        await this.searchBar.fill(text);
    }

    async clickSearchButton(){
        await this.searchButton.click();
    }

    async searchForTerm(text:string){
        await this.fillSearchBar(text);
        await this.clickSearchButton();
    }
}
