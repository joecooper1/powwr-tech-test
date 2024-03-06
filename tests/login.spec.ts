import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../page/homePage.ts';
import { LoginPage } from '../page/loginPage.ts';
import { AccountPage } from '../page/accountPage.ts';

test('User cannot login using incorrect details', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  // Navigate to homepage
  await homePage.navigateToHomePage();

  // Hover over the My Account dropdown and click login button
  await homePage.hoverOverMyAccountDropdown();
  await homePage.clickLoginButton();

  // Enter incorrect user details and submit
  await loginPage.enterEmailAddress("notrealemail@fake.com"); // In practice I would generate incorrect email addresses and passwords for this test.
  await loginPage.enterPassword("notarealpassword");
  await loginPage.submitLoginForm();

  // Check the alert is displayed
  expect(await loginPage.isAlertVisible()).toEqual(true); // A problem to be worked on here given more time - if you fail to login with the same email too many times in succession, it shows a different error message. Would need to auto-generate fake emails to do this test, and make a separate test to check the other error message.

  // Check the edit account link is not displayed
  expect(await accountPage.isEditAccountLinkVisible()).toEqual(false);
})

test('User can login using correct details, and view account details', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  // Navigate to homepage
  await homePage.navigateToHomePage();

  // Hover over the My Account dropdown and click login button
  await homePage.hoverOverMyAccountDropdown();
  await homePage.clickLoginButton();

  // Enter correct user details and submit
  await loginPage.enterEmailAddress("joecooper@fake.com"); // <<<<<< I would put these in ENV variables, not in the code!!!
  await loginPage.enterPassword("FakePassword");
  await loginPage.submitLoginForm();

  // Check the alert is not displayed
  expect(await loginPage.isAlertVisible()).toEqual(false);

  // Click Edit Account
  await accountPage.clickEditAccountLink(); // There's multiple ways to get to this screen, I have just picked one for the tech test but I would consider tests for other methods if they were considered important to the user experience.

  // Check the user details page is displayed
  expect(await accountPage.isAccountInfoPageVisible()).toEqual(true);

  // Check user details
  expect(await accountPage.getInputValueByLabelText("First Name")).toEqual("Joe"); // <<< I would also put these strings in a config file, and potentially even create another method here to reduce repitition
  expect(await accountPage.getInputValueByLabelText("Last Name")).toEqual("Cooper");
  expect(await accountPage.getInputValueByLabelText("E-Mail")).toEqual("joecooper@fake.com");
  expect(await accountPage.getInputValueByLabelText("Telephone")).toEqual("07123456789");
})