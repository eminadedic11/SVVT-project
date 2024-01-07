import { Builder, By, WebDriver } from "selenium-webdriver";
import { readFileSync } from "fs";
import * as path from "path";
import { HomePage } from "../core/page-objects/home-page";
import { ProductPage } from "../core/page-objects/products-page";
import { ProductDetailsPage } from "../core/page-objects/product-details-page";
import { ShoppingCartPage } from "../core/page-objects/shopping-cart-page";
import { LoginCreate } from "../core/page-objects/logincreate-page";
import { MyAccountPage } from "../core/page-objects/my-account-page";


describe("Test Scenario 5: Test the Shopping Cart Functionality", () => {
    let driver: WebDriver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser("chrome").build();
    });

    afterEach(async () => {
        await driver.quit();
    });

    it("should add a product to the shopping cart and verify", async () => {
        const homePage = new HomePage(driver);
const productPage = new ProductPage(driver);
        const productDetailsPage = new ProductDetailsPage(driver);
        const shoppingCartPage = new ShoppingCartPage(driver);
        const loginCreatePage = new LoginCreate(driver);
        
    
        const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
        const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));
    
        await homePage.navigateTo(testData.url.home_page);
        expect(await homePage.getTitle()).toContain("Stradivarius");
    
        //await homePage.clickUserAccountIcon();

        //expect(await homePage.getTitle()).toContain("Log in");
    
       // await loginCreatePage.fillInputField(loginCreatePage.getEmailInput(), testData.data.email);
       // await loginCreatePage.fillInputField(loginCreatePage.getPasswordInput(), testData.credentials.password);
    
        //await loginCreatePage.clickSignInButton();


        await homePage.clickNavigationBarIcon();
        await homePage.selectCategoryFromNavigationBar("Just In");

        await productPage.selectProduct();

        await productDetailsPage.selectSizeOption();
        await productDetailsPage.addToCart();

      
        await productDetailsPage.selectCart();

expect(await shoppingCartPage.isProductInCart("Your Product Name")).toBeFalsy();
    }, 60000);
});
