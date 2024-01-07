import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";


const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class ClothesPage extends BasePage {
    private productShirt = By.xpath("/html/body/div[3]/div[1]/div[2]/div[1]/div/div[1]/div[1]/div[2]/div/div/div/div[2]/div/div[2]/div/div[2]/div/div[1]/div[1]/a");

    async selectProduct() {
        await this.findElementAndClick(this.productShirt)
    }

}
