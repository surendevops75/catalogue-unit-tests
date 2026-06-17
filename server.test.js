# Jest Test Suite for Catalogue Service (server.test.js)

This file contains automated tests for the Catalogue microservice.

The tests validate:

- Health Endpoint
- Product APIs
- Category APIs
- Search APIs
- Error Handling
- MongoDB Failure Scenarios
- Slow Response Simulation
- Mongo Connection Retry Logic

The suite uses:

- Jest
- SuperTest
- Mock MongoDB Driver

instead of a real MongoDB database.

This allows tests to run quickly and consistently in local development and CI/CD pipelines.

---

# Complete Test Architecture

```text
Jest
 │
 ▼
SuperTest
 │
 ▼
Express Application
 │
 ▼
Mock MongoDB
 │
 ▼
Mock Responses
```

Instead of:

```text
Jest
 │
 ▼
Express Application
 │
 ▼
Real MongoDB
```

Benefits:

```text
Fast
Reliable
No Infrastructure Dependency
CI/CD Friendly
```

---

# Mock MongoDB

```javascript
jest.mock('mongodb');
```

This tells Jest to use:

```text
__mocks__/mongodb.js
```

instead of:

```text
Real MongoDB Driver
```

Without Mock:

```text
Tests Require MongoDB

Database Must Be Running

Network Required
```

With Mock:

```text
Fake Responses

No Database Required

Fast Execution
```

---

# Import SuperTest

```javascript
const request = require('supertest');
```

SuperTest is used to send HTTP requests directly to the Express application.

Example:

```javascript
request(app)
  .get('/products')
```

Instead of:

```bash
curl localhost:8080/products
```

Benefits:

```text
No Server Startup Required

Fast Testing

API Validation
```

---

# Import Application

```javascript
const {
  app,
  setMongoConnected
} = require('./server');
```

Imports:

```text
Express Application

Testing Helper Function
```

Architecture:

```text
app
 └── Express Server

setMongoConnected()
 └── Simulate DB Status
```

Purpose:

```text
Database Available

Database Down
```

simulation.

---

# Test Suite

```javascript
describe(
  'Catalogue API Endpoints',
  () => {}
)
```

Groups all Catalogue API tests together.

Benefits:

```text
Better Organization

Readable Reports

Logical Grouping
```

---

# Health Endpoint Test

```javascript
test(
 'GET /health returns app and mongo status'
)
```

API:

```text
GET /health
```

Purpose:

```text
Verify Application Health
Verify Mongo Status
```

Request Flow:

```text
Test
 │
 ▼
/health
 │
 ▼
Express Route
 │
 ▼
JSON Response
```

Expected Response:

```json
{
  "app":"OK",
  "mongo":true
}
```

Assertions:

```javascript
expect(res.statusCode)
```

```javascript
expect(res.body)
```

Validates:

```text
Health Check Endpoint

Monitoring Endpoint

Kubernetes Probes
```

---

# Products Endpoint Test

```javascript
test(
 'GET /products returns product list'
)
```

API:

```text
GET /products
```

Flow:

```text
Request
 │
 ▼
Route Handler
 │
 ▼
collection.find({})
 │
 ▼
Mock MongoDB
 │
 ▼
Products
```

Mock Response:

```javascript
[
 {
   sku:"123",
   name:"Mock Product"
 }
]
```

Assertion:

```javascript
expect(
 res.body[0].sku
).toBe('123');
```

Validates:

```text
Product Retrieval

Mongo Query

JSON Response
```

---

# Product By SKU Test

```javascript
test(
 'GET /product/:sku returns product'
)
```

API:

```text
GET /product/123
```

Flow:

```text
Request
 │
 ▼
Route
 │
 ▼
findOne()
 │
 ▼
Mock Product
 │
 ▼
Response
```

Mock Result:

```javascript
{
  sku:"123",
  name:"Mock Product"
}
```

Assertion:

```javascript
expect(
 res.body.name
).toBe('Mock Product');
```

Validates:

```text
SKU Lookup

Database Query

Route Parameters
```

---

# Products By Category Test

```javascript
GET /products/cat1
```

Purpose:

```text
Category Filtering
```

Flow:

```text
Request
 │
 ▼
Category Route
 │
 ▼
Mongo Query
 │
 ▼
Filtered Products
```

Query:

```javascript
{
 categories:"cat1"
}
```

Mock Result:

```javascript
[
 {
   sku:"123",
   categories:"cat1"
 }
]
```

Assertion:

```javascript
expect(
 res.body[0].categories
).toBe('cat1');
```

Validates:

```text
Filtering Logic

Category Route

Database Query
```

---

# Categories Endpoint Test

```javascript
GET /categories
```

Purpose:

```text
Retrieve All Categories
```

Flow:

```text
Request
 │
 ▼
distinct()
 │
 ▼
Mock Categories
 │
 ▼
Response
```

Mock Response:

```javascript
[
 "cat1",
 "cat2"
]
```

Assertion:

```javascript
expect(
 res.body
).toContain('cat1');
```

Validates:

```text
Category Listing

Mongo distinct()

Response Structure
```

---

# Search Endpoint Test

```javascript
GET /search/test
```

Purpose:

```text
Validate Search API
```

Flow:

