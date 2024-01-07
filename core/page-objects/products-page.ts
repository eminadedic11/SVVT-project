import BasePage from "./base-page";
import { By } from "selenium-webdriver";

export class ProductPage extends BasePage {
    private prdouctOption = By.xpath("/html/body/div[3]/div[1]/div[2]/div[1]/div/div[1]/div[1]/div[2]/div/div/div/div[2]/div/div[2]/div/div[2]/div/div[1]/div[1]/a");
    
    async selectProduct() {
        await this.findElementAndClick(this.prdouctOption)
    }
    async areProductsDisplayed() {
        const productLocator = By.xpath("/html/body/div[3]/div[1]/div[2]/div[1]/div/div[1]/div[1]/div[2]/div/div/div/div[2]/div/div[2]/div/div[8]/div/div/div[1]/a");
        return await this.isElementPresent(productLocator);
    }
}
