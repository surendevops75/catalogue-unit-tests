# Catalogue Service (server.js)

This file is the core backend application of the Roboshop Catalogue service.

It provides REST APIs for:

- Health Check
- Product Listing
- Product Details
- Category Filtering
- Category Listing
- Product Search

It also integrates:

- MongoDB
- Express
- Pino Logging
- Instana Tracing
- JSON APIs

---

# Architecture Overview

```text
Client
   │
   ▼
Express Server
   │
   ├── /health
   ├── /products
   ├── /product/:sku
   ├── /products/:category
   ├── /categories
   └── /search/:text
   │
   ▼
MongoDB
```

---

# Instana Monitoring

```javascript
const instana = require('@instana/collector');
```

Loads Instana monitoring agent.

Purpose:

```text
Distributed Tracing
Application Monitoring
Performance Tracking
```

---

# Enable Tracing

```javascript
instana({
  tracing: {
    enabled: true
  }
});
```

Enables:

```text
Request Tracing
Database Tracing
API Tracing
```

Flow:

```text
User Request
      │
      ▼
Instana Trace
      │
      ▼
Catalogue Service
      │
      ▼
MongoDB
```

---

# MongoDB Driver

```javascript
const { MongoClient, ObjectId } =
require('mongodb');
```

Provides MongoDB connectivity.

Used for:

```text
Database Connections
Queries
Collections
```

---

# Express Framework

```javascript
const express = require('express');
```

Creates REST APIs.

Example:

```javascript
app.get(...)
```

---

# Body Parser

```javascript
const bodyParser = require('body-parser');
```

Parses:

```text
JSON Requests
Form Data
```

Example:

```json
{
  "name":"product"
}
```

---

# Pino Logger

```javascript
const pino = require('pino');
```

High-performance logging library.

Benefits:

```text
Structured Logging
JSON Output
Fast Performance
```

---

# Express Logger Middleware

```javascript
const expPino =
require('express-pino-logger');
```

Automatically logs:

```text
Requests
Responses
Errors
```

---

# Logger Configuration

```javascript
const logger = pino({
  level:'info',
  prettyPrint:false,
  useLevelLabels:true
});
```

---

## Log Level

```javascript
level:'info'
```

Logs:

```text
INFO
WARN
ERROR
```

---

## Structured Logs

```javascript
prettyPrint:false
```

Produces machine-readable JSON logs.

Example:

```json
{
  "level":"INFO",
  "msg":"MongoDB connected"
}
```

Perfect for:

- :contentReference[oaicite:0]{index=0}

---

# MongoDB Variables

```javascript
let db;
let collection;
let mongoConnected = false;
```

Used to track:

```text
Database Connection
Collection Access
Connection Status
```

---

# Create Express App

```javascript
const app = express();
```

Initializes Express application.

---

# Attach Logger

```javascript
app.use(expLogger);
```

Adds request logging middleware.

Every request generates logs.

Example:

```text
GET /products
200 OK
```

---

# CORS Headers

```javascript
app.use(...)
```

Adds:

```javascript
Access-Control-Allow-Origin: *
```

Purpose:

```text
Allow Frontend Access
Cross-Origin Requests
```

---

# Timing Headers

```javascript
Timing-Allow-Origin
```

Allows browser performance measurements.

Useful for:

```text
Monitoring
Tracing
Debugging
```

---

# Custom Instana Tags

```javascript
span.annotate(...)
```

Adds random datacenter labels.

Possible Values:

```text
asia-northeast2
asia-south1
europe-west3
us-east1
us-west1
```

Purpose:

```text
Trace Enrichment
Observability
```

---

# Request Body Parsing

## URL Encoded

```javascript
app.use(
 bodyParser.urlencoded(...)
);
```

Supports:

```html
form submissions
```

---

## JSON

```javascript
app.use(
 bodyParser.json()
);
```

Supports:

```json
REST APIs
```

---

# Health API

```javascript
GET /health
```

Purpose:

```text
Application Health Check
```

Response:

```json
{
  "app":"OK",
  "mongo":true
}
```

Used by:

```text
Load Balancers
Kubernetes
Monitoring Tools
```

---

# Get All Products

```javascript
GET /products
```

Query:

```javascript
collection.find({})
```

Returns:

```json
[
  {
    "sku":"Watson"
  }
]
```

---

# Error Handling

If MongoDB unavailable:

```text
500
database not available
```

---

# Get Product By SKU

