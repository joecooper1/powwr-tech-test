## Introduction

This repository contains automated tests for LambdaTest website.

## Prerequisites

Before running the automated tests, ensure that you have the following prerequisites installed:

1. **Node.js and npm** - Install Node.js and npm from the official website: [Node.js](https://nodejs.org/).
2. **Playwright** - Install Playwright globally using npm:
   ```
   npm install -g @playwright/test
   ```

## Running the Tests
To run the automated tests, follow these steps:

1. **Clone the repository** to your local machine:
   ```
   git clone <repository_url>
   ```

2. **Navigate to the project directory**:
   ```
   cd powwr-tech-test
   ```

3. **Install project dependencies**:
   ```
   npm install
   ```

4. **Run the tests**:
   ```
   npx playwright test --ui
   ```


## Notes

### Testing Approach and Automation Strategy

For every project I always prioritise tests based on risk, which is a combination of a) How crucial is the test to the user-experience, and b) How likely is the thing to break. Since 100% coverage is impossible, you always have to decide what to test thoroughly and what to focus less on.

For automation specifically, the first of the two factors is the most important for me, as regression tests should focus on core features first to minimise impact on users. After that I look at features that are less siloed away and more dependent on multiple parts of the code or APIs, as these are more likely to break when new work goes in.

In automation I always try and write tests that will stand up to bad code but not to bad user experience, by which I mean I try to never use ids, test-ids, classes or anything else. The reason is that if a developer randomly changed a class name or id, the code might be bad but the product itself would still work the same, and the UI tests should only fail if it would result in loss of functionality or bad experience for the user. Sometimes this isn't possible, but in those cases I would implement them as a temporary solution, and then push for the product to be made better. I think the Lambdatest website has a few examples of this that I've listed below, in the Problems section.

### A few of the things I would change if I was doing it for real/had more time:

- I would extract the URLs, and any data like usernames, emails and passwords, into config files or ENV variables.
- I would have much better error-handling, with clearer error messages for failures, maybe using error matchers.
- I would think about what reporting we needed, but I would normally do this when integrating it into the CI process, so that I could discuss who would get the reports and what they would want out of them.
- I would implement different tests for mobile (I have only done tests for desktop), and possibly for other browsers if needed.
- There are multiple ways of doing certain things, like logging in, viewing account details, adding things to cart and viewing cart. I would decide (with other stakeholders) which ones are most important to the user experience, and which ones pose the most risk, and potentially create tests for the other methods too.
- I would also think about abstracting out some of the more universal methods, like the getInputValueByLabelText method which I put on the accountPage, as it would be useful across the app. Grouping up the processes that are used all time like logging in etc would also be worth doing.
- I would obviously add more tests around logging in and searching - I have only done a few here due to time constraints.
- I have also left comments at the end of some lines indicating where I would do things differently in a real situation.

### Problems with the tests:

The biggest problem with the tests I have implemented is the 'Search and Add to cart' one. Some of the issues are:
- The prices of items being variable - the prices could change a lot on this kind of website, verifying a particular price against a fixed value does not seem like a good test, unless the tests had access to live data that came from the same source as the data used to update prices online. Otherwise there would be multiple sources of truth, which could lead to false negatives/positives.
- There could be multiple items, the same or almost the same, with different prices. You would have to understand how the website is intended to work to understand how the tests should be run in this case.
- An item might be out-of-stock or unavailable, and the user can't add it to the cart. Again, would need to know more about the website to know how to build the tests.
- The name of the item might not be an exact match to the search term.
- The item might not be on the first page of search results - would need a system to check each page of results (unless the test was that the item should show up first of all results).
- Another problem for both tests is that there are multiple versions of both the Login and Add to Cart buttons, one for desktop and one for mobile, and Playwright needs to be explicitly told which one to press. Specifically for the 'Add to Cart' button, there are two buttons, one for desktop and one for mobile, but there is no obviously good way to distinguish them without using ids, which is bad practice, or classes. This is a problem with the bad design of the website ultimately, so for the tests to accomodate for that until a fix is done there has to be a slightly hacky solution.

### BDD Testing

I didn't implement BDD testing because I didn't have time, tbh. My last manageer loved BDD testing so we did start implementing cucumber in my last role in our playwright tests, and we got about half of them into the BDD format. At another interview I had recently though I mentioned BDD testing and the test manager spent 10 minutes telling me how BDD testing is the worst thing on Earth haha, and that it ruins automation, so now I don't know what to think.

### Other stuff:

There's a bug where I have use a --allow-importing-ts-extensions flag in the package.json. Not sure why but that was the fix I found in the time.