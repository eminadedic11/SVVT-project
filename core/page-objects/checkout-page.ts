import BasePage from "./base-page";
import { By } from "selenium-webdriver";

export class CheckoutPage extends BasePage {

    async isCheckoutPageAccessible() {
        const checkoutPageLocator = By.xpath("/html/body/div[16]/div/div[3]/div/div/div/header");
        return await this.isElementPresent(checkoutPageLocator);
    }
}
