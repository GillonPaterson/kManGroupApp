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
      await driver.wait(until.titleIs("List of Job Roles"));

      const title = await driver.getTitle();

      expect(title).to.equal("List of Job Roles");
    });
  
    it('should have correct first row displayed on job roles page', async () => {

      expectedFirstRow = ['Software Engineer', 'Engineering', "Associate"];

      console.log(expectedFirstRow)

      var elements = (await driver.findElements(By.className("govuk-table__cell")))
      var jobRole = await elements[0].getText()
      var jobCapability = await elements[1].getText()
      var bandLevel = await elements[2].getText()

      var firstRow = [jobRole,jobCapability,bandLevel]

      console.log(firstRow)

      expect(firstRow).to.eql(expectedFirstRow);
    });

    it('should click more info and display job spec', async () => {
      driver.findElement(By.linkText('More Info')).click();
      await driver.wait(until.titleIs("Job Specification"));
      const title = await driver.getTitle();

      expect(title).to.equal("Job Specification");
    });

    it('should click back and display job roles', async () => {
      driver.findElement(By.linkText('Back')).click();
      await driver.wait(until.titleIs("List of Job Roles"));
      const title = await driver.getTitle();

      expect(title).to.equal("List of Job Roles");
    });

    it('should click band level and display band level', async () => {
      driver.findElement(By.linkText('Associate')).click();
      await driver.wait(until.titleIs("Competencies Information"));
      const title = await driver.getTitle();
      console.log("title "+title)

      expect(title).to.equal("Competency Information");
    });

    it('should click back and display job roles', async () => {
      driver.findElement(By.linkText('Back')).click();
      await driver.wait(until.titleIs("List of Job Roles"));

      const title = await driver.getTitle();

      expect(title).to.equal("List of Job Roles");
    });

    it('should click home and display home', async () => {
      driver.findElement(By.linkText('Home')).click();
      await driver.wait(until.titleIs("Job Roles"));
      const title = await driver.getTitle();

      expect(title).to.equal("Job Roles");
    });
    after(async () => driver.quit());
  });

