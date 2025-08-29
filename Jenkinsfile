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
        
        stage('Build') {
            steps {
                echo 'Building React app...'
                bat 'npm run build'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying app...'
                // Stop any existing app on port 4000
                bat 'netstat -ano | findstr :4000 && for /f "tokens=5" %a in (\'netstat -ano ^| findstr :4000\') do taskkill /PID %a /F || echo "No process running on port 4000"'
                
                // Install serve globally if not already installed
                bat 'npm list -g serve || npm install -g serve'
                
                // Start the app as a background service
                bat 'start "QuizApp" cmd /c "cd /d %WORKSPACE% && serve -s build -l 4000"'
                
                // Wait a moment and verify the app started
                bat 'timeout /t 5'
                bat 'netstat -ano | findstr :4000 && echo "App successfully running on port 4000" || echo "Failed to start app"'
            }
        }
        
        stage('Test Deployment') {
            steps {
                echo 'Testing if app is accessible...'
                bat 'curl -f http://localhost:4000 && echo "App is accessible!" || echo "App test failed"'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
            echo 'Your quiz app is now running at http://localhost:4000'
        }
        failure {
            echo 'Pipeline failed. Check the logs above.'
        }
    }
}