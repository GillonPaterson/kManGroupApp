const { expect } = require('chai');
const {Builder, By, until} = require('selenium-webdriver');
const { default: isEqual } = require('webdriverio/build/commands/element/isEqual');
require('chromedriver');

describe("Selenium test", () => {
    const driver = new Builder().forBrowser('chrome').build();

    it('should wait until title is right', async () => {
      await driver.get('http://localhost:3000/jobroles');
      const title = await driver.getTitle();

      expect(title).to.equal("List of Job Roles");
    });

    after(async () => driver.quit());
  });

