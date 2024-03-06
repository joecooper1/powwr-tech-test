import { Page } from '@playwright/test';

export class AccountPage {
    page: Page;

    private selectors = {
        myAccountLink: '//a[contains(text(), "My Account")]',
        editAccountLink: '//a[contains(text(), "Edit Account")]',
        inputSelector: (labelText: string) => `//div[label[contains(text(), "${labelText}")]]//input`,
        accountInfoHeading: '//h1[contains(text(), "My Account Information")]'
    };

    constructor(page: Page) {
        this.page = page;
    }

    async clickMyAccountLink() {
        await this.page.click(this.selectors.myAccountLink);
    }

    async isEditAccountLinkVisible(timeout = 5000): Promise<boolean> {
        try {
            await this.page.waitForSelector(this.selectors.editAccountLink, { state: 'visible', timeout });
            return true; // Link is visible
        } catch (error) {
            return false; // Link is not visible within the specified timeout
        }
    }

    async clickEditAccountLink() {
        await this.page.click(this.selectors.editAccountLink);
    }

    async isAccountInfoPageVisible(timeout = 5000): Promise<boolean> {
        try {
            await this.page.waitForSelector(this.selectors.accountInfoHeading, { state: 'visible', timeout });
            return true; // Heading is visible
        } catch (error) {
            return false; // Heading is not visible within the specified timeout
        }
    }

    async getInputValueByLabelText(labelText: string): Promise<string | null> {
        const inputElement = await this.page.locator(this.selectors.inputSelector(labelText));
        if (inputElement) {
            return await inputElement.evaluate(input => (input as HTMLInputElement).value);
        }
        return null;
    }
}