```text
Request
 │
 ▼
Search Route
 │
 ▼
Mongo Text Query
 │
 ▼
Mock Results
```

Response:

```javascript
[
 {
   sku:"123",
   name:"Mock Product"
 }
]
```

Assertion:

```javascript
expect(
 res.body[0].name
).toBe('Mock Product');
```

Validates:

```text
Search Endpoint

Mongo Query

Search Results
```

---

# Database Failure Test

```javascript
setMongoConnected(false);
```

Purpose:

```text
Simulate Database Failure
```

Flow:

```text
MongoDB Down
 │
 ▼
/products
 │
 ▼
Error Handler
 │
 ▼
500 Response
```

Request:

```javascript
request(app)
  .get('/products')
```

Expected:

```javascript
expect(
 res.statusCode
).toBe(500);
```

Validates:

```text
Error Handling

Database Outage

Failure Response
```

This is important because production systems experience:

```text
Database Crashes

Network Issues

Connection Failures
```

---

# GO_SLOW Delay Test

```javascript
process.env.GO_SLOW = 50;
```

Purpose:

```text
Simulate Slow Response
```

Flow:

```text
Request
 │
 ▼
Artificial Delay
 │
 ▼
Database Query
 │
 ▼
Response
```

Example:

```text
50ms Delay
```

Useful for:

```text
Performance Testing

Tracing Validation

Observability Testing
```

Assertion:

```javascript
expect(
 res.statusCode
).toBe(200);
```

Validates:

```text
Delay Logic

Environment Variables

Response Handling
```

---

# Mongo Connection Failure Test

```javascript
mockRejectedValue(
 new Error(
   'Connection failed'
 )
)
```

Purpose:

```text
Simulate Mongo Connection Failure
```

Flow:

```text
Mongo Connect
 │
 ▼
Exception
 │
 ▼
Catch Block
 │
 ▼
Retry Logic
```

Possible Real Scenarios:

```text
MongoDB Down

Wrong Credentials

DNS Failure

Network Failure
```

---

# resetModules()

```javascript
jest.resetModules();
```

Purpose:

```text
Clear Module Cache
```

Allows:

```text
Fresh Imports

Fresh Mock Configuration
```

during testing.

---

# doMock()

```javascript
jest.doMock(...)
```

Creates a temporary mock implementation.

Mock Behavior:

```javascript
MongoClient.connect()
```

always returns:

```text
Connection Failed
```

---

# Retry Logic Coverage

The test covers:

```javascript
mongoConnect()
```

and

```javascript
mongoLoop()
```

Failure Flow:

```text
Mongo Connect
 │
 ▼
Failure
 │
 ▼
Catch Block
 │
 ▼
Retry After 2 Seconds
```

This validates:

```text
Self Healing Logic
```

used in production.

---

# Cleanup Section

```javascript
afterAll(...)
```

Purpose:

```text
Cleanup Resources
```

Code:

```javascript
jest.clearAllTimers();
```

Why Needed?

Because:

```javascript
mongoLoop()
```

creates retry timers.

Without Cleanup:

```text
Jest Process Hangs

Tests Never Exit

Pipeline Fails
```

---

# Coverage Achieved

This test suite covers:

```text
✓ Health Endpoint

✓ Product List

✓ Product By SKU

✓ Category Products

✓ Categories

✓ Search

✓ Success Paths

✓ Error Paths

✓ Delay Paths

✓ Mongo Failure Paths

✓ Retry Logic

✓ Environment Variables
```

---

# Testing Flow

```text
Jest
 │
 ▼
SuperTest
 │
 ▼
Express App
 │
 ▼
Mock MongoDB
 │
 ▼
Assertions
 │
 ▼
Coverage Report
```

---

# CI/CD Integration

Pipeline Flow:

```text
GitHub Actions / Jenkins
          │
          ▼
npm test
          │
          ▼
Jest
          │
          ▼
Coverage Report
          │
          ▼
SonarQube
```

Example:

```bash
npm test
```

or

```bash
npm run coverage
```

---

# SonarQube Benefits

Coverage generated by Jest is uploaded to:

- :contentReference[oaicite:0]{index=0}

Metrics:

```text
Code Coverage

Code Smells

Security Issues

Technical Debt
```

---

# Real DevOps Benefits

## Faster CI/CD

```text
No Database Required
```

---

## Reliable Testing

```text
No Network Dependency
```

---

## Better Coverage

```text
Success Paths

Failure Paths

Edge Cases
```

---

## Shift Left Testing

```text
Catch Issues Early
```

before deployment.

---

# Best Practices Used

✅ Mock External Dependencies

✅ Test Success Scenarios

✅ Test Failure Scenarios

✅ Test Environment Variables

✅ Test Retry Logic

✅ Use SuperTest

✅ Generate Coverage Reports

✅ Clean Resources After Execution

---

# Why This File Is Important

This file validates the entire Catalogue API without requiring:

```text
MongoDB

Docker

Kubernetes

AWS

EKS
```

It ensures:

```text
Business Logic Works

API Contracts Work

Error Handling Works

Retry Logic Works

Coverage Requirements Are Met

CI/CD Pipelines Pass
```

This is a production-grade testing approach used in modern DevOps and cloud-native environments to maintain application quality and deployment confidence.