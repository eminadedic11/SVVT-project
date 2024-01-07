import { Builder, WebDriver } from "selenium-webdriver";
import { readFileSync } from "fs";
import * as path from "path";
import { HomePage } from "../core/page-objects/home-page";
import { LoginCreate } from "../core/page-objects/logincreate-page";
import { ShoppingCartPage } from "../core/page-objects/shopping-cart-page";
import { CheckoutPage } from "../core/page-objects/checkout-page";
import { MyAccountPage } from "../core/page-objects/my-account-page";

describe("Test Scenario 6: Test the Checkout process", () => {
    let driver: WebDriver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser("chrome").build();
    });

    afterEach(async () => {
        await driver.quit();
    });

    test("should complete the checkout process", async () => {
        const homePage = new HomePage(driver);
        const loginCreatePage = new LoginCreate(driver);
        const shoppingCartPage = new ShoppingCartPage(driver);
        const checkoutPage = new CheckoutPage(driver);
        const myAccountPage = new MyAccountPage(driver);

        const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
        const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

        // Step 1: Log in
        await homePage.navigateTo(testData.url.home_page);
        expect(await homePage.getTitle()).toContain("Stradivarius");

        await homePage.clickUserAccountIcon();
        expect(await homePage.getTitle()).toContain("Log in");

        await loginCreatePage.fillInputField(loginCreatePage.getEmailInput(), testData.data.email);
        await loginCreatePage.fillInputField(loginCreatePage.getPasswordInput(), testData.credentials.password);

        await loginCreatePage.clickSignInButton();

        await driver.sleep(1000)

           // Wait for My Account page to be visible
   
           // Check if we are on the correct URL
        //const expectedUrl = "https://www.stradivarius.com/ba/en/my-account.html#/orders/online";
        //const currentUrl = await driver.getCurrentUrl();
        //expect(currentUrl).toBe(expectedUrl);
        // Step 2: Navigate to the cart
        await homePage.selectCart();

        // Verify that the shopping cart is open
        expect(await shoppingCartPage.isShoppingCartPageAccessible()).toBeTruthy();

        // Step 3: Click on the Process order option
        // (Assuming there is a button for processing the order in the shopping cart)
        await shoppingCartPage.clickProcessOrderButton();

        // Verify that the address entry page is opened
        expect(await checkoutPage.isCheckoutPageAccessible()).toBeTruthy();

        // Step 4: Enter an address (assuming there is a method for entering an address)
        await checkoutPage.enterAddress(testData.address);

        // Verify that the map with the indicated location is open
        expect(await checkoutPage.isMapDisplayed()).toBeTruthy();

        // Step 5: Choose option Pickup in Store or Home Delivery
        // (Assuming there is a method for choosing the delivery option)
        await checkoutPage.chooseDeliveryOption(testData.deliveryOption);

        // Verify that the Choose a payment method page is open
        expect(await checkoutPage.isPaymentMethodPageVisible()).toBeTruthy();

        // Additional verification or actions can be added as needed for your specific scenario
    }, 30000); // Adjust the timeout as needed
});
