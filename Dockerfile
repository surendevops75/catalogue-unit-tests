````markdown id="dockerfile-nodejs-catalogue-01"
# Multi-Stage Dockerfile for Node.js Catalogue Application

This Dockerfile builds and runs the Roboshop Catalogue service using a multi-stage build approach.

The goal is to:

- Reduce final image size
- Improve security
- Separate build and runtime environments
- Run the application as a non-root user

This is a production-grade Dockerfile commonly used for Node.js microservices.

---

# Complete Dockerfile

```dockerfile
# --------------------------------------------------
# BUILD STAGE
# --------------------------------------------------

FROM node:20.19.5-alpine3.21 AS build

WORKDIR /opt/server

COPY package.json .

COPY *.js .

# Install application dependencies
RUN npm install


# --------------------------------------------------
# RUNTIME STAGE
# --------------------------------------------------

FROM node:20.19.5-alpine3.21

WORKDIR /opt/server

# Create non-root user
RUN addgroup -S roboshop && \
    adduser -S roboshop -G roboshop && \
    chown -R roboshop:roboshop /opt/server

EXPOSE 8080

LABEL com.project="roboshop" \
      component="catalogue" \
      created_by="sivakumar"

ENV MONGO="true" \
    MONGO_URL="mongodb://mongodb:27017/catalogue"

COPY --from=build \
     --chown=roboshop:roboshop \
     /opt/server \
     /opt/server

USER roboshop

CMD ["server.js"]

ENTRYPOINT ["node"]
```

---

# What is a Multi-Stage Build?

A multi-stage build uses multiple Docker images during the build process.

Purpose:

```text
Separate Build Environment
Separate Runtime Environment
Reduce Image Size
Improve Security
```

Architecture:

```text
Build Stage
      │
      ▼
Compile / Install Dependencies
      │
      ▼
Copy Required Files
      │
      ▼
Runtime Stage
```

---

# Build Architecture

```text
Docker Build
      │
      ▼
Build Stage
(Node.js + npm install)
      │
      ▼
Application Files
      │
      ▼
Runtime Stage
(Node.js Runtime)
      │
      ▼
Final Image
```

---

# Build Stage

```dockerfile
FROM node:20.19.5-alpine3.21 AS build
```

Creates the build environment.

Base Image:

```text
Node.js 20
Alpine Linux 3.21
```

Benefits:

```text
Small Image Size
Fast Downloads
Lower Attack Surface
```

---

# Build Stage Alias

```dockerfile
AS build
```

Creates a named stage.

Later used by:

```dockerfile
COPY --from=build
```

to copy files into the final image.

---

# Working Directory

```dockerfile
WORKDIR /opt/server
```

Sets:

```text
Current Working Directory
```

Equivalent:

```bash
cd /opt/server
```

for all subsequent commands.

---

# Copy package.json

```dockerfile
COPY package.json .
```

Copies:

```text
package.json
```

from local machine into container.

Purpose:

```text
Dependency Installation
Application Metadata
```

---

# Copy Application Files

```dockerfile
COPY *.js .
```

Copies:

```text
server.js
db.js
app.js
```

and all JavaScript files.

---

# Install Dependencies

```dockerfile
RUN npm install
```

Installs packages defined in:

```json
package.json
```

Example:

```text
express
mongodb
axios
```

Result:

```text
node_modules/
```

directory created.

---

# Runtime Stage

```dockerfile
FROM node:20.19.5-alpine3.21
```

Creates a fresh image.

Purpose:

```text
Clean Runtime Environment
Smaller Final Image
```

Only required files are copied from build stage.

---

# Create Application Directory

```dockerfile
WORKDIR /opt/server
```

Application files reside in:

```text
/opt/server
```

---

# Create Non-Root User

```dockerfile
addgroup -S roboshop
```

Creates:

```text
roboshop group
```

---

```dockerfile
adduser -S roboshop -G roboshop
```

Creates:

```text
roboshop user
```

and adds it to:

```text
roboshop group
```

---

# Why Avoid Root?

Without:

```dockerfile
USER roboshop
```

containers run as:

```text
root
```

Risk:

