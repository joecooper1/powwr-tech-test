import { Page } from '@playwright/test';

export class HomePage {
    page: Page;
    url: string;

    private selectors = {
        myAccountDropdown: '//ul[contains(@class, "horizontal")]//li//div/span[contains(text(), "My account")]',
        loginButton: '//div//span[contains(text(), "Login")]',
        searchInput: '//input[@placeholder="Search For Products"]',
        searchButton: '//button[contains(text(), "Search")]',
        cartIcon: '//div[contains(@class, "cart-icon")]',
        itemInCartPopup: (itemName: string) => `//h5[contains(text(), "Cart")]/following-sibling::div//a[contains(text(), "${itemName}")]`
    }

    constructor(page: Page) {
        this.page = page;
        this.url = 'https://ecommerce-playground.lambdatest.io/index.php?route=common/home'; // I would keep this in a config file in practice
    }

    async navigateToHomePage() {
        await this.page.goto(this.url);
    }

    async hoverOverMyAccountDropdown() {
        // Hover over the "My Account" dropdown
        await this.page.hover(this.selectors.myAccountDropdown);
        
        // Wait for the login button to become visible
        await this.page.waitForSelector(this.selectors.loginButton, { state: 'visible' });
    }

    async clickLoginButton() {
        await this.page.click(this.selectors.loginButton);
    }

    async searchByTextInput(text: string) {
        await this.page.fill(this.selectors.searchInput, text);
        await this.page.click(this.selectors.searchButton);
    }

    async clickCartIcon(): Promise<void> {
        const cartIcon = await this.page.locator(this.selectors.cartIcon).first();
        await cartIcon.click();
    }

    async isItemInCartPopupVisible(itemName: string, timeout = 5000): Promise<boolean> {
        try {
            await this.page.waitForSelector(this.selectors.itemInCartPopup(itemName), { state: 'visible', timeout });
            return true; // Item is visible
        } catch (error) {
            return false; // Item is not visible within the specified timeout
        }
    }
}