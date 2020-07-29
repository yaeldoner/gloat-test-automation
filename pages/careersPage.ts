import { abstractPage } from "./abstractPage";
import { Browser } from "lib/browser";
import { By, WebElement } from "selenium-webdriver";

export class careersPage extends abstractPage{

    constructor(browser: Browser) {
        super(browser);
        this.setUrl('https://www.gloat.com/careers/all');
    }

    public async allCareersResults() {
        const allCareers : ICareerResultProps[] = [];
        const careerResults = await this.driver.findElements(By.className('job'));
        for await (const career of careerResults) {
            const careerTitle = await career.findElement(By.css('[data-name="job-title"] h1'));
            const careerLocation = await career.findElement(By.css('[data-name="job-location"] p'));
            const jobDepartment = await career.findElement(By.css('[data-name="job-department"] p'));
            const button = await career.findElement(By.css('[data-name="job-button"]'));

            var careerObj : ICareerResultProps = { 
                location: await careerLocation.getAttribute("innerText"),
                title: await careerTitle.getAttribute("innerText"),
                department: await jobDepartment.getAttribute("innerText"),
                openButton: button
            }

            allCareers.push(careerObj);
        }
       return allCareers;
    }

    public async enterLocationCareerPage(locationName: string){
        const allLocations = await this.driver.findElements(By.css('.locations .box-title'));
        
        for await(const location of allLocations) {
            const elementText = await location.getAttribute("innerText");
            if (elementText === locationName) {
                await location.click();
                break;
            }  
        }
    }

    public async filterBy({
        locationName,
        departmentName,
        text,
        }:{
         locationName?: string;
         departmentName?: string;
         text?: string;
        }) {
        
        const filterByLocation = await this.driver.findElement(By.css('[data-name="location-filter"]'));
        const filterByDepatment = await this.driver.findElement(By.css('[data-name="department-filter"]'));
        const filterByText = await this.driver.findElement(By.className('search'));

        if (locationName !== undefined) {
            await filterByLocation.click();
            const allLocationOptions = await this.driver.findElements(By.css('[data-name="location-filter-option"] p'));
            await this.selectFromDropDown(allLocationOptions, locationName);
        }

        if (departmentName !== undefined) {
            await filterByDepatment.click();
            const allDepartmentOptions = await this.driver.findElements(By.css('[data-name="location-filter-option"] p'));
            await this.selectFromDropDown(allDepartmentOptions, departmentName);
        }

        if (text !== undefined) {
            await filterByText.sendKeys(text);
        }
    }

    public async getCareerSideModal() {
        return await this.driver.findElement(By.className('side-modal-content-holder'));
    }
    
    private async selectFromDropDown(dropdownElements, selectedOption) {
        for await(const location of dropdownElements) {
            const elementText = await location.getAttribute("innerText");
            if (elementText === selectedOption) {
                await location.click();
                break;
            }  
        }
        
    }
}

export interface ICareerResultProps{
    location: string,
    title: string,
    department: string;
    openButton: WebElement,
    skills?: string[],
}