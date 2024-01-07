import { Builder, By, WebDriver } from "selenium-webdriver";
import { readFileSync } from "fs";
import * as path from "path";
import { HomePage } from "../core/page-objects/home-page";
import { LoginCreate } from "../core/page-objects/logincreate-page";

describe("Test Scenario 3: Test the Product search functionality", () => {
    let driver: WebDriver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser("chrome").build();
    });

    afterEach(async () => {
        await driver.quit();
    });

    test("should search for ankle boots successfully", async () => {
        const homePage = new HomePage(driver);
    
        const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
        const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));
    
        await homePage.navigateTo(testData.url.home_page);
       expect(await homePage.getTitle()).toContain("Stradivarius");

       await homePage.enterSearchQuery("Ankle boots");
       await homePage.sleep(3000);
    
    }, 30000);
    
});
