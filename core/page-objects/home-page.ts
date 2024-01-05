import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";


const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class HomePage extends BasePage {
    private userAccountIcon = By.className("my-account-container");

    async clickUserAccountIcon() {
        await this.findElementAndClick(this.userAccountIcon);
    }

}
