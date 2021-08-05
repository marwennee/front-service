pipeline {
    environment {
        DEPLOY = "${env.BRANCH_NAME == "main" || env.BRANCH_NAME == "develop" ? "true" : "false"}"
        NAME = "front-svc"
        VERSION = env.GIT_COMMIT.take(7)
        REGISTRY = 'marwenguesmii/angular_nginx'
        REGISTRY_CREDENTIAL = 'dockerhub'
    }
    agent {
        kubernetes {
            defaultContainer 'jnlp'
            yamlFile 'build.yaml'
        }
    }
    stages {
        stage('Docker Build') {
            when {
                environment name: 'DEPLOY', value: 'true'
            }
            
            steps {
              sh "echo 'hello'"
              sh "git log --stat"
                container('docker') {
                    sh "docker build -t ${REGISTRY}:${VERSION} ."
                }
            }
        }
        stage('Docker Publish') {
            when {
                environment name: 'DEPLOY', value: 'true'
            }
            steps {
                container('docker') {
                    withDockerRegistry([credentialsId: "${REGISTRY_CREDENTIAL}", url: ""]) {
                        sh "docker push ${REGISTRY}:${VERSION}"
                    }
                }
            }
        }
        stage('Kubernetes Deploy') {
            when {
                environment name: 'DEPLOY', value: 'true'
            }
            steps {
                container('helm') {
                    sh "helm upgrade --install --force --set image.tag=${VERSION}  ${NAME} ./helm"
                }
            }
        }
    }
}
