import { Builder, By, WebDriver } from "selenium-webdriver";
import { readFileSync } from "fs";
import * as path from "path";
import { HomePage } from "../core/page-objects/home-page";
import { LoginCreate } from "../core/page-objects/logincreate-page";

describe("Test Scenario 2: Test the Log in functionality on the Website", () => {
    let driver: WebDriver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser("chrome").build();
    });

    afterEach(async () => {
        await driver.quit();
    });

    it("should log in successfully", async () => {
        const homePage = new HomePage(driver);
        const loginCreatePage = new LoginCreate(driver);

        const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
        const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

        // Navigate to the home page
        await homePage.navigateTo(testData.url.home_page);
        expect(await homePage.getTitle()).toContain("Stradivarius");

        // Click on user account icon
        await homePage.clickUserAccountIcon();

        // After clicking on the user account icon, check if you are on the login page
        expect(await homePage.getTitle()).toContain("Log in");

        // Fill login details
        await loginCreatePage.fillInputField(loginCreatePage.getEmailInput(), testData.data.email);
        await loginCreatePage.fillInputField(loginCreatePage.getPasswordInput(), testData.credentials.password);

        // Click on sign in button
        await loginCreatePage.clickSignInButton();
        
    }, 15000);
});
