import { GloatPlatform} from '../pages/index'
import { Browser } from '../lib/browser'

jest.setTimeout(1000  * 1000);

describe('tests', ()=>{

    let gloat : GloatPlatform;

    beforeAll( async()=>{
        gloat = new GloatPlatform(new Browser());
    });

    it('Verify ability to access specific location career page by clicking on a location box', async()=>{
        const careersPage = await gloat.careersPage;
        await careersPage.navigate();    
        await careersPage.enterLocationCareerPage("TEL AVIV");
        const url = await careersPage.driver.getCurrentUrl();
        expect(url).toContain("tlv");
    });
    
    it('Verify ability to filter careers by location', async()=>{
        const careersPage = await gloat.careersPage;
        await careersPage.navigate();    
        await careersPage.filterBy({ locationName: "Tel Aviv" });
        const allResults = careersPage.allCareersResults();
        (await allResults).forEach(result => {
            expect(result.location).toContain("Tel Aviv")
        });
    });

    it('Verify ability to access specific career page and see all the relevant data to the position', async()=>{
        const careersPage = await gloat.careersPage;
        await careersPage.navigate();    
        const allResults = await careersPage.allCareersResults();
        await allResults[0].openButton.click(); 
        const careerModal = await careersPage.getCareerSideModal();
        expect(careerModal).toBeDefined();
    });

    afterAll(()=>{
        gloat.quite();
    })

});
