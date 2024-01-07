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

    test("should navigate to the Dresses category successfully", async () => {
        const homePage = new HomePage(driver);

        const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
        const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

        await homePage.navigateTo(testData.url.home_page);
        expect(await homePage.getTitle()).toContain("Stradivarius");

        await homePage.clickNavigationBarIcon();
        await homePage.waitForElement(homePage.getNavigationBar(), 5000);


        expect(await homePage.isNavigationBarOpen()).toBeTruthy();

        await homePage.selectNavigationBarOption1("Clothing");

        await homePage.isNavigationBarOption2Open();

        await homePage.selectNavigationBarOption2("Dresses");

        const expectedUrl = "https://www.stradivarius.com/ba/en/women/clothing/dresses-n1995";
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toBe(expectedUrl);
        
    }, 30000);
});
