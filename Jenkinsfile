pipeline {
    agent any
    options {
        skipDefaultCheckout()
    }
    stages{
        stage('Verify Workspace') {
            steps {
                sh 'tree'
            }
        }
    }
}
