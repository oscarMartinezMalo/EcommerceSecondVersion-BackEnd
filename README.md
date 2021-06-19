# EcommerceSecondVersion-BackEnd
Nestjs
Docker instructions for production

Step to Push Image to dockerHub

    In this directory (EcommerceSecondVersion-BackEnd>) write the next command 

    docker build -t ecommercebackend .                                          // Build the Image
    docker tag ecommercebackend ommalor/ecommerce-backend                       // To rename the Image
    docker login                                                                // Login in dockerhub
    
    //docker push [repoName]                                                   
    docker push ommalor/ecommerce-backend                                       // Push image to dockerHub 


Step to run project locally
    docker build -t ecommercebackend . 
    docker run -d --rm -p 3000:3000 --name BackEndEcommerce ecommercebackend