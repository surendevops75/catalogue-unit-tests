````markdown id="jest-config-01"
# Jest Configuration File (jest.config.js)

This file configures the Jest testing framework for the Node.js application.

Jest uses this configuration to determine:

- Test execution environment
- Code coverage settings
- Coverage report formats
- Files to include in coverage analysis

This configuration is commonly used in CI/CD pipelines to generate test and coverage reports.

---

# Complete Configuration

```javascript
module.exports = {

  // Test execution environment
  testEnvironment: 'node',

  // Coverage report formats
  coverageReporters: [
    'lcov',
    'text'
  ],

  // Files included in coverage calculation
  collectCoverageFrom: [
    'server.js'
  ]
};
```

---

# What is Jest?

Jest is a JavaScript testing framework used for:

```text
Unit Testing
Integration Testing
Code Coverage Analysis
Mocking
Assertions
```

Created by:

- :contentReference[oaicite:0]{index=0}

Common Commands:

```bash
npm test
```

or

```bash
npx jest
```

---

# Architecture Overview

```text
Application Code
        │
        ▼
Jest
        │
        ▼
Execute Tests
        │
        ▼
Coverage Analysis
        │
        ▼
Coverage Reports
```

---

# Export Configuration

```javascript
module.exports = {}
```

Exports the Jest configuration object.

Jest automatically loads:

```text
jest.config.js
```

during execution.

---

# Test Environment

```javascript
testEnvironment: 'node'
```

Specifies the runtime environment used by Jest.

Current Environment:

```text
Node.js
```

Used for:

```text
Backend Applications
APIs
Microservices
CLI Applications
```

---

# Why Use Node Environment?

Your application uses:

```javascript
require()
process.env
module.exports
```

which require a Node.js runtime.

Example:

```javascript
const express = require('express');
```

Node environment supports this directly.

---

# Other Available Environments

## Node

```javascript
testEnvironment: 'node'
```

For:

```text
Backend Applications
APIs
Microservices
```

---

## jsdom

```javascript
testEnvironment: 'jsdom'
```

For:

```text
React
Angular
Vue
Browser Applications
```

Simulates:

```text
DOM
window
document
```

---

# Coverage Reporters

```javascript
coverageReporters
```

Defines output formats for code coverage reports.

Current Configuration:

```javascript
[
  'lcov',
  'text'
]
```

---

# What is Code Coverage?

Coverage measures:

```text
How Much Code Was Tested
```

Example:

```javascript
function add(a,b){
   return a+b;
}
```

If tests execute this function:

```text
Covered
```

Otherwise:

```text
Not Covered
```

---

# Coverage Calculation

```text
Executed Lines
      ÷
Total Lines
      ×
100
```

Example:

```text
80 / 100 = 80%
```

Coverage:

```text
80%
```

---

# LCOV Report

```javascript
'lcov'
```

Generates:

```text
coverage/lcov.info
```

Used by:

```text
SonarQube
Jenkins
GitHub Actions
Code Quality Tools
```

---

# Coverage Flow

```text
Jest
   │
   ▼
lcov.info
   │
   ▼
SonarQube
   │
   ▼
Coverage Dashboard
```

---

# Example LCOV Output

```text
coverage/
├── lcov-report/
├── lcov.info
└── coverage-final.json
```

---

# Text Report

```javascript
'text'
```

Prints coverage directly in terminal.

Example Output:

```text
-----------------------
File       | % Stmts
-----------------------
server.js  | 85%
-----------------------
```

Useful for:

```text
Developers
Build Logs
Quick Verification
```

---

# collectCoverageFrom

```javascript
collectCoverageFrom
```

Specifies which files should be included in coverage analysis.

Current Setting:

```javascript
[
  'server.js'
]
```

---

# Why Only server.js?

Jest calculates coverage only for:

```text
server.js
```

Example:

```text
project/
│
├── server.js
├── app.js
├── db.js
└── test/
```

Coverage generated for:

```text
server.js
```

only.

---

# Example Coverage Result

```text
server.js
```

Coverage:

```text
95%
```

Output:

```text
Statements : 95%
Branches   : 90%
Functions  : 100%
Lines      : 95%
```

---

# Multiple Files Example

Production projects often use:

```javascript
collectCoverageFrom: [

  'server.js',

  'routes/**/*.js',

  'services/**/*.js',

  'controllers/**/*.js'
]
```

This measures coverage across the entire application.

---

# CI/CD Integration

Pipeline Stage:

```bash
npm test -- --coverage
```

Jest generates:

```text
Coverage Reports
```

which are uploaded to:

- :contentReference[oaicite:1]{index=1}

or displayed in:

- :contentReference[oaicite:2]{index=2}

---

# SonarQube Integration

Typical Flow:

```text
Jest
   │
   ▼
lcov.info
   │
   ▼
Sonar Scanner
   │
   ▼
SonarQube Dashboard
```

Displays:

```text
Coverage %
Code Smells
Bugs
Vulnerabilities
```

---

# Test Execution Flow

```text
npm test
     │
     ▼
Jest
     │
     ▼
Run Tests
     │
     ▼
Measure Coverage
     │
     ▼
Generate Reports
```

---

# Example Commands

Run Tests:

```bash
npm test
```

---

Run Coverage:

```bash
npm test -- --coverage
```

---

Run Specific File:

```bash
npx jest server.test.js
```

---

# Real DevOps Use Cases

## Continuous Integration

Automatically execute tests during builds.

---

## Quality Gates

Coverage thresholds enforced by:

- :contentReference[oaicite:3]{index=3}

Example:

```text
Coverage must be ≥ 80%
```

---

## Pull Request Validation

Prevent merging untested code.

---

## Release Readiness

Verify application quality before deployment.

---

# Best Practices

✅ Use Node environment for backend applications

✅ Generate LCOV reports

✅ Integrate with SonarQube

✅ Measure critical application files

✅ Enforce minimum coverage thresholds

✅ Run tests in CI/CD pipelines

---

# Benefits

- Automated Testing
- Code Quality Visibility
- Coverage Tracking
- CI/CD Integration
- Faster Bug Detection
- Safer Deployments

---

# Why This Configuration Is Important

This Jest configuration controls how tests are executed and how coverage is measured.

It enables:

- Reliable Unit Testing
- Coverage Reporting
- SonarQube Integration
- CI/CD Automation

These concepts are fundamental for:

- Node.js Development
- DevOps Pipelines
- Software Quality Assurance
- Continuous Integration
- Enterprise Application Development
````
