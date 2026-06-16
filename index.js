# Node.js Application Startup Script

This file is the application entry point responsible for starting the Catalogue service.

It performs three main tasks:

- Imports the application server
- Configures logging using Pino
- Starts the HTTP server

This is typically the file executed when the Docker container starts.

---

# Complete Code

```javascript
const app = require('./server');

const pino = require('pino');

const logger = pino({

  level: 'info',

  prettyPrint: false,

  useLevelLabels: true
});

const port =
  process.env.CATALOGUE_SERVER_PORT || '8080';

app.listen(port, () => {

  logger.info('Started on port', port);

});
```

---

# What Is This File?

This file acts as the application bootstrap file.

Purpose:

```text
Load Application
Configure Logging
Start HTTP Server
```

Application Flow:

```text
Node Process
      │
      ▼
Load server.js
      │
      ▼
Configure Logger
      │
      ▼
Read Port
      │
      ▼
Start HTTP Server
```

---

# Architecture Overview

```text
Node.js Runtime
       │
       ▼
Application Entry Point
       │
       ▼
Express Application
       │
       ▼
HTTP Server
       │
       ▼
Client Requests
```

---

# Import Application

```javascript
const app = require('./server');
```

Loads:

```text
server.js
```

or

```text
server/index.js
```

depending on project structure.

Typically:

```javascript
module.exports = app;
```

from the application file.

---

# Why Separate Startup Logic?

Instead of:

```javascript
app.listen()
```

inside every file,

we separate:

```text
Application Logic
```

from

```text
Server Startup Logic
```

Benefits:

```text
Cleaner Design
Better Testing
Easier Maintenance
```

---

# Import Pino Logger

```javascript
const pino = require('pino');
```

Loads:

```text
Pino Logger
```

Pino is a high-performance Node.js logging library.

Benefits:

```text
Fast Logging
Structured Logs
JSON Output
Production Friendly
```

---

# Logger Configuration

```javascript
const logger = pino({...})
```

Creates a logger instance.

All application logs pass through this object.

---

# Log Level

```javascript
level: 'info'
```

Defines minimum log level.

Logs generated:

```text
info
warn
error
fatal
```

Ignored:

```text
debug
trace
```

---

# Log Levels

```text
fatal
error
warn
info
debug
trace
```

Example:

```javascript
logger.info("Application Started")
```

Output:

```text
INFO Application Started
```

---

# prettyPrint

```javascript
prettyPrint: false
```

Produces compact JSON logs.

Output Example:

```json
{
  "level": 30,
  "msg": "Started on port"
}
```

Benefits:

```text
Smaller Logs
Better Performance
ELK Friendly
```

---

# useLevelLabels

```javascript
useLevelLabels: true
```

Uses readable log levels.

Instead of:

```text
30
40
50
```

you get:

```text
INFO
WARN
ERROR
```

---

# Port Configuration

```javascript
const port =
  process.env.CATALOGUE_SERVER_PORT || '8080';
```

Reads port from:

```text
Environment Variable
```

Priority:

```text
CATALOGUE_SERVER_PORT
        │
        ▼
Default 8080
```

---

# Example

Environment Variable Present:

```bash
CATALOGUE_SERVER_PORT=9090
```

Result:

```text
9090
```

---

# Example Without Variable

No environment variable:

```bash
unset CATALOGUE_SERVER_PORT
```

Result:

```text
8080
```

---

# Why Use Environment Variables?

Instead of:

```javascript
const port = 8080;
```

Benefits:

```text
Environment Flexibility
Container Friendly
Kubernetes Friendly
Cloud Native Design
```

---

# Starting the Server

```javascript
app.listen(port)
```

Starts the HTTP server.

Application begins listening for requests.

Example:

```text
http://localhost:8080
```

---

# Listen Callback

```javascript
() => {
  logger.info(...)
}
```

Runs after successful startup.

Purpose:

```text
Confirm Server Started
Generate Startup Log
```

---

# Startup Log

```javascript
logger.info(
  'Started on port',
  port
);
```

Example Output:

```text
INFO Started on port 8080
```

Useful for:

```text
Monitoring
Troubleshooting
Debugging
```

---

# Startup Flow

```text
Application Starts
       │
       ▼
Load Server Module
       │
       ▼
Configure Logger
       │
       ▼
Read Port
       │
       ▼
Start Listening
       │
       ▼
Write Startup Log
```

---

# Request Flow

```text
Client Request
       │
       ▼
Port 8080
       │
       ▼
Node.js Server
       │
       ▼
Express Application
       │
       ▼
Response
```

---

# Example Docker Integration

Dockerfile:

```dockerfile
EXPOSE 8080
```

Container Startup:

```bash
node index.js
```

Result:

```text
Application Running
Port 8080
```

---

# Example Kubernetes Integration

Deployment:

```yaml
env:
- name: CATALOGUE_SERVER_PORT
  value: "8080"
```

Container:

```text
Reads Environment Variable
```

and starts on:

```text
8080
```

---

# Logging Architecture

```text
Application
      │
      ▼
Pino Logger
      │
      ▼
Container Logs
      │
      ▼
Filebeat
      │
      ▼
Logstash
      │
      ▼
Elasticsearch
      │
      ▼
Kibana
```

---

# Real DevOps Use Cases

## Containerized Applications

Used inside:

```text
Docker
Podman
Containerd
```

---

## Kubernetes

Pods start the application using:

```bash
node index.js
```

---

## Logging Pipelines

Structured logs are shipped to:

- :contentReference[oaicite:0]{index=0}
- :contentReference[oaicite:1]{index=1}
- :contentReference[oaicite:2]{index=2}

---

## Microservices

Each service starts independently using a similar bootstrap file.

---

# Best Practices

✅ Use Environment Variables

✅ Use Structured Logging

✅ Keep Startup Logic Separate

✅ Use Pino for High Performance

✅ Log Successful Startup

✅ Avoid Hardcoded Ports

---

# Benefits

- Cloud Native
- Container Friendly
- Easy Configuration
- Production Logging
- Better Observability
- Scalable Design

---

# Why This File Is Important

This file is the entry point of the Catalogue application.

Without it:

```text
Application Cannot Start
```

It is responsible for:

- Loading the Application
- Configuring Logging
- Reading Runtime Configuration
- Starting the HTTP Server

These concepts are fundamental for:

- Node.js Applications
- Docker Containers
- Kubernetes Deployments
- Microservices Architecture
- DevOps Operations
````
