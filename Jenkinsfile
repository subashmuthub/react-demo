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
                bat 'taskkill /F /IM node.exe /T 2>nul || echo "No node process to stop"'
                bat 'echo "Installing serve globally..."'
                bat 'npm install -g serve'
                bat 'echo "Starting app on port 4000..."'
                bat 'start /B cmd /c "serve -s build -l 4000"'
                bat 'echo "Waiting for app to start..."'
                bat 'ping localhost -n 3 > nul'
                bat 'echo "✅ App deployed successfully at http://localhost:4000"'
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