```text
Privilege Escalation
Container Escape
Security Issues
```

Production best practice:

```text
Run as Non-Root User
```

---

# File Ownership

```dockerfile
chown -R roboshop:roboshop /opt/server
```

Grants ownership to:

```text
roboshop user
```

Allows:

```text
Read
Write
Execute
```

operations.

---

# Exposed Port

```dockerfile
EXPOSE 8080
```

Documents application port.

Application listens on:

```text
8080
```

Flow:

```text
Client
   │
   ▼
Container:8080
```

---

# Docker Labels

```dockerfile
LABEL
```

Stores metadata inside image.

---

## Project Label

```dockerfile
com.project="roboshop"
```

Identifies project.

---

## Component Label

```dockerfile
component="catalogue"
```

Identifies service.

---

## Creator Label

```dockerfile
created_by="sivakumar"
```

Tracks image ownership.

---

# Environment Variables

```dockerfile
ENV
```

Defines runtime variables.

---

# Mongo Flag

```dockerfile
MONGO="true"
```

Tells application:

```text
Use MongoDB
```

---

# MongoDB Connection String

```dockerfile
MONGO_URL="mongodb://mongodb:27017/catalogue"
```

Connection Details:

```text
Host     : mongodb
Port     : 27017
Database : catalogue
```

---

# Database Flow

```text
Catalogue Service
        │
        ▼
mongodb:27017
        │
        ▼
MongoDB Database
```

---

# Copy Files from Build Stage

```dockerfile
COPY --from=build
```

Copies:

```text
Application Files
node_modules
```

from build stage.

Benefits:

```text
Smaller Image
Cleaner Runtime
```

---

# Preserve Ownership

```dockerfile
--chown=roboshop:roboshop
```

Ensures copied files belong to:

```text
roboshop
```

user.

---

# Switch User

```dockerfile
USER roboshop
```

All future commands execute as:

```text
roboshop
```

instead of:

```text
root
```

---

# CMD Instruction

```dockerfile
CMD ["server.js"]
```

Provides default argument.

Equivalent:

```bash
server.js
```

---

# ENTRYPOINT Instruction

```dockerfile
ENTRYPOINT ["node"]
```

Defines executable.

Equivalent:

```bash
node
```

---

# Final Startup Command

Docker combines:

```dockerfile
ENTRYPOINT ["node"]

CMD ["server.js"]
```

Result:

```bash
node server.js
```

Application starts.

---

# Container Startup Flow

```text
Container Starts
        │
        ▼
node server.js
        │
        ▼
Connect MongoDB
        │
        ▼
Listen on 8080
```

---

# Build Process

```bash
docker build -t catalogue:v1 .
```

Steps:

```text
Build Stage
      │
      ▼
npm install
      │
      ▼
Runtime Stage
      │
      ▼
Final Image
```

---

# Run Container

```bash
docker run -p 8080:8080 catalogue:v1
```

Access:

```text
http://localhost:8080
```

---

# Real DevOps Use Cases

## CI/CD Pipelines

```text
GitHub Actions
Jenkins
GitLab CI
Azure DevOps
```

build and push images automatically.

---

## Kubernetes

Deployment example:

```yaml
image:
  catalogue:v1
```

---

## Amazon EKS

Containers run inside:

- :contentReference[oaicite:0]{index=0}

clusters.

---

# Best Practices

✅ Use Multi-Stage Builds

✅ Use Alpine Images

✅ Run as Non-Root User

✅ Use Labels

✅ Store Configuration in ENV Variables

✅ Keep Runtime Images Small

✅ Use Explicit Versions

---

# Benefits

- Smaller Images
- Faster Deployments
- Better Security
- Reduced Attack Surface
- Easier Maintenance
- Production-Ready Containers

---

# Why This Dockerfile Is Important

This Dockerfile demonstrates modern containerization practices for Node.js applications.

Key concepts:

- Multi-Stage Builds
- Non-Root Containers
- Environment Variables
- Docker Metadata
- Container Security
- Dependency Management

These concepts are fundamental for:

- Docker
- Kubernetes
- Amazon EKS
- DevOps Engineering
- Cloud-Native Applications
````
