const { expect } = require('chai')
const { Builder, By, until, Key } = require('selenium-webdriver')
const fs = require('fs')
require('chromedriver')

describe('Selenium test', () => {
  const driver = new Builder().forBrowser('chrome').build()

  it('should wait until login page opens', async () => {
    var config = JSON.parse(fs.readFileSync('selenium-test/seleniumConfig.json', 'utf8'))

    await driver.get('http://localhost:3000/home')

    const title = await driver.getTitle()
    await driver.findElement(By.id('username')).sendKeys(config.employeeUser.username)
    await driver.findElement(By.id('password')).sendKeys(config.employeeUser.password)

    await driver.findElement(By.xpath('//*[@id="main-content"]/form/button')).click()
    await driver.wait(until.titleIs('Home'))
    expect(title).to.equal('Login')

    var htmlSource = await driver.getPageSource()
    fs.appendFile('app/assets/snapshots/home-snapshot.html', htmlSource, function (err) {
      if (err) throw err
      console.log('Saved!')
    })
  })

  it('should wait until home page opens', async () => {
    const title = await driver.getTitle()
    const button = await driver.findElement(By.xpath('//*[@id="main-content"]/div/div[1]/a')).getText()

    expect(title).to.equal('Home')
    expect(button).to.equal('Search jobs')
  })

  it('should click button and open job roles', async () => {
    driver.findElement(By.xpath('//*[@id="main-content"]/div/div[1]/a')).click()
    await driver.wait(until.titleIs('List of Job Roles'))

    const title = await driver.getTitle()
    expect(title).to.equal('List of Job Roles')
    var htmlSource = await driver.getPageSource()
    fs.appendFile('app/assets/snapshots/jobRoles-snapshot.html', htmlSource, function (err) {
      if (err) throw err
      console.log('Saved!')
    })
  })

  it('should have correct first row displayed on job roles page', async () => {
    var expectedFirstRow = ['Software Engineer', 'Engineering', 'Engineering', 'Apprentice']

    var elements = (await driver.findElements(By.className('govuk-table__cell')))
    var jobRole = await elements[0].getText()
    var jobCapability = await elements[1].getText()
    var jobFamily = await elements[2].getText()
    var bandLevel = await elements[3].getText()
    var firstRow = [jobRole, jobCapability, jobFamily, bandLevel]

    expect(firstRow).to.eql(expectedFirstRow)
  })

  it('should display filter box on job roles page', async () => {
    var filter1 = await driver.findElement(By.xpath('//*[@id="accordion-default-heading-1"]')).getText()
    expect(filter1).to.eql('Filter by Job Role')

    var filter2 = await driver.findElement(By.xpath('//*[@id="accordion-default-heading-2"]')).getText()
    expect(filter2).to.eql('Filter by Capability')

    var filter3 = await driver.findElement(By.xpath('//*[@id="accordion-default-heading-3"]')).getText()
    expect(filter3).to.eql('Filter by Job Family')

    var filter4 = await driver.findElement(By.xpath('//*[@id="accordion-default-heading-4"]')).getText()
    expect(filter4).to.eql('Filter by Band Level')
  })

  it('should filter job roles when update table button is clicked', async () => {
    await driver.findElement(By.xpath('//*[@id="accordion-default-heading-2"]')).click()
    await driver.findElement(By.id('capability-2')).click()
    await driver.findElement(By.id('capability-3')).click()
    await driver.findElement(By.id('capability-4')).click()
    await driver.findElement(By.id('capability-5')).click()
    await driver.findElement(By.id('capability-6')).click()
    await driver.findElement(By.id('capability-7')).click()
    await driver.findElement(By.id('capability-8')).click()

    expect(await driver.findElement(By.id('capability-2')).isSelected()).to.eql(false)
    expect(await driver.findElement(By.id('capability-3')).isSelected()).to.eql(false)
    expect(await driver.findElement(By.id('capability-4')).isSelected()).to.eql(false)
    expect(await driver.findElement(By.id('capability-5')).isSelected()).to.eql(false)
    expect(await driver.findElement(By.id('capability-6')).isSelected()).to.eql(false)
    expect(await driver.findElement(By.id('capability-7')).isSelected()).to.eql(false)
    expect(await driver.findElement(By.id('capability-8')).isSelected()).to.eql(false)

    await driver.findElement(By.xpath('//*[@id="accordion-default-heading-2"]')).click()
    await driver.findElement(By.xpath('//*[@id="main-content"]/form/button')).click()

    const title = await driver.getTitle()
    expect(title).to.equal('List of Job Roles')
  })

  it('should click more info and display job spec', async () => {
    driver.findElement(By.linkText('More Info')).click()
    await driver.wait(until.titleIs('Job Specification'))
    const title = await driver.getTitle()

    expect(title).to.equal('Job Specification')

    var htmlSource = await driver.getPageSource()
    fs.appendFile('app/assets/snapshots/jobSpec-snapshot.html', htmlSource, function (err) {
      if (err) throw err
      console.log('Saved!')
    })
  })

  it('should click back and display job roles, Tests back button works', async () => {
    driver.findElement(By.linkText('Back')).click()
    await driver.wait(until.titleIs('List of Job Roles'))
    const title = await driver.getTitle()

    expect(title).to.equal('List of Job Roles')
  })

  it('should click band level and display band level', async () => {
    await driver.findElement(By.linkText('Associate')).click()
    const title = await driver.getTitle()

    var heading = await driver.findElement(By.className('govuk-heading-xl')).getText()

    expect(heading).to.equal('Associate Competency Information')
    expect(title).to.equal('Job Band Level Competencies')

    var htmlSource = await driver.getPageSource()
    fs.appendFile('app/assets/snapshots/competencies-snapshot.html', htmlSource, function (err) {
      if (err) throw err
      console.log('Saved!')
    })
  })

  it('should click training button and display available training courses', async () => {
    driver.findElement(By.xpath('//*[@id="main-content"]/a')).click()
    await driver.wait(until.titleIs('Job Band Level Training'))
    const title = await driver.getTitle()

    expect(title).to.equal('Job Band Level Training')
  })

  it('should display link and heading', async () => {
    const link = await driver.findElement(By.linkText('View course'))
    var heading = await driver.findElement(By.className('govuk-heading-xl')).getText()

    expect(heading).to.equal('Available Training Courses for Associate')
    expect(link).to.exist // eslint-disable-line
  })

  // put in bit for clicking training link

  it('should click home and display home', async () => {
    driver.findElement(By.linkText('Home')).click()
    await driver.wait(until.titleIs('Home'))
    const title = await driver.getTitle()

    expect(title).to.equal('Home')
  })

  it('should click View Role Matrix and confirm table', async () => {
    driver.findElement(By.linkText('View Role Matrix')).click()
    await driver.wait(until.titleIs('List of Job Roles'))
    const title = await driver.getTitle()

    var element = await driver.findElements(By.linkText('Software Engineer'))
    var jobRole = await element[element.length - 1].getText()
    expect(jobRole).to.equal('Software Engineer')
    expect(title).to.equal('List of Job Roles')
  })

  it('should click on a role and go to job spec page', async () => {
    var elements = await driver.findElements(By.linkText('Software Engineer'))
    await elements[elements.length - 1].click()
    const title = await driver.getTitle()

    var heading = await driver.findElement(By.className('govuk-heading-xl')).getText()

    expect(title).to.equal('Job Specification')
    expect(heading).to.equal('Software Engineer Spec')
  })

  it('should click home and then click job Families button and confirm table', async () => {
    await driver.findElement(By.linkText('Home')).click()

    await driver.findElement(By.linkText('View Job Families')).click()
    const titleJobFamily = await driver.getTitle()

    expect(titleJobFamily).to.equal('Job Families')

    var elements = await driver.findElements(By.className('govuk-table__cell'))

    var jobCapability = await elements[0].getText()
    var jobFamily = await elements[1].getText()

    expect(jobCapability).to.equal('Engineering')
    expect(jobFamily).to.equal('Engineering Strategy and Planning')

    var htmlSource = await driver.getPageSource()
    fs.appendFile('app/assets/snapshots/jobFamilies-snapshot.html', htmlSource, function (err) {
      if (err) throw err
      console.log('Saved!')
    })
  })

  it('should click on view capability lead and confirm table', async () => {
    await driver.findElement(By.linkText('Home')).click()
    await driver.findElement(By.linkText('View Capability Lead')).click()
    const title = await driver.getTitle()
    expect(title).to.equal('List of Capabilty Leads')

    var expectedFirstRow = ['Dave', 'Boats', 'Engineering']

    var elements = (await driver.findElements(By.className('govuk-table__cell')))
    var forename = await elements[0].getText()
    var surname = await elements[1].getText()
    var capability = await elements[2].getText()
    var firstRow = [forename, surname, capability]

    expect(firstRow).to.eql(expectedFirstRow)

    var htmlSource = await driver.getPageSource()
    fs.appendFile('app/assets/snapshots/capabilityLeads-snapshot.html', htmlSource, function (err) {
      if (err) throw err
      console.log('Saved!')
    })
  })

  it('should click on capability lead more info link and get right page', async () => {
    await driver.findElement(By.linkText('More Info')).click()
    const title = await driver.getTitle()
    expect(title).to.equal('View Capability Lead Info')

    var text = await driver.findElement(By.className('govuk-summary-list__value')).getText()

    expect(text).to.equal('Dave Boats')

    var htmlSource = await driver.getPageSource()
    fs.appendFile('app/assets/snapshots/viewCapabilityLeads-snapshot.html', htmlSource, function (err) {
      if (err) throw err
      console.log('Saved!')
    })
  })

  it('Asssert the title on view all capability leads webpage is correct', async () => {
    await driver.get('http://localhost:3000/viewAllCapabilities')
    const title = await driver.getTitle()
    console.log(title)
    expect(title).to.equal('List of Capabilty Leads')
  })

  it('Asssert the title on view capability lead webpage is correct', async () => {
    await driver.get('http://localhost:3000/capabilityLeadInfo?leadID=1')
    const title = await driver.getTitle()
    console.log(title)
    expect(title).to.equal('View Capability Lead Info')
  })

  it('should logout and login as admin', async () => {
    var config = JSON.parse(fs.readFileSync('selenium-test/seleniumConfig.json', 'utf8'))
    await driver.get('http://localhost:3000/home')
    var title = await driver.getTitle()
    expect(title).to.equal('Home')

    await driver.findElement(By.xpath('//*[@id="main-content"]/div/div[2]/aside/a')).click()
    title = await driver.getTitle()
    expect(title).to.equal('Logged Out')

    var logoutPageHtmlSource = await driver.getPageSource()
    fs.appendFile('app/assets/snapshots/logout-snapshot.html', logoutPageHtmlSource, function (err) {
      if (err) throw err
      console.log('Saved!')
    })

    await driver.findElement(By.xpath('//*[@id="main-content"]/a')).click()

    title = await driver.getTitle()
    expect(title).to.equal('Login')
    const username = await driver.findElement(By.id('username'))
    await username.sendKeys('aaa')
    for (let i = 0; i < 20; i++) {
      await username.sendKeys(Key.BACK_SPACE)
    }
    console.log(config.adminUser)
    await username.sendKeys(config.adminUser.username)
    const password = await driver.findElement(By.id('password'))
    await password.sendKeys('aaa')
    for (let i = 0; i < 20; i++) {
      await password.sendKeys(Key.BACK_SPACE)
    }
    await password.sendKeys(config.adminUser.password)

    await driver.findElement(By.xpath('/html/body/div[1]/main/form/button')).click()

    var homeTitle = await driver.getTitle()
    expect(homeTitle).to.equal('Home')

    var adminHomeHtmlSource = await driver.getPageSource()
    fs.appendFile('app/assets/snapshots/adminHome-snapshot.html', adminHomeHtmlSource, function (err) {
      if (err) throw err
      console.log('Saved!')
    })
  })

  it('should wait until add role page opens', async () => {
    await driver.get('http://localhost:3000/addrole')
    const title = await driver.getTitle()
    const button = await driver.findElement(By.xpath('//*[@id="main-content"]/form/button')).getText()

    expect(title).to.equal('Add a New Role')
    expect(button).to.equal('Submit')

    var htmlSource = await driver.getPageSource()
    fs.appendFile('app/assets/snapshots/addRoles-snapshot.html', htmlSource, function (err) {
      if (err) throw err
      console.log('Saved!')
    })
  })

  it('Should add, edit and delete a job role and return to the job roles page after each', async () => {
    // adding a role
    await driver.findElement(By.xpath('//*[@id="jobRole"]')).sendKeys('seleniumtestname')
    await driver.findElement(By.xpath('//*[@id="jobSpec"]')).sendKeys('seleniumtestspec')
    await driver.findElement(By.xpath('//*[@id="jobLink"]')).sendKeys('seleniumtestlink')
    await driver.findElement(By.xpath('//*[@id="jobResponsibilities"]')).sendKeys('seleniumtestresponsibilities')
    driver.findElement(By.xpath('//*[@id="jobBandLevel"]/option[2]')).click()
    driver.findElement(By.xpath('//*[@id="jobFamily"]/option[3]')).click()
    await driver.findElement(By.xpath('//*[@id="main-content"]/form/button')).click()

    const title = await driver.getTitle()
    expect(title).to.equal('List of Job Roles')

    var elements = (await driver.findElements(By.className('govuk-table__cell')))
    var rows = (await driver.findElements(By.className('govuk-table__row')))
    var columns = elements.length / (rows.length - 1)

    for (let i = 0; i < elements.length; i++) {
      if (await elements[i].getText() === 'seleniumtestname') {
        expect(true)
        var link = await driver.findElement(By.xpath('//*[@id="main-content"]/form/table/tbody/tr[' + ((i / columns) + 1) + ']/td[6]')).getText()
        expect(link).to.equal('Edit')
        await driver.findElement(By.xpath('//*[@id="main-content"]/form/table/tbody/tr[' + ((i / columns) + 1) + ']/td[6]/a')).click()
        break
      }
    }

    const title2 = await driver.getTitle()
    expect(title2).to.equal('Edit a Role')

    await driver.findElement(By.xpath('//*[@id="jobLink"]')).sendKeys('.com')
    await driver.findElement(By.xpath('//*[@id="jobRole"]')).clear()
    await driver.findElement(By.xpath('//*[@id="jobRole"]')).sendKeys('selenium')
    await driver.findElement(By.xpath('//*[@id="jobResponsibilities"]')).sendKeys('hello')
    await driver.findElement(By.xpath('//*[@id="main-content"]/form/button')).click()

    const title3 = await driver.getTitle()
    expect(title3).to.equal('List of Job Roles')

    var elements2 = (await driver.findElements(By.className('govuk-table__cell')))
    var rows2 = (await driver.findElements(By.className('govuk-table__row')))
    var columns2 = elements2.length / (rows2.length - 1)

    for (let i = 0; i < elements2.length; i++) {
      if (await elements2[i].getText() === 'selenium') {
        expect(true)
        var link2 = await driver.findElement(By.xpath('//*[@id="main-content"]/form/table/tbody/tr[' + ((i / columns2) + 1) + ']/td[7]')).getText()
        expect(link2).to.equal('Delete')
        await driver.findElement(By.xpath('//*[@id="main-content"]/form/table/tbody/tr[' + ((i / columns2) + 1) + ']/td[7]/a')).click()
        break
      }
    }

    const title4 = await driver.getTitle()
    console.log(title4)
    expect(title4).to.equal('Delete a Role')
    const check = await driver.findElement(By.xpath('//*[@id="main-content"]/h2')).getText()
    console.log(check)
    expect(check).to.equal('Delete selenium')

    await driver.findElement(By.xpath('//*[@id="main-content"]/form/button')).click()
    var alert = await driver.switchTo().alert().getText()
    console.log(alert)
    expect(alert).to.equal('Are you sure you want to delete this role?')
    await driver.switchTo().alert().accept()

    const title5 = await driver.getTitle()
    console.log(title5)
    expect(title5).to.equal('List of Job Roles')

    var elements3 = (await driver.findElements(By.className('govuk-table__cell')))

    for (let i = 0; i < elements3.length; i++) {
      if (await elements3[i].getText() === 'selenium') {
        expect(1).to.equal(2)
        break
      }
    }
  })

  it('Assert the title on create capability webpage is correct', async () => {
    await driver.get('http://localhost:3000/createCapabilityForm')
    const title = await driver.getTitle()
    expect(title).to.equal('Create A Capability')

    var htmlSource = await driver.getPageSource()
    fs.appendFile('app/assets/snapshots/createCapabilty-snapshot.html', htmlSource, function (err) {
      if (err) throw err
      console.log('Saved!')
    })
  })

  it('Assert the title on create capability webpage is correct', async () => {
    await driver.get('http://localhost:3000/createBandLevel')
    const title = await driver.getTitle()
    expect(title).to.equal('Add a New Band')

    var htmlSource = await driver.getPageSource()
    fs.appendFile('app/assets/snapshots/addBand-snapshot.html', htmlSource, function (err) {
      if (err) throw err
      console.log('Saved!')
    })
  })

  it('Should enter correct details and submit successfully', async () => {
    await driver.findElement(By.xpath('/html/body/div/main/form/div[1]/input')).sendKeys('Selenium Test')
    await driver.findElement(By.xpath('/html/body/div/main/form/div[2]/select/option[1]')).click()

    await driver.findElement(By.xpath('/html/body/div/main/form/button')).click()

    const title = await driver.getTitle()
    expect(title).to.equal('Add a New Band')

    var htmlSource = await driver.getPageSource()
    fs.appendFile('app/assets/snapshots/addBandAddTraining-snapshot.html', htmlSource, function (err) {
      if (err) throw err
      console.log('Saved!')
    })
  })

  it('Should click a training box and submit', async () => {
    await driver.findElement(By.xpath('/html/body/div/main/form/div/fieldset/div/div[1]/input')).click()
    await driver.findElement(By.xpath('/html/body/div/main/form/button')).click()

    const title = await driver.getTitle()
    expect(title).to.equal('Add a New Band')

    var htmlSource = await driver.getPageSource()
    fs.appendFile('app/assets/snapshots/addBandAddCompetencies-snapshot.html', htmlSource, function (err) {
      if (err) throw err
      console.log('Saved!')
    })
  })

  it('Should click a competency box and submit', async () => {
    await driver.findElement(By.xpath('/html/body/div/main/form/div/fieldset/div/div[1]/input')).click()
    await driver.findElement(By.xpath('/html/body/div/main/form/button')).click()

    const title = await driver.getTitle()
    expect(title).to.equal('Home')
  })

  after(async () => driver.quit())
})
