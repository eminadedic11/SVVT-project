import BasePage from "./base-page";
import { By } from "selenium-webdriver";

export class ProductDetailsPage extends BasePage {
    private selectSize = By.xpath("/html/body/div[16]/div/div[2]/div[1]/div/div[1]/div/div[8]/div[4]/div[2]/div/div[2]/div");
    private addToCartButton = By.xpath("/html/body/div[16]/div/div[2]/div[1]/div/div[1]/div/div[8]/div[5]");
    private openCart = By.xpath("/html/body/div[16]/div/div[1]/div/div[1]/div/div[3]/div[4]/div/div");

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
