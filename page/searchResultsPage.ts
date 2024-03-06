import { Page } from '@playwright/test';

export class SearchResultsPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    selectors = {
        searchQueryHeader: (searchQuery: string) => `//h1[contains(text(), "Search - ${searchQuery}")]`,
        searchResultItemName: (itemName: string) => `//h4//a[contains(text(), "${itemName}")]`,
        itemPrice: (itemName: string) => `//h4//a[contains(text(), "${itemName}")]/../following-sibling::div//span[@class="price-new"]`
    }

    async isSearchQueryHeaderVisible(searchQuery: string, timeout = 5000): Promise<boolean> {
        try {
            await this.page.waitForSelector(this.selectors.searchQueryHeader(searchQuery), { state: 'visible', timeout });
            return true; // Header is visible
        } catch (error) {
            return false; // Header is not visible within the specified timeout
        }
    }

    async isSearchResultItemVisible(itemName: string, timeout = 5000): Promise<boolean> {
        try {
            await this.page.waitForSelector(this.selectors.searchResultItemName(itemName), { state: 'visible', timeout });
            return true; // Item is visible
        } catch (error) {
            return false; // Item is not visible within the specified timeout
        }
    }

    async getItemPrice(itemName: string): Promise<string | null> {
        const itemPriceElement = await this.page.locator(this.selectors.itemPrice(itemName)).first(); // <<<<< I've included a note on this one
        if (itemPriceElement) {
            return await itemPriceElement.evaluate(input => (input as HTMLInputElement).textContent);
        }
        return null;
    }

    async clickSearchResultItem(itemName: string): Promise<void> {
        const searchResultItemLink = await this.page.locator(this.selectors.searchResultItemName(itemName)).first();
        await searchResultItemLink.click();
    }
}
