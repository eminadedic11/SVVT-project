import { Builder, By, WebDriver } from "selenium-webdriver";
import { readFileSync } from "fs";
import * as path from "path";
import { HomePage } from "../core/page-objects/home-page";
import { ClothesPage } from "../core/page-objects/clothes-page";
import { ProductDetailsPage2 } from "../core/page-objects/product-details2-page";

describe("Product Selection and Verification Test", () => {
    let driver: WebDriver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser("chrome").build();
    });

    afterEach(async () => {
        await driver.quit();
    });

    test("Should navigate to a product details page and verify product details", async () => {
        const homePage = new HomePage(driver);
        const clothesPage=new ClothesPage(driver);
        const productDetails2Page= new ProductDetailsPage2(driver);


        // Load test data
        const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
        const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

        // Step 1: Select a category from the navigation bar
        await homePage.navigateTo(testData.url.home_page);
        expect(await homePage.getTitle()).toContain("Stradivarius");

        await homePage.clickNavigationBarIcon();
        await homePage.waitForElement(homePage.getNavigationBar(), 5000);

        expect(await homePage.isNavigationBarOpen()).toBeTruthy();

        await homePage.selectNavigationBarOption3("Clothing");

        await homePage.isNavigationBarOption4Open();

        await homePage.selectNavigationBarOption4("T-shirts");

        const expectedUrl = "https://www.stradivarius.com/ba/en/women/clothing/t-shirts-n2029";
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toBe(expectedUrl);

        await clothesPage.selectProduct();


        const expectedUrl2 = "https://www.stradivarius.com/ba/en/turtleneck-top-l06517321?colorId=038&categoryId=1020047036";
        const currentUrl2 = await driver.getCurrentUrl();
        expect(currentUrl2).toBe(expectedUrl2);

        const productDetailsPage2 = new ProductDetailsPage2(driver);
    
        const expectedProductName = testData.productName;

        //const actualProductName = await productDetailsPage2.getProductName();
        const actualProductDescription = await productDetailsPage2.getProductDescription();
      
        //expect(actualProductName).toEqual(expectedProductName);
        expect(actualProductDescription).toBeTruthy();

    }, 70000); 
});
