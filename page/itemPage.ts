import { Page } from '@playwright/test';

export class ItemPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    selectors = {
        itemNameHeader: (itemName: string) => `//h1[contains(text(), "${itemName}")]`,
        addToCartButton: '//button[contains(translate(text(), "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "add to cart")]'
    };

    async isItemNameVisible(itemName: string, timeout = 5000): Promise<boolean> {
        try {
            await this.page.waitForSelector(this.selectors.itemNameHeader(itemName), { state: 'visible', timeout });
            return true; // Item name is visible
        } catch (error) {
            return false; // Item name is not visible within the specified timeout
        }
    }

    async clickAddToCartButton(): Promise<void> {
        const addToCartButton = await this.page.locator(this.selectors.addToCartButton).nth(1); // I have used this hacky solution, left a note on it in the README
        await addToCartButton.click();
    }
}
