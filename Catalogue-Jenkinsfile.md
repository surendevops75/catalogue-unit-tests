# Jenkins Declarative Pipeline for Node.js CI with SonarQube

This Jenkins Pipeline automates the Continuous Integration (CI) process for a Node.js application.

The pipeline performs:

- Version Extraction
- Dependency Installation
- Unit Testing
- SonarQube Code Analysis
- Quality Gate Validation
- Workspace Cleanup

This is a production-style CI pipeline that ensures code quality before deployment.

---

# Complete Jenkinsfile

```groovy
pipeline {

    // --------------------------------------------------
    // AGENT CONFIGURATION
    // --------------------------------------------------

    agent {
        node {
            label 'AGENT-1'
        }
    }

    // --------------------------------------------------
    // ENVIRONMENT VARIABLES
    // --------------------------------------------------

    environment {

        COURSE = "Jenkins"

        appVersion = ""

        ACC_ID = "160885265516"

        PROJECT = "roboshop"

        COMPONENT = "catalogue"
    }

    // --------------------------------------------------
    // PIPELINE OPTIONS
    // --------------------------------------------------

    options {

        // Abort pipeline if it exceeds 10 minutes
        timeout(time: 10, unit: 'MINUTES')

        // Prevent concurrent executions
        disableConcurrentBuilds()
    }

    // --------------------------------------------------
    // BUILD STAGES
    // --------------------------------------------------

    stages {

        // --------------------------------------------------
        // READ APPLICATION VERSION
        // --------------------------------------------------

        stage('Read Version') {

            steps {

                script {

                    def packageJSON = readJSON file: 'package.json'

                    appVersion = packageJSON.version

                    echo "app version: ${appVersion}"
                }
            }
        }

        // --------------------------------------------------
        // INSTALL DEPENDENCIES
        // --------------------------------------------------

        stage('Install Dependencies') {

            steps {

                script {

                    sh """
                        npm install --include=dev
                    """
                }
            }
        }

        // --------------------------------------------------
        // UNIT TESTS
        // --------------------------------------------------

        stage('Unit Test') {

            steps {

                script {

                    sh """
                        npm test
                    """
                }
            }
        }

        // --------------------------------------------------
        // SONARQUBE SCAN
        // --------------------------------------------------

        stage('Sonar Scan') {

            environment {

                def scannerHome = tool 'sonar-8.0'
            }

            steps {

                script {

                    withSonarQubeEnv('sonar-server') {

                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }

        // --------------------------------------------------
        // QUALITY GATE VALIDATION
        // --------------------------------------------------

        stage('Quality Gate') {

            steps {

                timeout(time: 1, unit: 'HOURS') {

                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }

    // --------------------------------------------------
    // POST ACTIONS
    // --------------------------------------------------

    post {

        always {

            echo 'I will always say Hello again!'

            cleanWs()
        }

        success {

            echo 'I will run if success'
        }

        failure {

            echo 'I will run if failure'
        }

        aborted {

            echo 'pipeline is aborted'
        }
    }
}
```

---

# Pipeline Flow

```text
Source Code
      │
      ▼
Read Version
      │
      ▼
Install Dependencies
      │
      ▼
Unit Tests
      │
      ▼
SonarQube Scan
      │
      ▼
Quality Gate
      │
      ▼
Pipeline Success
```

---

# Agent Configuration

```groovy
agent {
    node {
        label 'AGENT-1'
    }
}
```

Specifies where the pipeline should run.

Jenkins will execute the pipeline on:

```text
AGENT-1
```

Benefits:

- Dedicated Build Server
- Distributed Builds
- Better Resource Utilization

---

# Environment Variables

```groovy
environment
```

Defines variables available throughout the pipeline.

---

## COURSE

```groovy
COURSE = "Jenkins"
```

Example custom variable.

---

## appVersion

```groovy
appVersion = ""
```

Stores application version extracted from:

```text
package.json
```

---

## ACC_ID

```groovy
ACC_ID = "160885265516"
```

AWS Account ID.

Typically used for:

```text
ECR
EKS
Deployments
```

---

## PROJECT

```groovy
PROJECT = "roboshop"
```

Application project name.

---

## COMPONENT

```groovy
COMPONENT = "catalogue"
```

Service being built.

---

# Pipeline Options

## Timeout

```groovy
timeout(time: 10, unit: 'MINUTES')
```

Stops the pipeline if it runs longer than:

```text
10 Minutes
```

Benefits:

```text
Prevent Stuck Builds
Save Resources
```

---

## Disable Concurrent Builds

```groovy
disableConcurrentBuilds()
```

Prevents multiple executions of the same pipeline.

