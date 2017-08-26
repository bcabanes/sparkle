## Sparkle
This project uses [Angular](https://angular.io/), [Webpack](https://webpack.github.io/) and the [angular-cli](https://github.com/angular/angular-cli).

## Requirements
To be able to run this project, please make sure you fill the requirements.

### Node version
This project is compatible with the version `8.1.1` of NodeJS. There is a `.nvmrc` file available and a `.node-version` for [nodenv](https://github.com/nodenv/nodenv) and [node-build](https://github.com/nodenv/node-build#readme) installed). 
If you're not sure of your installed version run the following command if you have installed NodeJS via NVM:
```bash
nvm use
```

### Commitizen
This project is Commitizen ready, please use this convention for each of your commits.
Commitizen is available in local via this repo via the following command:
```bash
git add .
npm run commit
```

You will be prompted a list of question like this:
[![Commit with commitizen](https://s29.postimg.org/n73ey8kfb/commitizen.jpg)](https://postimg.org/image/54ac70okj/)

## Development server

Run `npm run ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding
You can use the `npm run ng generate` (or just `npm run ng g`) command to generate Angular components:

```bash
npm run ng generate component my-new-component
npm run ng g component my-new-component # using the alias

# components support relative path generation
# if in the directory src/app/feature/ and you run
npm run ng g component new-cmp
# your component will be generated in src/app/feature/new-cmp
# but if you were to run
npm run ng g component ../newer-cmp
# your component will be generated in src/app/newer-cmp
```
You can find all possible blueprints in the table below:

Scaffold  | Usage
---       | ---
Component | `npm run ng g component my-new-component`
Directive | `npm run ng g directive my-new-directive`
Pipe      | `npm run ng g pipe my-new-pipe`
Service   | `npm run ng g service my-new-service`
Class     | `npm run ng g class my-new-class`
Guard     | `npm run ng g guard my-new-guard`
Interface | `npm run ng g interface my-new-interface`
Enum      | `npm run ng g enum my-new-enum`
Module    | `npm run ng g module my-module`

## Build

Run `npm run ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `npm run ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `npm run ng serve`.

## Further help

To get more help on the Angular CLI use `npm run ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
