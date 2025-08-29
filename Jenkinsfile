pipeline {
    agent any
    
    stages {
        stage('Get Code') {
            steps {
                echo 'Getting code from GitHub...'
                git 'https://github.com/subashmuthub/react-demo.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                bat 'npm install'
            }
        }
        
        stage('Build App') {
            steps {
                echo 'Building React app...'
                bat 'npm run build'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying app...'
                bat '''
                    echo "Stopping any running apps..."
                    taskkill /F /IM node.exe /T || echo "No node process to stop"
                    timeout /t 2 /nobreak
                    echo "Starting app on port 4000..."
                    start /B npx serve -s build -l 4000
                    echo "App deployed at http://localhost:4000"
                '''
            }
        }
    }
    
    post {
        success {
            echo 'Deployment successful! 🎉'
            echo 'Your quiz app is running at http://localhost:4000'
        }
        failure {
            echo 'Something went wrong! 😞'
        }
    }
}