pipeline {
    agent any

    stages {
        stage('init') {
            steps {
                node('docker') {   
                sh 'mkdir /home/sysadmin/backendcode|| echo "directory already exists" '
                sh '(cd /home/sysadmin/backendcode/kona-backend && git pull --all) || (cd /home/sysadmin/backendcode/ && git clone https://github.com/sameeraja-ops/kona-backend.git)'
                sh 'cd /home/sysadmin/backendcode/kona-backend  && docker build -t sameeraja/backend:${BUILD_ID} -t sameeraja/backend:latest . '
                sh ' docker push sameeraja/backend:${BUILD_ID} && docker push sameeraja/backend:latest '  
            }
            }
            }
            }
            }
