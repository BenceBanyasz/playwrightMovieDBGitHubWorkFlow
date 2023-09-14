import {expect, Locator, Page} from "@playwright/test";
import selectors from "./common/selectors.json";
import urls from '../data/urls.json';

export class Master {
    readonly page: Page;
    readonly headerLogo: Locator;
    readonly toLoginPage: Locator;
    readonly userInfoButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerLogo = page.locator(selectors.headerLogo);
        this.toLoginPage = page.locator(selectors.toLoginPage);
        this.userInfoButton = page.locator(selectors.userInfoButton);
    }

    async gotoMainPage() {
        await this.page.goto(urls.homePage);
    }

    async headerLogoToBeVisible() {
        await expect(this.headerLogo).toBeVisible();
    }

    async toLoginPageToBeVisible() {
        await expect(this.toLoginPage).toBeVisible();
    }

    async userInfoButtonToBeVisible() {
        await expect(this.userInfoButton).toBeVisible();
    }
}
