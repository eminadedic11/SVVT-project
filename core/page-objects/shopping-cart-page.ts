import BasePage from "./base-page";
import { By } from "selenium-webdriver";

export class ShoppingCartPage extends BasePage {
    private productInCart = (productName: string) =>
        By.xpath("/html/body/div[16]/div/main/div/section[1]/div[2]/div[1]/div/a/img");


        private shoppingCartHeader = By.xpath("/html/body/div[16]/div/div[3]/div/div/div/header");
        private processOrderButton = By.id("process-order-button");
    
        async isShoppingCartPageAccessible(): Promise<boolean> {
            return this.isElementPresent(this.shoppingCartHeader);
        }
    
        async clickProcessOrderButton() {
            await this.findElementAndClick(this.processOrderButton);
        }

        async isProductInCart(productName: string) {
        return this.isElementPresent(this.productInCart(productName));
         }
    
        async isShoppingCartEmpty() {
            const emptyCartMessage = By.xpath("/html/body/div[16]/div/main/div/div/div[1]");
            return await this.isElementPresent(emptyCartMessage);
        }
        
        async goToCheckout() {
    const checkoutButton = By.xpath("/html/body/div[16]/div/main/div/section[1]/div[2]/div[3]/div/div[1]/a/button");
    await this.findElementAndClick(checkoutButton);
}
}

