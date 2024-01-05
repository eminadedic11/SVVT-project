import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";


const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class LoginCreate extends BasePage {
    private createAccountButton = By.className("create-account-btn-desktop");

    async clickCreateAccountButton() {
        await this.findElementAndClick(this.createAccountButton);
    }

}