Example:

```text
Build #10 Running
      │
      ▼
Build #11 Waits
```

Benefits:

```text
Avoid Race Conditions
Prevent Resource Conflicts
```

---

# Read Version Stage

```groovy
readJSON file: 'package.json'
```

Reads:

```json
{
  "version": "1.0.0"
}
```

Extracts:

```text
1.0.0
```

Stores it in:

```groovy
appVersion
```

Example Output:

```text
app version: 1.0.0
```

---

# Install Dependencies Stage

```groovy
npm install --include=dev
```

Installs:

```text
Production Dependencies
Development Dependencies
```

Examples:

```text
express
mongodb
jest
eslint
```

---

# Unit Test Stage

```groovy
npm test
```

Executes application tests.

Example:

```text
PASS
All tests completed successfully
```

Purpose:

```text
Validate Application Logic
Detect Bugs Early
```

---

# Sonar Scan Stage

```groovy
withSonarQubeEnv('sonar-server')
```

Connects Jenkins to SonarQube.

Uses configured SonarQube server:

```text
sonar-server
```

---

## Sonar Scanner Tool

```groovy
tool 'sonar-8.0'
```

Loads Sonar Scanner installation.

Example Path:

```text
/opt/sonar-scanner
```

---

## Execute Analysis

```groovy
sonar-scanner
```

Performs:

```text
Code Analysis
Bug Detection
Code Smells
Security Scanning
Coverage Analysis
```

---

# Quality Gate Stage

```groovy
waitForQualityGate()
```

Waits for SonarQube analysis results.

Checks:

```text
Code Quality
Security Issues
Coverage Thresholds
```

---

## abortPipeline

```groovy
abortPipeline: true
```

If Quality Gate fails:

```text
Pipeline Fails
```

Example:

```text
Coverage Too Low
Critical Vulnerabilities
Major Bugs
```

---

# Quality Gate Flow

```text
Sonar Scan
     │
     ▼
SonarQube Server
     │
     ▼
Quality Gate Evaluation
     │
     ├── PASS
     │      ▼
     │   Continue
     │
     └── FAIL
            ▼
      Abort Pipeline
```

---

# Post Section

```groovy
post
```

Runs actions after pipeline completion.

Similar to:

```text
finally block
```

in programming.

---

# Always

```groovy
always
```

Runs regardless of pipeline result.

Example:

```groovy
cleanWs()
```

Purpose:

```text
Cleanup Workspace
Free Disk Space
```

---

# Success

```groovy
success
```

Runs only when:

```text
Pipeline Succeeds
```

Example:

```text
Notify Success
Send Email
Deploy Application
```

---

# Failure

```groovy
failure
```

Runs only when:

```text
Pipeline Fails
```

Example:

```text
Send Alerts
Create Incident
Notify Team
```

---

# Aborted

```groovy
aborted
```

Runs when pipeline is manually stopped.

Example:

```text
User Clicked Abort
Timeout Triggered
```

---

# Complete CI Workflow

```text
Developer Pushes Code
         │
         ▼
Jenkins Build
         │
         ▼
Read Version
         │
         ▼
Install Dependencies
         │
         ▼
Run Tests
         │
         ▼
SonarQube Analysis
         │
         ▼
Quality Gate Check
         │
         ▼
Success / Failure
         │
         ▼
Workspace Cleanup
```

---

# Real DevOps Use Cases

## Continuous Integration

Validate every code change automatically.

---

## Code Quality Enforcement

Prevent low-quality code from progressing.

---

## Enterprise Pipelines

Integrate:

```text
Jenkins
SonarQube
GitHub
Docker
Kubernetes
```

---

## Security Validation

Detect:

```text
Code Smells
Bugs
Vulnerabilities
```

before deployment.

---

# Best Practices

✅ Use dedicated build agents

✅ Enable pipeline timeout

✅ Disable concurrent builds

✅ Run automated tests

✅ Integrate SonarQube

✅ Enforce Quality Gates

✅ Clean workspace after builds

---

# Benefits

- Automated Validation
- Better Code Quality
- Faster Feedback
- Consistent Builds
- Improved Security
- CI/CD Readiness

---

# Why This Pipeline Is Important

This Jenkins pipeline demonstrates modern CI practices used in enterprise environments.

Key concepts covered:

- Jenkins Declarative Pipelines
- Build Agents
- Environment Variables
- Dependency Management
- Unit Testing
- SonarQube Integration
- Quality Gates
- Post Build Actions

These concepts are fundamental for:

- DevOps Engineers
- CI/CD Engineers
- Platform Engineers
- Cloud Engineers
- Software Development Teams
````
