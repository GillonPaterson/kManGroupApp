const { assert } = require('chai');
const {By, Key, Builder} = require('selenium-webdriver');
const { default: isEqual } = require('webdriverio/build/commands/element/isEqual');
require('chromedriver');

async function search(){

  const driver = await new Builder().forBrowser('chrome').build();

  await driver.get('http://localhost:3000/jobroles');


  //Asserts that the title is what it is 

  if ("List of Job Roles" == await driver.getTitle()){
    console.log("passed")
  }else{
    console.log("failed")
  }
  }

search();
