# Restful Booker - test examples

## Description

This repository provides test examples using the free Restful Booker API. The API allows you to interact with a hotel booking system, providing endpoints to create, retrieve, update, and delete bookings.

These examples demonstrate how to use the API within a test framework, showcasing common use cases such as authentication, fetching booking details, and verifying responses.

https://restful-booker.herokuapp.com/apidoc/

## Table of Contents
- [🚀 Installation](#-installation)
- [🧪 Run Tests](#-run-tests-)
- [🔍 Run Lint](#-run-lint)
- [🌱 Branch Naming](#-branch-naming-convention)
- [📝 Commit Message](#-commit-messages)
- [📊 Reports](#-reports)
- [💻 Technologies Used](#-technologies-used)
- [🏗️ Architecture](#-architecture)

## 🚀 Installation

To install all dependencies, use the following command:
```bash
npm install 
```

Run WebSocket Server
```bash
node server.js
```

## 🧪 Run Tests 
```bash
npx jest  #This command will run all the test cases in your project

npx jest --detectOpenHandles --forceExit #Sometimes, Jest may not exit properly if there are asynchronous operations that remain open (like open file handles or connections).
# This command helps in detecting such issues and forces Jest to exit
```
## 🔍 Run Lint

```bash
npm run lint 
```

## 🌱 Branch Naming Convention
Branches should follow this naming pattern: `<type>/<task number>/<short description>`
- **type:** The type of work being done, such as `feat`, `fix`, `chore`, etc.
- **task number:** The identifier of the task, usually from a project management tool like Jira (e.g., `RI-1`).
- **short description:** A brief description of the task or feature.

**Example**:
```
feat/RI-1/auth
```

## 📝 Commit Messages
Commit messages should adhere to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) standard:

`<type>[optional scope]: <description>`

- **type:** The type of change, such as `feat`, `fix`, `chore`, etc.
- **optional scope:** A description of the scope or module affected by the change (optional but recommended).
- **description:** A concise summary of the change.

**Example**
```
feat(RI-1): auth
```

## 📊 Reports
During each CI (Continuous Integration) run, test reports are automatically generated and stored as artifacts. These reports provide a detailed summary of test executions, including information about passed and failed tests, console logs, and more.

Jest Report Configuration
The test reports are generated using the jest-html-reporter plugin, which creates a clean, readable HTML report for easy review. The Jest configuration includes the following setup for generating the reports:


    reporters: [
        'default',  
        [
            './node_modules/jest-html-reporter',
            {
                pageTitle: 'Test Report',              // Title of the HTML report
                includeFailureMsg: true,               // Include error messages for failed tests
                collapseSuitesByDefault: true,         // Collapse test suites by default for easier navigation
                includeConsoleLog: true,               // Include console logs from test runs
                outputPath: 'reports/test-report.html' // Path to save the generated report
            },
        ],
    ],


## 💻 Technologies Used
- **Node.js**: v[10.2.4]
- **Babel**:
    - `@babel/core`: v7.25.2
    - `@babel/preset-env`: v7.25.4
    - `@babel/preset-typescript`: v7.24.7
    - `babel-jest`: v29.7.0
    - `babel-core`: v7.0.0-bridge.0
- **TypeScript**: v5.6.2
- **Jest**:
    - `jest`: v29.7.0
    - `@jest/globals`: v29.7.0
    - `ts-jest`: v29.2.5
- **Testing Libraries**:
    - `supertest`: v6.3.4
    - `@faker-js/faker`: v7.6.0
    - `jest-html-reporter`: v3.10.2
    - `typia`: v6.10.0
- **Redux**:
    - `redux-saga`: v1.3.0
- **ESLint**:
    - `eslint`: v8.57.1
    - `@typescript-eslint/eslint-plugin`: v5.62.0
    - `@typescript-eslint/parser`: v5.62.0
    - `eslint-config-prettier`: v8.10.0
    - `eslint-config-standard`: v17.1.0
    - `eslint-plugin-import`: v2.30.0
    - `eslint-plugin-jest`: v27.9.0
    - `eslint-plugin-n`: v15.7.0
    - `eslint-plugin-prettier`: v5.2.1
    - `eslint-plugin-promise`: v6.6.0
    - `eslint-plugin-redux-saga`: v1.3.2
- **Other Dependencies**:
    - `socket.io-client`: v4.7.5
    - `string-interpolation-js`: v1.0.6
    - `env-cmd`: v10.1.0
    - `ts-node`: v10.9.2
    - `ts-patch`: v3.2.1
    - `globals`: v15.10.0
    - `typescript-eslint`: v8.8.0

## 🏗️ Architecture

```plaintext
├── README.md
├── babel.config.js
├── jest.config.ts
├── jest.setup.ts
├── tsconfig.eslint.json
└── tsconfig.json
├── package-lock.json
├── package.json
├── server.js
├── src
│   ├── apps
│   │   ├── auth
│   │   │   ├── connectors
│   │   │   │   └── AuthConnector.ts
│   │   │   └── models
│   │   │       ├── ILoginRequest.ts
│   │   │       ├── ILoginResponse.ts
│   │   │       └── IUnauthorizedLoginResponse.ts
│   │   ├── bookings
│   │   │   ├── connectors
│   │   │   │   └── BookingConnector.ts
│   │   │   └── models
│   │   │       ├── request
│   │   │       │   └── IBookingDetailsRequest.ts
│   │   │       └── response
│   │   │           ├── IBookingDetailsResponse.ts
│   │   │           └── IBookingIdsListResponse.ts
│   │   └── websocket
│   │       └── WebSocketClient.ts
│   ├── commons
│   │   └── headers.ts
│   ├── connectors
│   │   ├── functors
│   │   │   ├── IAuthenticator.ts
│   │   │   ├── IResponseMapper.ts
│   │   │   ├── IValidator.ts
│   │   │   ├── impl
│   │   │   │   ├── DefaultAuthenticator.ts
│   │   │   │   └── ResponseMapper.ts
│   │   │   └── index.ts
│   │   ├── impl
│   │   │   ├── Connector.ts
│   │   │   ├── ConnectorFactory.ts
│   │   │   └── HTTPConnector.ts
│   │   ├── index.ts
│   │   └── models
│   │       ├── HttpMethods.ts
│   │       ├── IApiKeyDetails.ts
│   │       ├── IAuthenticationCredentials.ts
│   │       ├── IConnector.ts
│   │       ├── IConnectorData.ts
│   │       ├── IHTTPConnector.ts
│   │       ├── IHTTPConnectorData.ts
│   │       └── index.ts
│   ├── fixtures
│   │   ├── urls.json
│   │   └── users.json
│   ├── test
│   │   ├── authorization.test.ts
│   │   ├── bookings.test.ts
│   │   └── socket.test.ts
│   └── utils
│       ├── translations.json
│       ├── urls
│       │   ├── IUrlManager.ts
│       │   ├── UrlPaths.ts
│       │   ├── impl
│       │   │   └── JsonUrlManager.ts
│       │   ├── index.ts
│       │   └── models
│       │       ├── IUrl.ts
│       │       ├── Path.ts
│       │       └── index.ts
│       └── users
│           ├── IUserManager.ts
│           ├── impl
│           │   └── JsonUserManager.ts
│           └── index.ts
