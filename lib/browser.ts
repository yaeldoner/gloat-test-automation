import { WebDriver, Builder, Capabilities} from 'selenium-webdriver';

export class Browser{
    public driver: WebDriver;

    public constructor(){
        this.driver = new Builder().withCapabilities(Capabilities.chrome()).build();
    }

    public async navigate(url: string){
        return this.driver.get(url);
    }

    public async refresh(){
        return this.driver.navigate().refresh();
    }


    public async close(): Promise<void> {
        await this.driver.quit();
    }
}
