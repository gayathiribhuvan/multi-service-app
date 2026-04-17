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
        stage('SonarQube Analysis') {
            steps {
                dir('backend') {
                    withSonarQubeEnv('sonar-local') {
                         sh '''
                         sonar-scanner \
                         -Dsonar.projectKey=devops-project \
                         -Dsonar.sources=. \
                         -Dsonar.host.url=http://192.168.0.160:9000 \
                         -Dsonar.token=$SONAR_AUTH_TOKEN
                         '''
               }
          }
     }
}
        stage('Quality Gate') {
    steps {
        script {
            timeout(time: 30, unit: 'MINUTES') {
                def qg = waitForQualityGate()
                echo "Quality Gate status: ${qg.status}"
                if (qg.status != 'OK') {
                    error "Pipeline failed due to Quality Gate"
                }
            }
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
