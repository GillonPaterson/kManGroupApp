# kManGroupApp
Hello welcome to K man group app

## Description 

This is the front end to our project it has webpages made up of a mixture of nunjucks and html using the govUK components. Also has java script to request data from the endpoints of our api. 

## How to start your application 

### enter into terminal 

1. npm ci
2. npm start 

### other usefull commands:

1. npm test - runs js unit tests
2. npm run selenium - runs selenium test
3. npm i --package-lock-only - updates the package lock 
4. npm run pa11y-ci your/snapshot/or/htmlpage - runs accessability tests
5. npm install package-name - installs package

## WorkFlows

All the config files for the CI pipeline are held in the .github/workflows and the config files for the linters are held in the .github/linters.

### workFlows we run

1. superlinter -documentation- https://github.com/github/super-linter
2. pa11y -documentation- https://github.com/pa11y/pa11y
3. unit tests

### GovUk components

https://design-system.service.gov.uk/get-started/

### Rules

1. You break it you fix it 
2. if Gillon did it and it doesn't work check his spelling

### Contributing

we aren't open to contributing sorry.
