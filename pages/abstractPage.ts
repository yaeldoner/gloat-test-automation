import { WebDriver } from "selenium-webdriver"
import { Browser } from '../lib/browser';

export abstract class abstractPage {
    private url: string;
    driver: WebDriver;

    protected setUrl(url: string) {
      this.url = url;
    }

    public async navigate(){
        await this.browser.navigate(this.url); 
        await this.driver.sleep(8 * 1000);
        await this.driver.manage().window().maximize();
    }

    refresh(){
        this.driver.navigate().refresh();
    };

    public constructor(protected browser: Browser) {
        this.driver = browser.driver;
    }
}