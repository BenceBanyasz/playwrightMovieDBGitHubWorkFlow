import {Locator, Page} from "@playwright/test";
import selectors from "./selectors.json";
import {Master} from '../master';

export class Authentication extends Master {
    readonly page: Page;
    readonly userNameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;

    constructor(page: Page, private username: string, private password: string, private loginUrl: string) {
        super(page)
        this.page = page;
        this.userNameField = page.locator(selectors.userNameField);
        this.passwordField = page.locator(selectors.passwordField);
        this.loginButton = page.locator(selectors.loginButton);
    }

    async login(): Promise<void> {
        if (!this.page) {
            throw new Error('Page is not initialized.');
        }

        try {
            await this.page.goto(this.loginUrl);
            await this.userNameField.fill(this.username);
            await this.passwordField.fill(this.password);
            await this.loginButton.click();
            await this.page.waitForURL(`**/${this.username}`, {waitUntil: 'domcontentloaded'});

            if(await this.userInfoButton.isVisible()){
                console.log('Authentication was successful.');
            } else {
                console.error('Authentication failed.');
            }
        } catch (error) {
            console.error(`An error occurred during authentication: ${error}`)
        }
    };
}
