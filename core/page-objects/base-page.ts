import { By, WebDriver, WebElement, until } from "selenium-webdriver";
export default class BasePage {
    protected driver: WebDriver;


    constructor(driver: WebDriver) {
        this.driver = driver;
    }
    async getTitle(){
        return await this.driver.getTitle();
    }
    async checkMatchingElements(selector: By, matchingItem: string){
        const element = await this.findElement(selector);
        const elementText = await element.getText();
        expect(elementText).toMatch(matchingItem);
    }
    async findElement(selector: By) {
        return await this.driver.findElement(selector);
    }
    async checkTitle(page: { getTitle: () => Promise<string>}, page_title: string){
        let title = await page.getTitle();
        expect(title).toMatch(page_title);
    }  
    async findElementAndClick(selector: By){
        await this.driver.wait(
                       until.elementLocated(selector),10000)
                       .click();
    }
    async waitAndClick(elementLocator, timeout) {
        await this.driver.wait(
            until.elementLocated(elementLocator), timeout).click();
    }
   
    async waitForElement(elementLocator, timeout) {
        return this.driver.wait(until.elementLocated(elementLocator), timeout);
    }
    async hoverElement(element: WebElement) {
        const actions = this.driver.actions({ bridge: true });
        await actions
                    .move({ duration: 2000, origin: element, x: 0, y: 0 })
                    .perform();
    }
    async fillInputField(inputField: By, text: string) {
        //await (await this.findElement(inputField)).sendKeys(text);
        const inputElement = await this.waitForElement(inputField,20000);
        console.log(`Filling input field located by: ${inputField.toString()}`);
        console.log(`Text to be entered: ${text}`);
        await inputElement.clear();
        await inputElement.sendKeys(text);
    }  
    
    async navigateTo(url: string) {
        await this.driver.get(url);
        await this.driver.manage().window().maximize(); 
    }
    
    async clickButton(selector: By) {
        const buttonElement = await this.findElement(selector);
        await buttonElement.click();
    }

    async waitForElementVisible(locator: By, timeout: number) {
        const element = await this.driver.wait(until.elementLocated(locator), timeout);
        return this.driver.wait(until.elementIsVisible(element), timeout);
    }
    async sleep(milliseconds: number) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
    async waitForElementToBeClickable(locator: By, timeout: number) {
        const element = await this.findElement(locator);
        
        await this.driver.wait(async () => {
            try {
                await this.driver.actions().click(element).perform();
                await this.sleep(1000); 
                return true;
            } catch (error) {
                return false;
            }
        }, timeout);
    }
        
    async waitForElementToBeVisible(element: WebElement, timeout: number) {
        await this.driver.wait(until.elementIsVisible(element), timeout);
    }
    
    async isElementPresent(locator: By, timeout: number = 5000) {
        try {
            await this.driver.wait(until.elementLocated(locator), timeout);
            return true;
        } catch (error) {
            return false;
        }
    }
}
