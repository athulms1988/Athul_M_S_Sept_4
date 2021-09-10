# To do list app

API Documentation can be found here
https://documenter.getpostman.com/view/752253/U16kpjp3

Postman collection file - ```Todo.postman_collection.json```

**Tech Stack**

Front-end -> React Application

Backend ->  ExpressJS (NodeJS)

Database -> Mongo Cloud


**How to run the application locally**

1. open a terminal and navigate to `server` folder
1. ```npm install```
1. ```npm run dev```
1. After these command the server app will be running on http://localhost:3004

1. Take a new terminal and Navigate to `client` folder
1. ```npm install```
1. ```npm start```

    Now the application should be available under http://localhost:3000

**Endpoints**

API Endpoint: https://d211l28ky1hher.cloudfront.net

Frontend: https://d2lkaywvr1s4s6.cloudfront.net

**How To Deploy A New Version After Changes**

CI integration is done using Github Actions. Currently build tags are configured, tagging a commit with `api-<VERSION>` would trigger the CD pipeline for api deployment

Similarly `fe-<VERSION>` for the front end react application deployment. 

 An example tag would be `api-0.0.50`, `fe-0.0.10`

Build status can be found here: https://github.com/athulms1988/Athul_M_S_Sept_4/actions
