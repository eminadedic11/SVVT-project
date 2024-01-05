import { By } from "selenium-webdriver";
import BasePage from "./base-page";

export default class AccountCreationPage extends BasePage {
    private nameInput = By.id("primaryAddress.firstName");
    private surnameInput = By.id("primaryAddress.lastName");
    private emailInput = By.id("email");
    private passwordInput = By.name("password");
    private numberInput = By.name("phone.subscriberNumber");
    private createAccountButton = By.xpath("/html/body/div[16]/div/div/div/div[3]/div/div[2]/div/div/div/form/div/div[2]/button");
    private newsButton = By.xpath("/html/body/div[16]/div/div/div/div[3]/div/div[2]/div/div/div/form/div/div[2]/div[1]/label/span[2]");
    private dataButton = By.xpath("/html/body/div[16]/div/div/div/div[3]/div/div[2]/div/div/div/form/div/div[2]/div[2]/label/span[2]");
    private reminderButton = By.id("register-rememberMe");



    async fillAccountDetails(name: string, surname: string, email: string, password: string, number: string) {
        await this.fillInputField(this.nameInput, name);
        await this.fillInputField(this.surnameInput, surname);
        await this.fillInputField(this.emailInput, email);
        await this.fillInputField(this.passwordInput, password);
        await this.fillInputField(this.numberInput, number);
    }

    async clickCreateAccountButton() {
        await this.findElementAndClick(this.createAccountButton);
    }
    async clickNewsButton() {
        await this.findElementAndClick(this.newsButton);
    }

    async clickDataButton() {
        await this.findElementAndClick(this.dataButton);
    }

    async clickReminderButton() {
        await this.findElementAndClick(this.reminderButton);
    }
}
