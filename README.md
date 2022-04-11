# CurrencyConverter
Note: this application uses https://fixer.io APIs to access currency conversion operations.

The development was done using an API key which doesn't have access to the /convert endpoint. In theory if an entitled API key is provided the application should work fine. For confidence unit tests have been implemented. That being said, full manual testing was not performed during development due to lack of access. However, the code in this repository is a demonstration of how the API can be used with Angular.
___

## Project requirements

This project uses Angular version 13.2.3 & Node 16.10.0.

A nvmrc file has been added, so if you have nvm installed on your machine run `nvm use`.

## Development server

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` or `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running ESLint

Run `ng lint` or `npm run lint` to execute linting.
