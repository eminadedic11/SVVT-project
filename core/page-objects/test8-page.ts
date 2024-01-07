import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class ProfilePage extends BasePage {
    private email = By.id('email');
    private password = By.xpath('//input[@type="password"]');
    private login = By.xpath('//button[@class="STRButton STRButton_primary STRButton_large"]//div[@class="STRButton-text"]');

    private osobniPodaci = By.xpath('//a[@data-cy="personal-data"]');
    private nameField = By.id('firstName');
    
    constructor(driver: WebDriver) {
        super(driver);
    }
    async enterEmail() {
        await this.fillInputField(this.email, testData.credentials.email);
        await this.driver.sleep(1500);
    }
    async enterPassword() {
        await this.fillInputField(this.password, testData.credentials.password);
        await this.driver.sleep(1500);
    }
    async clickLogin() {
        await this.findElementAndClick(this.login);
        await this.driver.sleep(1500);
    }
    async clickPersonalDetails() {
        await this.findElementAndClick(this.osobniPodaci);
        await this.driver.sleep(1500);
    }
    async findName() {
        await this.driver.sleep(1500);
    }
    async enterName() {
        await this.fillInputField(this.nameField, testData.credentials.name);
        await this.driver.sleep(1500);
    }
}