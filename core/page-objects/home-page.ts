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


    async clickUserAccountIcon() {
        await this.findElementAndClick(this.userAccountIcon);
    }
    async enterSearchQuery(query: string) {
        // Click on the search bar to open the dropdown
        await this.findElementAndClick(this.searchBar);

        // Find the input field within the dropdown and fill it with the query
        const inputField = By.id("colbenson-search-input");
        await this.fillInputField(inputField, query);

        // Press Enter to perform the search
        const inputElement = await this.findElement(inputField);
        await inputElement.sendKeys('\uE007');  
    }

    async clickNavigationBarIcon() {
        await this.findElementAndClick(this.navigationBarIcon);    }

    async isNavigationBarOpen() {
        // Implement logic to check if the navigation bar is open
        const navigationBar = await this.findElement(this.navigationBar);
        return navigationBar.isDisplayed();
    }

    async isNavigationBarOption1Open() {
        // Implement logic to check if the navigation bar is open
        const navigationBar = await this.findElement(this.navigationBarOption1);
        return navigationBar.isDisplayed();
    }
    async isNavigationBarOption2Open() {
        const navigationBar = await this.findElement(this.navigationBarOption2);
        return this.waitForElementToBeVisible(navigationBar, 5000);
    }
    
    async selectNavigationBarOption1(option: string) {
        await this.findElementAndClick(this.navigationBarOption1);
        // Introduce a delay to allow the next options to fully load
        await this.sleep(1000); // Adjust the delay as needed
    }
    
async selectNavigationBarOption2(option: string) {
    await this.findElementAndClick(this.navigationBarOption2);
    // Introduce a delay to allow the next options to fully load
    await this.sleep(1000); // Adjust the delay as needed
}
    async waitForNavigationBar(timeout: number = 5000) {
        const navigationBarElement = this.getNavigationBar();
        await this.waitForElementToBeClickable(navigationBarElement, timeout);
    }
    
    
    getNavigationBar() {
        return this.navigationBar;
    }
}
