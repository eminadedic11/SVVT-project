import BasePage from "./base-page";
import { By, until, WebDriver } from "selenium-webdriver";

export class MyAccountPage extends BasePage {
    private someElementOnLoggedInPage = By.xpath("/html/body/div[16]/div/div[2]/div/div[2]/div[1]/div[2]/div/div/div[2]/div/div/a"); 
    private openCart = By.xpath("/html/body/div[16]/div/div[1]/div/div[1]/div/div[3]/div[4]/div/div");
    private myAccountTitle = By.xpath("/html/body/div[16]/div/div[2]/div/div[2]/div[2]/div[1]/div[1]");

   constructor(driver: WebDriver) {
        super(driver);
    }
    async selectCart() {
        await this.findElementAndClick(this.openCart);
    }
    getSomeElementOnLoggedInPage() {
        return this.someElementOnLoggedInPage;
    }
    async isMyAccountPageVisible(): Promise<boolean> {
        const titleElement = await this.findElement(this.myAccountTitle);
        return titleElement.isDisplayed();
    }
    async waitForMyAccountPage(timeout: number = 30000) {
        const myAccountTitleElement = await this.driver.wait(
            until.elementLocated(this.myAccountTitle),
            timeout,
            'My Account page did not load within the specified timeout.'
        );
    
        await this.driver.wait(until.elementIsVisible(myAccountTitleElement), timeout);
    }
    
    

}




 

    

