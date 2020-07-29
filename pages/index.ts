import { careersPage } from './careersPage';
import { Browser } from '../lib/browser';

export{ 
    careersPage
}

export class GloatPlatform{

    public careersPage: careersPage;

    constructor(public browser: Browser){
        this.careersPage = new careersPage(browser);
    }

    public async quite(): Promise<void> {
        await this.browser.close();
      }
}