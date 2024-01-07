import BasePage from "./base-page";
import { By } from "selenium-webdriver";

export class CheckoutPage extends BasePage {
    private addressInput = By.id("address-input");
    private mapElement = By.id("map-element");

    private deliveryOptionSelector = By.id("delivery-option-selector");
    private pickupInStoreOption = By.xpath("//input[@value='pickup-in-store']");
    private paymentMethodPage = By.xpath("/html/body/div[16]/div/div[3]/div/div/div/header");

    async chooseDeliveryOption(option: string) {
        const deliveryOptionSelectorElement = await this.findElement(this.deliveryOptionSelector);
        await this.clickElement(deliveryOptionSelectorElement);

        const pickupInStoreOptionElement = await this.findElement(this.pickupInStoreOption);
        await this.clickElement(pickupInStoreOptionElement);
    }

    async isPaymentMethodPageVisible(): Promise<boolean> {
        return this.isElementPresent(this.paymentMethodPage);
    }

    async enterAddress(address: string) {
        await this.fillInputField(this.addressInput, address);
    }

    async isMapDisplayed(): Promise<boolean> {
        return this.isElementPresent(this.mapElement);
    }

    async isCheckoutPageAccessible() {
        const checkoutPageLocator = By.xpath("/html/body/div[16]/div/div[3]/div/div/div/header");
        return await this.isElementPresent(checkoutPageLocator);
    }
}
