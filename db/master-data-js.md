````markdown id="mongodb-catalogue-seed-01"
# MongoDB Catalogue Database Seed Script

This MongoDB script initializes the `catalogue` database with sample product data and creates indexes used by the application.

The script performs three main tasks:

- Creates and selects the catalogue database
- Inserts product documents into the products collection
- Creates indexes for search and uniqueness

This type of script is commonly used during:

- Environment Setup
- Development
- Testing
- CI/CD Deployments
- Database Initialization

---

# Complete Script

//
// Products
//
db = db.getSiblingDB('catalogue');
db.products.insertMany([
    {sku: 'Watson', name: 'Watson', description: 'Probably the smartest AI on the planet', price: 2001, instock: 2, categories: ['Artificial Intelligence']},
    {sku: 'Ewooid', name: 'Ewooid', description: 'Fully sentient assistant', price: 200, instock: 0, categories: ['Artificial Intelligence']},
    {sku: 'HPTD', name: 'High-Powered Travel Droid', description: 'Traveling to the far reaches of the Galaxy? You need this for protection. Comes in handy when you are lost in space', price: 1200, instock: 12, categories: ['Robot']},
    {sku: 'UHJ', name: 'Ultimate Harvesting Juggernaut', description: 'Extraterrestrial vegetation harvester', price: 5000, instock: 10, categories: ['Robot']},
    {sku: 'EPE', name: 'Extreme Probe Emulator', description: 'Versatile interface adapter for hacking into systems', price: 953, instock: 1, categories: ['Robot']},
    {sku: 'EMM', name: 'Exceptional Medical Machine', description: 'Fully automatic surgery droid with exceptional bedside manner', price: 1024, instock: 1, categories: ['Robot']},
    {sku: 'SHCE', name: 'Strategic Human Control Emulator', description: 'Diplomatic protocol assistant', price: 300, instock: 12, categories: ['Robot']},
    {sku: 'RED', name: 'Responsive Enforcer Droid', description: 'Security detail, will gaurd anything', price: 700, instock: 5, categories: ['Robot']},
    {sku: 'RMC', name: 'Robotic Mining Cyborg', description: 'Excellent tunneling capability to get those rare minerals', price: 42, instock: 48, categories: ['Robot']},
    {sku: 'STAN-1', name: 'Stan', description: 'Observability guru', price: 67, instock: 1000, categories: ['Robot', 'Artificial Intelligence']},
    {sku: 'CNA', name: 'Cybernated Neutralization Android', description: 'Is your spaceship a bit whiffy? This little fellow will bring a breath of fresh air', price: 1000, instock: 0, categories: ['Robot']}
]);

// full text index for searching
db.products.createIndex({
    name: "text",
    description: "text"
});

// unique index for product sku
db.products.createIndex(
    { sku: 1 },
    { unique: true }
);

---

# What is a Seed Script?

A seed script pre-populates a database with initial data.

Instead of manually inserting records:

```text
Developer
    │
    ▼
Run Seed Script
    │
    ▼
Database Ready
```

Benefits:

```text
Faster Setup
Consistent Data
Automated Deployments
```

---

# Architecture Overview

```text
MongoDB Seed Script
        │
        ▼
Catalogue Database
        │
        ▼
Products Collection
        │
        ▼
Application APIs
```

---

# Selecting the Database

```javascript
db = db.getSiblingDB('catalogue');
```

Switches to:

```text
catalogue
```

database.

Equivalent:

```javascript
use catalogue
```

in Mongo Shell.

If database doesn't exist:

```text
MongoDB Creates It Automatically
```

---

# Products Collection

```javascript
db.products
```

Represents:

```text
Collection Name: products
```

Equivalent to a table in relational databases.

Comparison:

```text
MySQL Table       → Mongo Collection
MySQL Row         → Mongo Document
MySQL Database    → Mongo Database
```

---

# insertMany()

```javascript
insertMany()
```

Inserts multiple documents in a single operation.

Example:

```javascript
db.products.insertMany([...])
```

Benefits:

```text
Faster Inserts
Reduced Database Calls
Efficient Initialization
```

---

# Product Document Structure

Each product contains:

```javascript
{
  sku,
  name,
  description,
  price,
  instock,
  categories
}
```

---

# SKU

```javascript
sku: 'Watson'
```

SKU = Stock Keeping Unit.

Purpose:

```text
Unique Product Identifier
```

