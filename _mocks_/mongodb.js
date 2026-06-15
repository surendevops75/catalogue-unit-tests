````markdown id="jest-mongodb-mock-01"
# Jest MongoDB Mock Module

This file is a mock implementation of the MongoDB driver used during unit testing.

Instead of connecting to a real MongoDB database, Jest uses this mock to simulate database operations and return predefined responses.

This allows developers to test application logic without requiring:

- A running MongoDB server
- Network connectivity
- Real database data

Mocking improves:

- Test speed
- Test reliability
- Test isolation
- CI/CD execution

---

# Complete Mock File

```javascript
module.exports = {

  MongoClient: {

    connect: jest.fn().mockResolvedValue({

      db: () => ({

        collection: () => ({

          find: (query) => {

            if (query && query.categories) {

              return {

                sort: () => ({

                  toArray: () => Promise.resolve([
                    {
                      sku: '123',
                      categories: query.categories
                    }
                  ])
                })
              };
            }

            return {

              sort: () => ({

                toArray: () => Promise.resolve([
                  {
                    sku: '123',
                    name: 'Mock Product'
                  }
                ])
              }),

              toArray: () => Promise.resolve([
                {
                  sku: '123',
                  name: 'Mock Product'
                }
              ])
            };
          },

          findOne: () => Promise.resolve({
            sku: '123',
            name: 'Mock Product'
          }),

          distinct: () => Promise.resolve([
            'cat1',
            'cat2'
          ])
        })
      })
    })
  },

  ObjectId: jest.fn()
};
```

---

# What is Mocking?

Mocking replaces real components with simulated versions.

Instead of:

```text
Application
      │
      ▼
MongoDB Server
```

we use:

```text
Application
      │
      ▼
Mock MongoDB Driver
```

Benefits:

```text
Faster Tests
No External Dependencies
Consistent Results
```

---

# Architecture Overview

```text
Unit Test
    │
    ▼
Application Code
    │
    ▼
Mock MongoDB Driver
    │
    ▼
Fake Responses
```

Instead of:

```text
Unit Test
    │
    ▼
Application
    │
    ▼
Real MongoDB
```

---

# Module Export

```javascript
module.exports
```

Exports the mock implementation.

Allows Jest to replace:

```javascript
require('mongodb')
```

with:

```javascript
__mocks__/mongodb.js
```

---

# MongoClient Mock

```javascript
MongoClient
```

Mocks MongoDB's:

```javascript
MongoClient
```

class.

Real Code:

```javascript
MongoClient.connect()
```

Mock Code:

```javascript
MongoClient.connect()
```

returns fake data.

---

# Mock Connect Method

```javascript
connect: jest.fn()
```

Creates a mock function.

Purpose:

```text
Track Calls
Return Fake Values
Prevent Real Connections
```

---

# mockResolvedValue()

```javascript
mockResolvedValue(...)
```

Simulates a successful Promise.

Equivalent to:

```javascript
Promise.resolve(...)
```

Meaning:

```text
Database Connection Successful
```

without connecting anywhere.

---

# Database Mock

```javascript
db: () => ({})
```

Mocks:

```javascript
client.db()
```

Example:

```javascript
const db = client.db();
```

returns a fake database object.

---

# Collection Mock

```javascript
collection: () => ({})
```

Mocks:

```javascript
db.collection('products')
```

Purpose:

```text
Return Fake Collection
```

---

# find() Mock

```javascript
find(query)
```

Mocks MongoDB's:

```javascript
collection.find()
```

method.

---

# Category Filter Logic

```javascript
if (query && query.categories)
```

Checks:

```javascript
{
  categories: "electronics"
}
```

Example:

```javascript
find({
  categories: "electronics"
})
```

Returns:

```javascript
[
  {
    sku: "123",
    categories: "electronics"
  }
]
```

---

# Why Simulate Filters?

Allows testing:

```text
Business Logic
Category Filtering
Search APIs
```

without a real database.

---

# sort() Mock

```javascript
sort()
```

Mocks:

```javascript
find().sort()
```

Example:

```javascript
collection
  .find({})
  .sort({name:1})
```

Purpose:

```text
Maintain MongoDB Query Chain
```

---

# toArray() Mock

```javascript
toArray()
```

Returns:

```javascript
Promise.resolve(...)
```

Example Result:

```javascript
[
  {
    sku: "123",
    name: "Mock Product"
  }
]
```

Simulates:

```javascript
Mongo Cursor
      │
      ▼
Array Results
```

---

# Default Product Response

If no category filter exists:

```javascript
find({})
```

Returns:

```javascript
[
  {
    sku: "123",
    name: "Mock Product"
  }
]
```

Useful for:

```text
Product Listing Tests
Search Tests
API Validation
```

---

# findOne() Mock

```javascript
findOne()
```

Mocks:

```javascript
collection.findOne()
```

Returns:

```javascript
{
  sku: "123",
  name: "Mock Product"
}
```

Useful for:

```text
Get Product By SKU
Get User
Get Order
```

testing.

---

# distinct() Mock

```javascript
distinct()
```

Mocks:

```javascript
collection.distinct()
```

Returns:

```javascript
[
  "cat1",
  "cat2"
]
```

Example Usage:

```javascript
db.collection("products")
  .distinct("categories")
```

Result:

```text
cat1
cat2
```

---

# ObjectId Mock

```javascript
ObjectId: jest.fn()
```

Mocks MongoDB:

```javascript
ObjectId
```

Purpose:

```text
Prevent ObjectId Errors
Avoid MongoDB Dependency
```

---

# Example Unit Test

Application Code:

```javascript
const products =
  await db
    .collection('products')
    .find({})
    .toArray();
```

Mock Result:

```javascript
[
  {
    sku: "123",
    name: "Mock Product"
  }
]
```

No database required.

---

# Test Flow

```text
Jest Test
    │
    ▼
Application Code
    │
    ▼
MongoDB Mock
    │
    ▼
Fake Response
    │
    ▼
Assertion
```

---

# Why Mock Databases?

Without Mocking:

```text
MongoDB Required
Network Required
Test Data Required
```

With Mocking:

```text
Fast
Reliable
Independent
```

---

# Real DevOps Benefits

## CI/CD Pipelines

Tests run without:

```text
MongoDB Container
MongoDB Service
External Database
```

---

## Faster Builds

Example:

```text
Real DB Test
      30 Seconds

Mock Test
       2 Seconds
```

---

## Reliable Testing

No failures due to:

```text
Network Issues
Database Downtime
Environment Problems
```

---

# Real Use Cases

## Product Service

Mock:

```javascript
find()
findOne()
```

for catalogue APIs.

---

## User Service

Mock:

```javascript
findOne()
```

for login and profile APIs.

---

## Order Service

Mock:

```javascript
find()
```

for order retrieval.

---

# Best Practices

✅ Mock external dependencies

✅ Keep unit tests isolated

✅ Return predictable test data

✅ Avoid real database calls

✅ Use Jest mock functions

✅ Test business logic independently

---

# Benefits

- Faster Unit Tests
- Reliable CI/CD
- No Database Dependency
- Easy Debugging
- Better Test Isolation
- Improved Developer Productivity

---

# Why This Mock Is Important

This mock allows Jest to simulate MongoDB behavior during testing.

Instead of relying on:

```text
Real MongoDB Server
```

the application receives:

```text
Controlled Fake Responses
```

This is a fundamental testing technique used in:

- Node.js Applications
- CI/CD Pipelines
- DevOps Automation
- Microservices Testing
- Enterprise Software Development
````
