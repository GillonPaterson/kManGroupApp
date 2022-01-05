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
      expectedFirstRow = ['Software Engineer', 'Engineering', "Associate"];

      var elements = (await driver.findElements(By.className("govuk-table__cell")))
      var jobRole = await elements[0].getText()     
      var jobCapability = await elements[1].getText()      
      var bandLevel = await elements[2].getText()    
      var firstRow = [jobRole,jobCapability,bandLevel]

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
      await driver.wait(until.titleIs("Job Band Level Competencies"));
      const title = await driver.getTitle();

      expect(title).to.equal("Job Band Level Competencies");
    });

    // it('should click training button and display available training courses', async () => {
    //   driver.findElement(By.xpath('//*[@id="main-content"]/a')).click();
    //   await driver.wait(until.titleIs("Job Band Level Training"));
    //   const title = await driver.getTitle();
      
    //   expect(title).to.equal("Job Band Level Training");
    // });

    // it('should display link', async () => {
    //   const link = driver.findElement(By.linkText('View course'));
    //   expect(link).to.exist;
    // });

    // it('should click back and display job roles', async () => {
    //   driver.findElement(By.linkText('Back')).click();
    //   await driver.wait(until.titleIs("Job Band Level Training"));

    //   const title = await driver.getTitle();

    //   expect(title).to.equal("Job Band Level Training");
    // });

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

    it('should click home and then click job Families button and confirm table', async () => {
      driver.findElement(By.linkText('Home')).click();
      await driver.wait(until.titleIs("Home"));
      const titleHome = await driver.getTitle();

      expect(titleHome).to.equal("Home");

      driver.findElement(By.linkText("View Job Families")).click();
      await driver.wait(until.titleIs("Job Families"));
      const titleJobFamily = await driver.getTitle();
      
      expect(titleJobFamily).to.equal("Job Families");

      var elements = await driver.findElements(By.className("govuk-table__cell"))

      var jobCapability = await elements[0].getText()
      var jobFamily = await elements[1].getText()

      expect(jobCapability).to.equal("Engineering")
      expect(jobFamily).to.equal("Engineering Strategy and Planning")
    });

    it('Asssert the title on view all capability leads webpage is correct', async () => {
      await driver.get('http://localhost:3000/viewAllCapabilities');
      const title = await driver.getTitle();
      console.log(title)
      expect(title).to.equal("List of Capabilty Leads");
    });

    it('Asssert the title on view capability lead webpage is correct', async () => {
      await driver.get('http://localhost:3000/capabilityLeadInfo?leadID=1');
      const title = await driver.getTitle();
      console.log(title)
      expect(title).to.equal("View Capability Lead Info");
    });

    after(async () => driver.quit());

  });