Examples:

```text
Watson
STAN-1
CNA
RMC
```

Applications use SKU to:

```text
Retrieve Products
Update Inventory
Process Orders
```

---

# Product Name

```javascript
name: 'Watson'
```

Human-readable product name.

Displayed in:

```text
Product Catalog
Search Results
Shopping Cart
```

---

# Description

```javascript
description: 'Probably the smartest AI on the planet'
```

Used for:

```text
Product Details
Search
Recommendations
```

---

# Price

```javascript
price: 2001
```

Represents product cost.

Example:

```text
2001
```

Usually interpreted as:

```text
USD
```

depending on application design.

---

# Inventory

```javascript
instock: 2
```

Represents available stock quantity.

Examples:

```text
0     Out of Stock
1     Limited Stock
1000  High Availability
```

---

# Categories

```javascript
categories: ['Robot']
```

Products may belong to multiple categories.

Example:

```javascript
categories: [
  'Robot',
  'Artificial Intelligence'
]
```

Benefits:

```text
Filtering
Search
Product Grouping
Recommendations
```

---

# Example Product

```javascript
{
  sku: 'STAN-1',
  name: 'Stan',
  description: 'Observability guru',
  price: 67,
  instock: 1000,
  categories: [
      'Robot',
      'Artificial Intelligence'
  ]
}
```

---

# Collection Structure

```text
catalogue
    │
    ▼
products
    │
    ├── Watson
    ├── Ewooid
    ├── HPTD
    ├── STAN-1
    └── CNA
```

---

# Full Text Search Index

```javascript
db.products.createIndex({

  name: "text",

  description: "text"

});
```

Creates a text index.

Purpose:

```text
Keyword Search
Full Text Search
Fast Queries
```

---

# Search Example

Application Query:

```javascript
db.products.find({

  $text: {
    $search: "robot"
  }
})
```

MongoDB searches:

```text
name
description
```

fields.

---

# Without Index

```text
Read Every Document
```

Performance:

```text
Slow
```

---

# With Index

```text
Use Text Index
```

Performance:

```text
Fast
```

---

# Unique SKU Index

```javascript
db.products.createIndex(

  {
    sku: 1
  },

  {
    unique: true
  }
)
```

Creates a unique index.

Purpose:

```text
Prevent Duplicate Products
```

---

# Index Direction

```javascript
sku: 1
```

Means:

```text
Ascending Index
```

Options:

```text
1  → Ascending
-1 → Descending
```

---

# Unique Constraint Example

Existing Product:

```javascript
{
  sku: "Watson"
}
```

Attempt:

```javascript
{
  sku: "Watson"
}
```

Result:

```text
Duplicate Key Error
```

MongoDB blocks insertion.

---

# Why Unique Indexes Matter

Without index:

```text
Duplicate Products
Inventory Problems
Order Issues
```

With unique index:

```text
Data Integrity
Reliable Queries
Consistent Catalog
```

---

# Search Flow

```text
User Search
      │
      ▼
Catalogue API
      │
      ▼
MongoDB Text Index
      │
      ▼
Matching Products
```

---

# Product Retrieval Flow

```text
Application
      │
      ▼
Find By SKU
      │
      ▼
Unique Index
      │
      ▼
Product Document
```

---

# Real DevOps Use Cases

## Environment Initialization

Automatically create sample data.

---

## CI/CD Pipelines

Seed databases during deployment.

Example:

```bash
mongo catalogue seed.js
```

---

## Automated Testing

Provide consistent test products.

---

## Kubernetes Deployments

Seed jobs run after MongoDB startup.

---

# Best Practices

✅ Use insertMany for bulk inserts

✅ Create indexes immediately after data creation

✅ Use unique constraints on SKUs

✅ Use text indexes for search

✅ Store categories as arrays

✅ Keep seed data version controlled

---

# Benefits

- Fast Environment Setup
- Consistent Test Data
- Efficient Search
- Data Integrity
- Better Query Performance
- Easier Automation

---

# Why This Script Is Important

This script initializes the catalogue service database with products and creates indexes required for efficient application operation.

It demonstrates key MongoDB concepts:

- Databases
- Collections
- Documents
- Bulk Inserts
- Text Indexes
- Unique Indexes

These concepts are fundamental for:

- MongoDB Administration
- Backend Development
- Microservices Architecture
- DevOps Automation
- Production Database Design
````
