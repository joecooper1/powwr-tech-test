import { test, expect } from '@playwright/test';
import { HomePage } from '../page/homePage.ts';
import { LoginPage } from '../page/loginPage.ts';
import { AccountPage } from '../page/accountPage.ts';
import { SearchResultsPage } from '../page/searchResultsPage.ts';
import { ItemPage } from '../page/itemPage.ts';

test('User can login using correct details, search for an item and add it to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const itemPage = new ItemPage(page);

    const searchQuery = "HTC Touch HD"; // <<< I would put these things in a config file
    const expectedItemPrice = "$146.00";
    const itemName = "HTC Touch HD"; // <<< This would be a separate variable in theory, as not all items and search terms will match (though they do in this case)
  
    // Navigate to homepage
    await homePage.navigateToHomePage();
  
    // Hover over the My Account dropdown and click login button
    await homePage.hoverOverMyAccountDropdown();
    await homePage.clickLoginButton();
  
    // Enter correct user details and submit
    await loginPage.enterEmailAddress("joecooper@fake.com"); // <<<<<< I would put these in ENV variables, not in the code!!!
    await loginPage.enterPassword("FakePassword");
    await loginPage.submitLoginForm();
  
    // Check the edit account link is displayed
    expect(await accountPage.isEditAccountLinkVisible()).toEqual(true);

    // Search for item
    await homePage.searchByTextInput(searchQuery);
    
    // Check the search results have loaded
    expect(await searchResultsPage.isSearchQueryHeaderVisible(searchQuery)).toEqual(true);

    // Find the item
    expect(await searchResultsPage.isSearchResultItemVisible(itemName)).toEqual(true);

    // Confirm the price
    expect(await searchResultsPage.getItemPrice(itemName)).toEqual(expectedItemPrice);

    // Click on item and add it to cart
    await searchResultsPage.clickSearchResultItem(itemName);
    expect(await itemPage.isItemNameVisible(itemName)).toEqual(true);
    await itemPage.clickAddToCartButton();

    // Go to cart
    await homePage.clickCartIcon();

    // Check the item is in the cart
    expect(await homePage.isItemInCartPopupVisible(itemName)).toEqual(true);
  })