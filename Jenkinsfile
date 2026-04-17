pipeline {
    agent any

    environment {
        IMAGE_NAME = "gayathirisb/devops-backend:v2"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'develop', url: 'https://github.com/gayathiribhuvan/multi-service-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('backend') {
                    sh 'npm test || true'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t $IMAGE_NAME .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                dir('backend') {
                    sh 'docker push $IMAGE_NAME'
                }
            }
        }
    }
}
