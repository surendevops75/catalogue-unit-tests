# Complete Jenkinsfile

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