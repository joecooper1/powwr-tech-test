import { Page } from '@playwright/test';

export class LoginPage {
    page: Page;

    private selectors = {
        emailAddressInput: '//label[contains(text(), "E-Mail Address")]/following-sibling::input',
        passwordInput: '//label[contains(text(), "Password")]/following-sibling::input',
        loginButton: '//div[h2[contains(text(), "Returning Customer")]]//form//input[@type="submit"]',
        incorrectDetailsAlert: '//div[contains(text(), "Warning: No match for E-Mail Address and/or Password.")]'
    }

    constructor(page: Page) {
        this.page = page;
    }

    async enterEmailAddress(email: string) {
        await this.page.fill(this.selectors.emailAddressInput, email);
    }

    async enterPassword(password: string) {
        await this.page.fill(this.selectors.passwordInput, password);
    }

    async submitLoginForm() {
        await this.page.click(this.selectors.loginButton);
    }

    async isAlertVisible(timeout = 5000): Promise<boolean> {
        try {
            await this.page.waitForSelector(this.selectors.incorrectDetailsAlert, { state: 'visible', timeout });
            return true; // Alert is visible
        } catch (error) {
            return false; // Alert is not visible within the specified timeout
        }
    }
}