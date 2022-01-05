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

      expect(title).to.equal("Home");
      expect(button).to.equal("Search jobs");
    });

    it('should click button and open job roles', async () => {
      driver.findElement(By.xpath('//*[@id="main-content"]/div/div[1]/a')).click();
      await driver.wait(until.titleIs("List of Job Roles"));

      const title = await driver.getTitle();

      expect(title).to.equal("List of Job Roles");
    });
  
    it('should have correct first row displayed on job roles page', async () => {
      expectedFirstRow = ['Software Engineer', 'Engineering', 'Engineering', "Apprentice"];

      var elements = (await driver.findElements(By.className("govuk-table__cell")))
      var jobRole = await elements[0].getText()     
      var jobCapability = await elements[1].getText()
      var jobFamily = await elements[2].getText()        
      var bandLevel = await elements[3].getText()    
      var firstRow = [jobRole,jobCapability,jobFamily, bandLevel]

      expect(firstRow).to.eql(expectedFirstRow);  
    });

    it('should click more info and display job spec', async () => {
      driver.findElement(By.linkText('More Info')).click();
      await driver.wait(until.titleIs("Job Specification"));
      const title = await driver.getTitle();

      expect(title).to.equal("Job Specification");
    });

    it('should click back and display job roles, Tests back button works', async () => {
      driver.findElement(By.linkText('Back')).click();
      await driver.wait(until.titleIs("List of Job Roles"));
      const title = await driver.getTitle();

      expect(title).to.equal("List of Job Roles");
    });

    it('should click band level and display band level', async () => {
      await driver.findElement(By.linkText('Associate')).click();
      const title = await driver.getTitle();

      var heading = await driver.findElement(By.className('govuk-heading-xl')).getText()

      expect(heading).to.equal("Associate Competency Information")
      expect(title).to.equal("Job Band Level Competencies");
    });



    it('should click training button and display available training courses', async () => {
      driver.findElement(By.xpath('//*[@id="main-content"]/a')).click();
      await driver.wait(until.titleIs("Job Band Level Training"));
      const title = await driver.getTitle();
      
      expect(title).to.equal("Job Band Level Training");
    });

    it('should display link and heading', async () => {
      const link = await driver.findElement(By.linkText('View course'));
      var heading = await driver.findElement(By.className('govuk-heading-xl')).getText()

      expect(heading).to.equal("Available Training Courses for Associate")
      expect(link).to.exist;
    });

    //put in bit for clicking training link

    it('should click home and display home', async () => {
      driver.findElement(By.linkText('Home')).click();
      await driver.wait(until.titleIs("Home"));
      const title = await driver.getTitle();

      expect(title).to.equal("Home");
    });

    it('should click View Role Matrix and confirm table', async () => {
      driver.findElement(By.linkText('View Role Matrix')).click();
      await driver.wait(until.titleIs("List of Job Roles"));
      const title = await driver.getTitle();

      var element = await driver.findElements(By.linkText('Software Engineer'))
      var jobRole = await element[element.length-1].getText()
      expect(jobRole).to.equal("Software Engineer")
      expect(title).to.equal("List of Job Roles");
    })

    it('should click on a role and go to job spec page', async () => {
      var elements = await driver.findElements(By.linkText('Software Engineer'))
      await elements[elements.length -1].click()
      const title =  await driver.getTitle();

      var heading = await driver.findElement(By.className('govuk-heading-xl')).getText()

      expect(title).to.equal("Job Specification")
      expect(heading).to.equal("Software Engineer Spec")
    })

    it('should click home and then click job Families button and confirm table', async () => {
      await driver.findElement(By.linkText('Home')).click();

      await driver.findElement(By.linkText("View Job Families")).click();
      const titleJobFamily = await driver.getTitle();
      
      expect(titleJobFamily).to.equal("Job Families");

      var elements = await driver.findElements(By.className("govuk-table__cell"))

      var jobCapability = await elements[0].getText()
      var jobFamily = await elements[1].getText()

      expect(jobCapability).to.equal("Engineering")
      expect(jobFamily).to.equal("Engineering Strategy and Planning")
    });

    it('should click on view capability lead and confirm table', async () => {
      await driver.findElement(By.linkText('Home')).click();
      await driver.findElement(By.linkText('View Capability Lead')).click();
      const title = await driver.getTitle();
      expect(title).to.equal("List of Capabilty Leads");

      expectedFirstRow = ['Dave', 'Boats', 'Engineering'];

      var elements = (await driver.findElements(By.className("govuk-table__cell")))
      var forename = await elements[0].getText()     
      var surname = await elements[1].getText()
      var capability = await elements[2].getText()        
      var firstRow = [forename,surname,capability]

      expect(firstRow).to.eql(expectedFirstRow);  

    });

    it('should click on capability lead more info link and get right page', async () => {
      await driver.findElement(By.linkText('More Info')).click()
      const title = await driver.getTitle();
      expect(title).to.equal("View Capability Lead Info");

      var text = await driver.findElement(By.className('govuk-summary-list__value')).getText()

      expect(text).to.equal("Dave Boats")
    });

    it('should wait until add role page opens', async () => {
      await driver.get('http://localhost:3000/addrole');
      const title = await driver.getTitle();
      const button = await driver.findElement(By.xpath('//*[@id="main-content"]/form/button')).getText();

      expect(title).to.equal("Add a New Role");
      expect(button).to.equal("Submit");
    });

    after(async () => driver.quit());

  });

