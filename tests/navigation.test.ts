import { Builder, By, WebDriver } from "selenium-webdriver";
import { readFileSync } from "fs";
import * as path from "path";
import { HomePage } from "../core/page-objects/home-page";

describe("Test Scenario 4: Test the Product Category Navigation", () => {
    let driver: WebDriver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser("chrome").build();
    });

    afterEach(async () => {
        await driver.quit();
    });

    it("should navigate to the Dresses category successfully", async () => {
        const homePage = new HomePage(driver);

        const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
        const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

        // Navigate to the home page
        await homePage.navigateTo(testData.url.home_page);
        expect(await homePage.getTitle()).toContain("Stradivarius");

        // Click on the navigation bar icon
        await homePage.clickNavigationBarIcon();
        await homePage.waitForElement(homePage.getNavigationBar(), 5000);


        // Check if the navigation bar is open
        expect(await homePage.isNavigationBarOpen()).toBeTruthy();

        // Select the "Clothing" option
        await homePage.selectNavigationBarOption1("Clothing");

        // Check if more options are loaded
        await homePage.isNavigationBarOption2Open();

        // Select the "Dresses" option
        await homePage.selectNavigationBarOption2("Dresses");

        // Check if the page with all dresses is open
        const expectedUrl = "https://www.stradivarius.com/ba/en/women/clothing/dresses-n1995";
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toBe(expectedUrl);
        
    }, 30000);
});
