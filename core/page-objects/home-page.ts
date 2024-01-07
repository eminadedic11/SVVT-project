import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";


const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class HomePage extends BasePage {
    private userAccountIcon = By.className("my-account-container");
    private searchBar = By.className("new-search-container"); 

    private navigationBarIcon = By.className("clickable-area cursor-pointer");
    private navigationBar = By.xpath("/html/body/div[16]/div/div[1]/div/div[1]/div/div[1]/div[2]/div/div/div[1]");
    private navigationBarOption1 = By.xpath("/html/body/div[16]/div/div[1]/div/div[1]/div/div[1]/div[2]/div/div/div[1]/div/div/div[2]/div[4]/div[1]/a");
    private navigationBarOption2 = By.xpath("/html/body/div[16]/div/div[1]/div/div[1]/div/div[1]/div[2]/div/div/div[1]/div/div/div[2]/div[4]/div[2]/div/div[1]/section/div[9]/a");
    private openCart = By.xpath("/html/body/div[16]/div/div[1]/div/div[1]/div/div[3]/div[4]");
    private closeNavigationBarButton = By.xpath("/html/body/div[16]/div/div[1]/div/div[1]/div/div[1]/div[2]/div/div/div[1]/div/div/div[1]/div[1]/svg"); 
    private returnToHomeButton = By.xpath("/html/body/div[16]/div/div[1]/div/div[1]/div/div[1]/svg"); 
    private navigationBarOption3 = By.xpath("/html/body/div[16]/div/div[1]/div/div[1]/div/div[1]/div[2]/div/div/div[1]/div/div/div[2]/div[4]/div[1]/a");
    private navigationBarOption4 = By.xpath("/html/body/div[16]/div/div[1]/div/div[1]/div/div[1]/div[2]/div/div/div[1]/div/div/div[2]/div[4]/div[2]/div/div[2]/section/div[2]/a");
    private cookieButton = By.className('onetrust-close-btn-handler banner-close-button ot-close-icon');
    private countryField = By.id('inputWorldWideSearcher');
    private desiredCountry = By.className('suggestion-item selected-option');
    private enterButton = By.className('STRButton-text');
    private profileButton = By.xpath('/html/body/div[16]/div/div[1]/div/div[1]/div/div[3]/div[2]/div[2]/div');
    private email = By.id('email');
    private password = By.xpath('//input[@type="password"]');
    private login = By.xpath('//button[@class="STRButton STRButton_primary STRButton_large"]//div[@class="STRButton-text"]');
    async clickUserAccountIcon() {
        await this.findElementAndClick(this.userAccountIcon);
    }
    async enterSearchQuery(query: string) {
        const searchInputField = By.id("colbenson-search-input");
    
        await this.findElementAndClick(this.searchBar);
    
        await this.waitForElement(searchInputField,20000);
    
        await this.sleep(1000);
    
        await this.fillInputField(searchInputField, query);
    
        await this.sleep(1000);
    
        const searchButton = By.className("search-button-container");
        await this.findElementAndClick(searchButton);
    }
    
    async clearInputField(inputField: By) {
        const inputElement = await this.waitForElement(inputField,20000);
        await inputElement.clear();
    }
    
    async clickNavigationBarIcon() {
        await this.findElementAndClick(this.navigationBarIcon);    }

    async isNavigationBarOpen() {
        const navigationBar = await this.findElement(this.navigationBar);
        return navigationBar.isDisplayed();
    }

    async isNavigationBarOption1Open() {
        const navigationBar = await this.findElement(this.navigationBarOption1);
        return navigationBar.isDisplayed();
    }
    async isNavigationBarOption2Open() {
        const navigationBar = await this.findElement(this.navigationBarOption2);
        return this.waitForElementToBeVisible(navigationBar, 5000);
    }

    async isNavigationBarOption4Open() {
        const navigationBar = await this.findElement(this.navigationBarOption4);
        return this.waitForElementToBeVisible(navigationBar, 5000);
    }
    
    
    async selectNavigationBarOption1(option: string) {
        await this.findElementAndClick(this.navigationBarOption1);
        await this.sleep(1000); 
    }
    
    async selectNavigationBarOption2(option: string) {
    await this.findElementAndClick(this.navigationBarOption2);
    await this.sleep(1000); 
}
async selectNavigationBarOption3(option: string) {
    await this.findElementAndClick(this.navigationBarOption3);
    await this.sleep(1000); 
}

async selectNavigationBarOption4(option: string) {
await this.findElementAndClick(this.navigationBarOption4);
await this.sleep(1000); 
}
    async waitForNavigationBar(timeout: number = 5000) {
        const navigationBarElement = this.getNavigationBar();
        await this.waitForElementToBeClickable(navigationBarElement, timeout);
    }
    
    
    getNavigationBar() {
        return this.navigationBar;
    }

    async selectCategoryFromNavigationBar(category: string) {
    const categoryLocator = By.xpath("/html/body/div[16]/div/div[1]/div/div[1]/div/div[1]/div[2]/div/div/div[1]/div/div/div[2]/div[2]/div/a");
    await this.findElementAndClick(categoryLocator);
}
async isHomePageLoadedWithoutErrors() {
    const errorIndicator = By.className("error-message");
    
    try {
        await this.driver.wait(until.stalenessOf(await this.findElement(errorIndicator)), 5000);
        return true;
    } catch (error) {
        return false;
    }
}

async selectCart() {
    await this.findElementAndClick(this.openCart);
}

async returnToHomePage() {
        const returnBtn = await this.findElementAndClick(this.returnToHomeButton);
   
}
private osobniPodaci = By.xpath('//a[@data-cy="personal-data"]');
private nameField = By.id('firstName');

constructor(driver: WebDriver) {
    super(driver);
}
async clickCookie() {
    await this.driver.sleep(1500);
    await this.findElementAndClick(this.cookieButton);
    await this.driver.sleep(1500);
}
async setCountry() {
    await this.fillInputField(this.countryField, testData.location.country);
    await this.driver.sleep(1500);
}
async selectCountry() {
    await this.findElementAndClick(this.desiredCountry);
    await this.driver.sleep(1500);
}
async continue() {
    await this.findElementAndClick(this.enterButton);
    await this.driver.sleep(1500);
}
async openProfile() {
    await this.findElementAndClick(this.profileButton);
    await this.driver.sleep(1500);
}
}
