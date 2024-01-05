import { Builder, By, WebDriver } from "selenium-webdriver";
import { readFileSync } from "fs";
import * as path from "path";
import { HomePage } from "../core/page-objects/home-page";
import { LoginCreate } from "../core/page-objects/logincreate-page";
import AccountCreationPage from "../core/page-objects/accountCreationPage";

describe("Test Scenario 1: Create Account Functionality", () => {
    let driver: WebDriver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser("chrome").build();
    });

    afterEach(async () => {
        await driver.quit();
    });

    it("should create an account successfully", async () => {
        const homePage = new HomePage(driver);
        const accountCreationPage = new AccountCreationPage(driver);
        const loginCreatePage = new LoginCreate(driver);

        const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
        const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

        // Navigate to the home page
        await homePage.navigateTo(testData.url.home_page);
        expect(await homePage.getTitle()).toContain("Stradivarius");

        // Click on user account icon
        await homePage.clickUserAccountIcon();

        // After clicking on the user account icon, check if you are on the login page
        expect(await loginCreatePage.getTitle()).toContain("Log in");

        // Click on create account button
        await loginCreatePage.clickCreateAccountButton();

        // After clicking the "Create Account" button, check if you are on the account creation page
        expect(await accountCreationPage.getTitle()).toContain("Log in");

        // Fill account details
        await accountCreationPage.fillAccountDetails(
            testData.credentials.name,
            testData.credentials.last_name,
            testData.data.email,
            testData.credentials.password,
            testData.credentials.telephone_number
        );

        // Click on create account button
        await accountCreationPage.clickCreateAccountButton();

    
    }, 15000);
});