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
                bat 'echo "Stopping any running apps..."'
                bat 'taskkill /F /IM node.exe /T || echo "No node process to stop"'
                bat 'echo "Starting app on port 4000..."'
                bat 'start /B npx serve -s build -l 4000'
                bat 'echo "App deployed at http://localhost:4000"'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline completed!'
        }
        success {
            echo '🎉 Deploy successful! App running at http://localhost:4000'
        }
    }
}