const { expect } = require('chai');
const {Builder, By, until} = require('selenium-webdriver');
const { default: isEqual } = require('webdriverio/build/commands/element/isEqual');
require('chromedriver');

describe("Selenium test", () => {
    const driver = new Builder().forBrowser('chrome').build();

    it('should have correct first row displayed on job roles page', async () => {
      await driver.get('http://localhost:3000/jobroles');

      expectedFirstRow = [ '1', 'Software Engineer', 'Engineering' ];

      const title = await driver.getTitle();
      var elements = (await driver.findElements(By.className("govuk-table__cell")))
      var id = await elements[0].getText()
      var jobRole = await elements[1].getText()
      var jobCapability = await elements[2].getText()
      var firstRow = [id,jobRole,jobCapability]

      expect(title).to.equal("List of Job Roles");
      expect(firstRow).to.eql(expectedFirstRow);
    });

    after(async () => driver.quit());
  });

