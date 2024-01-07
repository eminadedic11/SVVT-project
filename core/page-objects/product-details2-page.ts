import BasePage from "./base-page";
import { By, WebDriver, WebElement, until } from "selenium-webdriver";

export class ProductDetailsPage2 extends BasePage {
    private selectSize = By.xpath("/html/body/div[16]/div/div[2]/div[1]/div/div[1]/div/div[8]/div[4]/div[2]/div/div[2]/div");
    private addToCartButton = By.xpath("/html/body/div[16]/div/div[2]/div[1]/div/div[1]/div/div[8]/div[5]");
    private openCart = By.xpath("/html/body/div[16]/div/div[1]/div/div[1]/div/div[3]/div[4]/div/div");
    private productNameLocator = By.xpath("/html/body/div[16]/div/div[2]/div[1]/div/div[1]/div/div[8]/div[1]/div");
    private productDescriptionLocator = By.xpath("/html/body/div[16]/div/div[2]/div[1]/div/div[1]/div/div[2]/div[1]/div[2]/pre");
  
    async getProductName(): Promise<string> {
        await this.driver.wait(until.elementLocated(this.productNameLocator), 5000);
        const productNameElement = await this.findElement(this.productNameLocator);
        console.log("Product Name Element:", productNameElement); 
        return productNameElement.getText();
    }

    async getProductDescription(): Promise<string> {
        await this.driver.wait(until.elementLocated(this.productDescriptionLocator), 5000);
        const productDescriptionElement = await this.findElement(this.productDescriptionLocator);
        return productDescriptionElement.getText();
    }
    async selectSizeOption() {
        await this.findElementAndClick(this.selectSize);
    }

    async addToCart() {
        await this.findElementAndClick(this.addToCartButton);
    }
    async selectCart() {
        await this.findElementAndClick(this.openCart);
    }
    
}