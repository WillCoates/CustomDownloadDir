pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                sh 'npm install'
                sh 'npm test -- --reporter-option output=xunit.xml --reporter=xunit || true'
                junit 'xunit.xml'
            }
        }
    }
}