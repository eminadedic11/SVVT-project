import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { HomePage } from "../core/page-objects/home-page";
import { ProfilePage } from "../core/page-objects/test8-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let profilePage: ProfilePage;

beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    homePage = new HomePage(driver);
    profilePage = new ProfilePage(driver);
}, 5000);

test("change name", async () => {
    await homePage.clickCookie();
    await homePage.setCountry();
    await homePage.selectCountry();
    await homePage.continue();
    await homePage.openProfile();
    await profilePage.enterEmail();
    await profilePage.enterPassword();
    await profilePage.clickLogin();
    await profilePage.clickPersonalDetails();
    await profilePage.findName();
    await profilePage.enterName();
}, 30000);

afterAll(async () => {
    await driver.quit();
}, 5000);