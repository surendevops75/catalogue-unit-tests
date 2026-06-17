# 📦 RoboShop Catalogue Microservice

![Node.js](https://img.shields.io/badge/Runtime-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![Docker](https://img.shields.io/badge/Container-Docker-blue)
![Jenkins](https://img.shields.io/badge/CI%2FCD-Jenkins-red)
![SonarQube](https://img.shields.io/badge/Code_Quality-SonarQube-orange)

## 📌 Overview

The Catalogue Service is a core microservice in the RoboShop application responsible for managing and serving product catalog information.

This repository demonstrates a complete DevOps workflow including application development, unit testing, code quality analysis, containerization, and CI/CD automation.

---

## 🏗️ Architecture

```text
User Request
      │
      ▼
 Catalogue Service
      │
      ▼
   MongoDB
```

---

## 📂 Repository Structure

```text
.
├── __mocks__/
│   ├── mongodb.js
│   └── mongodb-js.md
│
├── db/
│   ├── master-data.js
│   └── master-data-js.md
│
├── index.js
├── server.js
├── server.test.js
├── jest.config.js
├── package.json
│
├── Dockerfile
├── Jenkinsfile
├── sonar-project.properties
│
├── catalogue-Dockerfile.md
├── Catalogue-Jenkinsfile.md
├── indexjs.md
├── server-js.MD
├── server-test-js.md
├── package-json.md
├── jest-config-js.md
└── sonar-project-properties.md
```

---

## 🔹 Core Components

### server.js

Main application entry point.

Responsibilities:

- Starts the application
- Handles API requests
- Connects to MongoDB
- Exposes catalogue endpoints

---

### index.js

Application bootstrap file.

Responsibilities:

- Initializes modules
- Loads configurations
- Starts service components

---

### db/master-data.js

Contains catalogue product data.

Responsibilities:

- Product data management
- Database seeding
- Initial catalogue setup

---

### __mocks__/mongodb.js

Mock MongoDB implementation used during testing.

Benefits:

- Faster test execution
- No dependency on actual MongoDB
- Consistent test results

---

## 🧪 Testing

### Jest

The repository uses Jest for unit testing.

Files:

```text
server.test.js
jest.config.js
```

### Benefits

- Automated validation
- Regression prevention
- Improved code quality

Run tests:

```bash
npm test
```

---

## 📊 Code Quality

### SonarQube Integration

Configuration:

```text
sonar-project.properties
```

Capabilities:

- Code quality analysis
- Security scanning
- Technical debt identification
- Coverage reporting

---

## 🐳 Docker Support

### Dockerfile

Containerizes the Catalogue Service.

Features:

- Multi-stage builds
- Lightweight runtime image
- Environment variables
- Production-ready deployment

Build Image:

```bash
docker build -t catalogue .
```

Run Container:

```bash
docker run -p 8080:8080 catalogue
```

---

## 🚀 CI/CD Pipeline

### Jenkins

Pipeline defined in:

```text
Jenkinsfile
```

Pipeline Stages:

1. Source Checkout
2. Dependency Installation
3. Unit Testing
4. SonarQube Analysis
5. Docker Build
6. Deployment

---

## 🛠 Technologies Used

- Node.js
- MongoDB
- Jest
- SonarQube
- Docker
- Jenkins
- JavaScript

---

## 📚 Learning Objectives

This repository helps you understand:

- Microservices Development
- Node.js Backend Development
- MongoDB Integration
- Unit Testing with Jest
- SonarQube Code Analysis
- Docker Containerization
- Jenkins CI/CD Pipelines
- DevOps Best Practices

---

## 👨‍💻 Ideal For

- DevOps Engineers
- Backend Developers
- Cloud Engineers
- Platform Engineers
- Site Reliability Engineers (SREs)
- Students Learning Microservices

---

## 🔒 DevOps Practices Demonstrated

- Automated Testing
- Continuous Integration
- Code Quality Gates
- Containerization
- Infrastructure Automation
- Microservice Architecture

---

## ⭐ Support

If you find this repository useful:

- Star the repository ⭐
- Fork the project 🍴
- Share it with fellow DevOps Engineers 🚀

---

## 📖 Related Topics

Node.js • MongoDB • Jest • SonarQube • Docker • Jenkins • CI/CD • Microservices • DevOps