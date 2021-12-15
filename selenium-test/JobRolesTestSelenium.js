const { expect } = require('chai');
const {Builder, By, until} = require('selenium-webdriver');
const { default: isEqual } = require('webdriverio/build/commands/element/isEqual');
require('chromedriver');

describe("Selenium test", () => {
    const driver = new Builder().forBrowser('chrome').build();

    it('should wait until home page opens', async () => {
      await driver.get('http://localhost:3000/home');
      const title = await driver.getTitle();
      const button = await driver.findElement(By.xpath('//*[@id="main-content"]/div/div[1]/a')).getText();

      expect(title).to.equal("Job Roles");
      expect(button).to.equal("Search jobs");
    });

    it('should click button and open job roles', async () => {
      driver.findElement(By.xpath('//*[@id="main-content"]/div/div[1]/a')).click();
      await driver.get('http://localhost:3000/jobroles');
      const title = await driver.getTitle();

      expect(title).to.equal("List of Job Roles");
    });

    it('should click more info and display job spec', async () => {
      driver.findElement(By.linkText('More Info')).click();
      await driver.get('http://localhost:3000/jobSpec?jobRoleID=1');
      const title = await driver.getTitle();

      expect(title).to.equal("Job Specification");
    });

    it('should click back and display job roles', async () => {
      driver.findElement(By.linkText('Back')).click();
      await driver.get('http://localhost:3000/jobroles');
      const title = await driver.getTitle();

      expect(title).to.equal("List of Job Roles");
    });

    it('should click band level and display band level', async () => {
      driver.findElement(By.linkText('Associate')).click();
      await driver.get('http://localhost:3000/associatecompetencies');
      const title = await driver.getTitle();

      expect(title).to.equal("Associate Competencies");
    });

    it('should click back and display job roles', async () => {
      driver.findElement(By.linkText('Back')).click();
      await driver.get('http://localhost:3000/jobroles');
      const title = await driver.getTitle();

      expect(title).to.equal("List of Job Roles");
    });

    it('should click band level and display band level', async () => {
      driver.findElement(By.linkText('Apprentice')).click();
      await driver.get('http://localhost:3000/apprenticecompetencies');
      const title = await driver.getTitle();

      expect(title).to.equal("Apprentice Competencies");
    });

    it('should click home and display home', async () => {
      driver.findElement(By.linkText('Home')).click();
      await driver.get('http://localhost:3000/home');
      const title = await driver.getTitle();

      expect(title).to.equal("Job Roles");
    });

    after(async () => driver.quit());
  });

