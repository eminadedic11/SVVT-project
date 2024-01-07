import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";
import { MyAccountPage } from "./my-account-page";


const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class LoginCreate extends BasePage {
    private createAccountButton = By.className("create-account-btn-desktop");
    private emailInput = By.xpath("/html/body/div[16]/div/div/div/div[3]/div/div[2]/div/div[1]/div[1]/div/div/div/div/div/div/form/div/div[1]/input");
    private passwordInput = By.xpath("/html/body/div[16]/div/div/div/div[3]/div/div[2]/div/div[1]/div[1]/div/div/div/div/div/div/form/div/div[2]/input");
    private signInButton = By.xpath("/html/body/div[16]/div/div/div/div[3]/div/div[2]/div/div[1]/div[1]/div/div/div/div/div/div/form/div/div[4]/div/div/button"); 

    async clickCreateAccountButton() {
        await this.findElementAndClick(this.createAccountButton);
    }
    async login(email: string, password: string) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickSignInButton();
    }
    getEmailInput() {
        return this.emailInput;
    }

    getPasswordInput() {
        return this.passwordInput;
    }

    getSignInButton() {
        return this.signInButton;
    }

    async fillEmail(email: string) {
        await this.fillInputField(this.emailInput, email);
    }

    async fillPassword(password: string) {
        await this.fillInputField(this.passwordInput, password);
    }

    async clickSignInButton(): Promise<MyAccountPage> {
        await this.findElementAndClick(this.signInButton);

        // Wait for My Account page to be visible
        const myAccountPage = new MyAccountPage(this.driver);
        await myAccountPage.waitForMyAccountPage(); // Ensure this method waits for the relevant elements

        // Verify if we are on the correct page
        const isMyAccountPageVisible = await myAccountPage.isMyAccountPageVisible();
        if (!isMyAccountPageVisible) {
            throw new Error("Failed to navigate to My Account page after login.");
        }

        return myAccountPage;
    }

    async isLoginOptionVisible() {
        const loginOption = By.xpath("/html/body/div[16]/div/div/div/div[3]/div/div[2]/div/div[1]/div[1]/div/div/div/div/div/div/form/div/div[4]/div/div/button");
        return await this.isElementPresent(loginOption,15000);
    }
    
    async isRegistrationOptionVisible() {
        const registrationOption = By.xpath("/html/body/div[16]/div/div/div/div[3]/div/div[2]/div/div[1]/div[2]/div/div/div/div[4]/div/div/button");
        return await this.isElementPresent(registrationOption);
    }

}