```javascript
GET /product/:sku
```

Example:

```text
/product/STAN-1
```

Query:

```javascript
findOne({
  sku:req.params.sku
})
```

Response:

```json
{
  "sku":"STAN-1"
}
```

---

# Slow Response Simulation

```javascript
GO_SLOW
```

Environment Variable:

```bash
GO_SLOW=5000
```

Adds:

```text
5 Second Delay
```

Useful for:

```text
Load Testing
Tracing
Chaos Testing
```

---

# Get Products By Category

```javascript
GET /products/:cat
```

Example:

```text
/products/Robot
```

Query:

```javascript
{
  categories:"Robot"
}
```

Sorted:

```javascript
.sort({name:1})
```

Alphabetical order.

---

# Get Categories

```javascript
GET /categories
```

Query:

```javascript
collection.distinct(
  'categories'
)
```

Response:

```json
[
  "Robot",
  "Artificial Intelligence"
]
```

---

# Product Search

```javascript
GET /search/:text
```

Example:

```text
/search/robot
```

Query:

```javascript
{
  "$text":{
     "$search":"robot"
  }
}
```

Uses MongoDB Text Index.

Response:

```json
[
  {
    "name":"Robot Product"
  }
]
```

---

# MongoDB Connection

```javascript
async function mongoConnect()
```

Creates MongoDB connection.

---

# Connection URL

```javascript
process.env.MONGO_URL
```

Default:

```text
mongodb://mongodb:27017/catalogue
```

Flow:

```text
Catalogue Service
      │
      ▼
MongoDB
      │
      ▼
catalogue DB
```

---

# Database Selection

```javascript
db = client.db('catalogue');
```

Uses:

```text
catalogue
```

database.

---

# Collection Selection

```javascript
collection =
db.collection('products');
```

Uses:

```text
products
```

collection.

---

# Successful Connection

```javascript
mongoConnected = true;
```

Log:

```text
MongoDB connected
```

---

# Connection Failure

```javascript
catch(error)
```

Actions:

```text
Set mongoConnected=false
Log Error
Retry Connection
```

---

# Retry Loop

```javascript
mongoLoop()
```

Retries every:

```text
2 Seconds
```

Code:

```javascript
setTimeout(
  mongoLoop,
  2000
)
```

Benefits:

```text
Self Healing
Container Friendly
Kubernetes Friendly
```

---

# Startup Flow

```text
Container Starts
      │
      ▼
mongoLoop()
      │
      ▼
Connect MongoDB
      │
      ▼
Express APIs Ready
```

---

# Module Export

```javascript
module.exports = {
  app,
  setMongoConnected
}
```

Exports:

```text
Application Object
Testing Helpers
```

---

# Why Export app?

Testing Frameworks like:

- :contentReference[oaicite:1]{index=1}

need direct access.

Example:

```javascript
request(app)
```

using:

- :contentReference[oaicite:2]{index=2}

---

# Testing Helper

```javascript
setMongoConnected()
```

Allows tests to simulate:

```text
Database Available
Database Down
```

without real MongoDB.

---

# API Summary

| Endpoint | Method | Purpose |
|-----------|----------|----------|
| /health | GET | Health Check |
| /products | GET | All Products |
| /product/:sku | GET | Product Details |
| /products/:cat | GET | Category Products |
| /categories | GET | Categories |
| /search/:text | GET | Full Text Search |

---

# Real DevOps Integrations

## Logging

Logs shipped to:

- :contentReference[oaicite:3]{index=3}

through:

- :contentReference[oaicite:4]{index=4}
- :contentReference[oaicite:5]{index=5}

---

## Monitoring

Metrics collected by:

- :contentReference[oaicite:6]{index=6}

---

## Tracing

Observability through:

- :contentReference[oaicite:7]{index=7}

---

## Kubernetes

Health endpoint used by:

```yaml
livenessProbe
readinessProbe
```

---

# Best Practices Used

✅ Structured Logging

✅ Distributed Tracing

✅ Retry Logic

✅ Health Checks

✅ Environment Variables

✅ REST APIs

✅ Error Handling

✅ Testability

---

# Why This File Is Important

This is the heart of the Catalogue microservice.

It handles:

- API Requests
- MongoDB Access
- Logging
- Monitoring
- Tracing
- Health Checks

and forms the backend foundation for the Roboshop Catalogue application running in:

- Docker
- Kubernetes
- Amazon EKS
- CI/CD Environments
- Production Systems
````
